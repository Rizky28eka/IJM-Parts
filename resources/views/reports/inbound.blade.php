<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
    <style>
        body { font-family: sans-serif; font-size: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .header { text-align: center; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Indah Jaya Motor</h2>
        <h3>{{ $title }}</h3>
        @if($start_date || $end_date)
            <p>Periode: {{ $start_date ?? 'Awal' }} s/d {{ $end_date ?? 'Sekarang' }}</p>
        @endif
        <p>Dicetak pada: {{ $date_generated }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Tgl</th>
                <th>No. Invoice</th>
                <th>Supplier</th>
                <th>Barang</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Admin</th>
            </tr>
        </thead>
        <tbody>
            @foreach($details as $detail)
            <tr>
                <td>{{ $detail->inbound?->date }}</td>
                <td>{{ $detail->inbound?->invoice_number ?? '-' }}</td>
                <td>{{ $detail->inbound?->supplier?->name ?? '-' }}</td>
                <td>{{ $detail->part?->name }}</td>
                <td>{{ $detail->part?->sku }}</td>
                <td>{{ $detail->quantity }} {{ $detail->part?->unit }}</td>
                <td>{{ $detail->inbound?->user?->name }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
