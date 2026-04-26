<?php

namespace App\Http\Controllers;

use App\Exports\InboundExport;
use App\Exports\OutboundExport;
use App\Exports\PartsExport;
use App\Models\InboundDetail;
use App\Models\OutboundDetail;
use App\Models\Part;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index');
    }

    public function download(Request $request)
    {
        $request->validate([
            'type' => 'required|in:inventory,inbound,outbound',
            'format' => 'required|in:excel,pdf',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $type = $request->input('type');
        $format = $request->input('format');
        $start = $request->input('start_date');
        $end = $request->input('end_date');

        if ($format === 'excel') {
            return $this->exportExcel($type, $start, $end);
        } else {
            return $this->exportPdf($type, $start, $end);
        }
    }

    private function exportExcel($type, $start, $end)
    {
        $filename = "report_{$type}_" . now()->format('Ymd_His') . ".xlsx";

        switch ($type) {
            case 'inventory':
                return Excel::download(new PartsExport, $filename);
            case 'inbound':
                return Excel::download(new InboundExport($start, $end), $filename);
            case 'outbound':
                return Excel::download(new OutboundExport($start, $end), $filename);
        }
    }

    private function exportPdf($type, $start, $end)
    {
        $filename = "report_{$type}_" . now()->format('Ymd_His');
        $data = [];
        $view = '';
        $title = '';

        switch ($type) {
            case 'inventory':
                $data['items'] = Part::with(['category', 'brand'])->get();
                $view = 'reports.inventory';
                $title = 'Laporan Stok Barang';
                break;
            case 'inbound':
                $query = InboundDetail::with(['inbound.supplier', 'part']);
                if ($start) $query->whereHas('inbound', fn($q) => $q->where('date', '>=', $start));
                if ($end) $query->whereHas('inbound', fn($q) => $q->where('date', '<=', $end));
                $data['details'] = $query->get();
                $data['start_date'] = $start;
                $data['end_date'] = $end;
                $view = 'reports.inbound';
                $title = 'Laporan Barang Masuk';
                break;
            case 'outbound':
                $query = OutboundDetail::with(['outbound.mechanic', 'part']);
                if ($start) $query->whereHas('outbound', fn($q) => $q->where('date', '>=', $start));
                if ($end) $query->whereHas('outbound', fn($q) => $q->where('date', '<=', $end));
                $data['details'] = $query->get();
                $data['start_date'] = $start;
                $data['end_date'] = $end;
                $view = 'reports.outbound';
                $title = 'Laporan Barang Keluar';
                break;
        }

        $data['title'] = $title;
        $data['date_generated'] = now()->format('d F Y H:i');

        $pdf = Pdf::loadView($view, $data);
        return $pdf->download("{$filename}.pdf");
    }
}
