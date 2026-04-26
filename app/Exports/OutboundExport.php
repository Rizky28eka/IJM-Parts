<?php

namespace App\Exports;

use App\Models\OutboundDetail;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class OutboundExport implements FromCollection, WithHeadings, WithMapping
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate = null, $endDate = null)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function collection()
    {
        $query = OutboundDetail::with(['outbound.mechanic', 'outbound.user', 'part']);

        if ($this->startDate) {
            $query->whereHas('outbound', fn($q) => $q->where('date', '>=', $this->startDate));
        }

        if ($this->endDate) {
            $query->whereHas('outbound', fn($q) => $q->where('date', '<=', $this->endDate));
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'Date',
            'Reference Number',
            'Type',
            'License Plate',
            'Mechanic/Customer',
            'Part SKU',
            'Part Name',
            'Quantity',
            'Admin',
        ];
    }

    public function map($detail): array
    {
        return [
            $detail->outbound?->date,
            $detail->outbound?->reference_number ?? '-',
            ucfirst($detail->outbound?->type ?? '-'),
            $detail->outbound?->license_plate ?? '-',
            $detail->outbound?->mechanic?->name ?? 'Direct Sales',
            $detail->part?->sku,
            $detail->part?->name,
            $detail->quantity . ' ' . $detail->part?->unit,
            $detail->outbound?->user?->name,
        ];
    }
}
