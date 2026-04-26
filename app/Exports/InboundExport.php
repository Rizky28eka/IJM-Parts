<?php

namespace App\Exports;

use App\Models\InboundDetail;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class InboundExport implements FromCollection, WithHeadings, WithMapping
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
        $query = InboundDetail::with(['inbound.supplier', 'inbound.user', 'part']);

        if ($this->startDate) {
            $query->whereHas('inbound', fn($q) => $q->where('date', '>=', $this->startDate));
        }

        if ($this->endDate) {
            $query->whereHas('inbound', fn($q) => $q->where('date', '<=', $this->endDate));
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'Date',
            'Invoice Number',
            'Supplier',
            'Part SKU',
            'Part Name',
            'Quantity',
            'Admin',
        ];
    }

    public function map($detail): array
    {
        return [
            $detail->inbound?->date,
            $detail->inbound?->invoice_number ?? '-',
            $detail->inbound?->supplier?->name ?? '-',
            $detail->part?->sku,
            $detail->part?->name,
            $detail->quantity . ' ' . $detail->part?->unit,
            $detail->inbound?->user?->name,
        ];
    }
}
