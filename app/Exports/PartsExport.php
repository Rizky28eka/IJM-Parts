<?php

namespace App\Exports;

use App\Models\Part;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PartsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Part::with(['category', 'brand'])->get();
    }

    public function headings(): array
    {
        return [
            'SKU',
            'Name',
            'Category',
            'Brand',
            'Unit',
            'Location',
            'Buy Price',
            'Min Stock',
            'Current Stock',
        ];
    }

    public function map($part): array
    {
        return [
            $part->sku,
            $part->name,
            $part->category?->name ?? '-',
            $part->brand?->name ?? '-',
            $part->unit,
            $part->location ?? '-',
            $part->buy_price,
            $part->min_stock,
            $part->stock,
        ];
    }
}
