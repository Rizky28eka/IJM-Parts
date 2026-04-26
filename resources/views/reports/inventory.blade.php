<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .header { text-align: center; margin-bottom: 30px; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: right; font-size: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Indah Jaya Motor</h2>
        <h3>{{ $title }}</h3>
        <p>Tanggal Cetak: {{ $date_generated }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Nama Barang</th>
                <th>Kategori</th>
                <th>Merek</th>
                <th>Lokasi</th>
                <th>Harga Beli</th>
                <th>Stok</th>
                <th>Satuan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $item)
            <tr>
                <td>{{ $item->sku }}</td>
                <td>{{ $item->name }}</td>
                <td>{{ $item->category?->name ?? '-' }}</td>
                <td>{{ $item->brand?->name ?? '-' }}</td>
                <td>{{ $item->location ?? '-' }}</td>
                <td>Rp {{ number_format($item->buy_price, 0, ',', '.') }}</td>
                <td>{{ $item->stock }}</td>
                <td>{{ $item->unit }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dicetak secara otomatis oleh Sistem IJM Parts
    </div>
</body>
</html>
