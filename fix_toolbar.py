#!/usr/bin/env python3
"""Fix search + filter alignment on Accounting pages.
Uses line-based processing for reliability."""
import re, os

BASE = r"C:\Projects\erp-scw-distribution\src\app\(dashboard)\accounting"

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)

def fix_placeholder(content, context):
    """Replace 'Ketik dan [Enter...' with 'Cari [context]...'"""
    content = re.sub(
        r'placeholder="Ketik dan \[Enter[^\"]*"',
        'placeholder="Cari ' + context + '..."',
        content
    )
    return content

def count_div_depth(line):
    """Count net div depth change in a line, excluding self-closing divs."""
    # Remove self-closing divs like <div ... />
    cleaned = re.sub(r'<div[^/]*/>', '', line)
    opens = len(re.findall(r'<div[\s>]', cleaned))
    closes = len(re.findall(r'</div>', cleaned))
    return opens - closes

def merge_filter_toolbar_lines(lines, context):
    """Merge filter div and toolbar div using line-based processing."""
    
    # Find the line with "Ketik dan"
    ketik_line_idx = None
    for i, line in enumerate(lines):
        if 'Ketik dan' in line:
            ketik_line_idx = i
            break
    
    if ketik_line_idx is None:
        return lines, False
    
    # Find the toolbar div opening line (paddingBottom: 12)
    toolbar_open_idx = None
    for i in range(ketik_line_idx, -1, -1):
        if 'paddingBottom: 12' in lines[i] and 'display: "flex"' in lines[i]:
            toolbar_open_idx = i
            break
    
    if toolbar_open_idx is None:
        return lines, False
    
    # Find the toolbar div closing line using proper depth counting
    depth = 0
    toolbar_close_idx = None
    for i in range(toolbar_open_idx, len(lines)):
        depth += count_div_depth(lines[i])
        if depth == 0:
            toolbar_close_idx = i
            break
    
    if toolbar_close_idx is None:
        return lines, False
    
    # Now find the filter div (before toolbar div, with Filter button)
    filter_close_idx = None
    filter_open_idx = None
    for i in range(toolbar_open_idx - 1, -1, -1):
        if '<Filter size={14} />' in lines[i] or '<Filter size={14}/>' in lines[i]:
            # Found Filter button, find its parent div closing
            for j in range(i, toolbar_open_idx):
                if lines[j].strip() == '</div>':
                    filter_close_idx = j
                    break
            # Find the opening of this div
            for j in range(filter_close_idx, -1, -1):
                if 'marginTop: 10' in lines[j] and 'display: "flex"' in lines[j] and 'paddingBottom' not in lines[j]:
                    filter_open_idx = j
                    break
            break
    
    if filter_open_idx is None or filter_close_idx is None:
        return lines, False
    
    # Extract selects from filter div
    selects = []
    i = filter_open_idx + 1
    while i < filter_close_idx:
        line = lines[i]
        if '<select' in line:
            # Collect the full select element (might span multiple lines)
            select_lines = [line]
            if '</select>' not in line:
                i += 1
                while i < filter_close_idx:
                    select_lines.append(lines[i])
                    if '</select>' in lines[i]:
                        break
                    i += 1
            selects.append('\n'.join(select_lines))
        i += 1
    
    if not selects:
        return lines, False
    
    # Get the indentation from the toolbar div
    indent = '          '  # Default indentation
    
    # Build the new combined div
    new_div_lines = []
    new_div_lines.append(indent + '<div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingBottom: 12, flexWrap: "wrap" }}>') 
    
    # Add selects with proper indentation
    for select in selects:
        for select_line in select.split('\n'):
            new_div_lines.append(indent + '  ' + select_line.strip())
    
    # Add flex:1 spacer
    new_div_lines.append(indent + '  <div style={{ flex: 1 }} />')
    
    # Add search input
    new_div_lines.append(indent + '  <div style={{ position: "relative" }}>')
    new_div_lines.append(indent + '    <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#999" }} />')
    new_div_lines.append(indent + '    <input type="text" placeholder="Cari ' + context + '..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ height: 32, padding: "0 10px 0 30px", fontSize: 13, border: "1px solid #d8d8d8", borderRadius: 6, width: 200, outline: "none" }} />')
    new_div_lines.append(indent + '  </div>')
    
    # Add count
    new_div_lines.append(indent + '  <span style={{ fontSize: 11, color: "#888", minWidth: 20, textAlign: "right" }}>{filtered.length}</span>')
    
    new_div_lines.append(indent + '</div>')
    
    # Replace the old divs with the new one
    # Remove from filter_open_idx to toolbar_close_idx (inclusive)
    new_lines = lines[:filter_open_idx] + new_div_lines + lines[toolbar_close_idx + 1:]
    
    return new_lines, True

def process_file(rel_path, context, has_two_divs):
    """Process a single file."""
    full_path = os.path.join(BASE, rel_path)
    
    if not os.path.exists(full_path):
        print(f"  SKIP (not found): {rel_path}")
        return False
    
    content = read_file(full_path)
    original = content
    
    if has_two_divs:
        lines = content.split('\n')
        new_lines, merged = merge_filter_toolbar_lines(lines, context)
        if merged:
            content = '\n'.join(new_lines)
            # Fix any remaining placeholder
            content = fix_placeholder(content, context)
        else:
            print(f"    WARNING: Could not merge divs, only fixing placeholder")
            content = fix_placeholder(content, context)
    else:
        content = fix_placeholder(content, context)
    
    if content != original:
        write_file(full_path, content)
        print(f"  FIXED: {rel_path}")
        return True
    else:
        print(f"  NO CHANGE: {rel_path}")
        return False

# Files to process
FILES = [
    # Kas Bank
    ("kas-bank/penerimaan/page.tsx", "penerimaan", True),
    ("kas-bank/transfer-bank/page.tsx", "transfer bank", True),
    ("kas-bank/smartlink-ebanking/page.tsx", "smartlink", False),
    # Pembelian
    ("pembelian/pemasok/page.tsx", "pemasok", True),
    ("pembelian/harga-pemasok/page.tsx", "harga pemasok", True),
    ("pembelian/kategori-pemasok/page.tsx", "kategori pemasok", True),
    ("pembelian/pesanan-pembelian/page.tsx", "pesanan pembelian", True),
    ("pembelian/penerimaan-barang/page.tsx", "penerimaan barang", True),
    ("pembelian/pembayaran-pembelian/page.tsx", "pembayaran pembelian", True),
    ("pembelian/retur-pembelian/page.tsx", "retur pembelian", True),
    ("pembelian/uang-muka-pembelian/page.tsx", "uang muka pembelian", True),
    ("pembelian/faktur-pembelian/page.tsx", "faktur pembelian", True),
    # Penjualan
    ("penjualan/pelanggan/page.tsx", "pelanggan", True),
    ("penjualan/pesanan-penjualan/page.tsx", "pesanan penjualan", True),
    ("penjualan/penawaran-penjualan/page.tsx", "penawaran penjualan", True),
    ("penjualan/faktur-penjualan/page.tsx", "faktur penjualan", True),
    ("penjualan/penerimaan-penjualan/page.tsx", "penerimaan penjualan", True),
    ("penjualan/pengiriman-pesanan/page.tsx", "pengiriman pesanan", True),
    ("penjualan/retur-penjualan/page.tsx", "retur penjualan", True),
    ("penjualan/target-penjualan/page.tsx", "target penjualan", True),
    ("penjualan/uang-muka-penjualan/page.tsx", "uang muka penjualan", True),
    ("penjualan/kategori-pelanggan/page.tsx", "kategori pelanggan", False),
    ("penjualan/kategori-penjualan/page.tsx", "kategori penjualan", False),
    ("penjualan/penyesuaian-harga-diskon/page.tsx", "penyesuaian harga diskon", True),
    ("penjualan/komisi-penjual/page.tsx", "komisi penjual", False),
    # Aset Tetap
    ("aset-tetap/aset-tetap/page.tsx", "aset tetap", True),
    ("aset-tetap/kategori-aset/page.tsx", "kategori aset", True),
    ("aset-tetap/disposisi-aset-tetap/page.tsx", "disposisi aset tetap", True),
    # Perusahaan
    ("perusahaan/fob/page.tsx", "FOB", False),
    ("perusahaan/kontak/page.tsx", "kontak", False),
    ("perusahaan/log-aktifitas/page.tsx", "log aktifitas", False),
    ("perusahaan/pengiriman/page.tsx", "pengiriman", False),
    ("perusahaan/proses-akhir-bulan/page.tsx", "proses akhir bulan", False),
    ("perusahaan/transaksi-berulang/page.tsx", "transaksi berulang", False),
    ("perusahaan/transaksi-favorit/page.tsx", "transaksi favorit", False),
]

if __name__ == "__main__":
    fixed = 0
    for rel_path, context, has_two_divs in FILES:
        print(f"Processing: {rel_path}")
        if process_file(rel_path, context, has_two_divs):
            fixed += 1
    print(f"\nTotal fixed: {fixed}/{len(FILES)}")
