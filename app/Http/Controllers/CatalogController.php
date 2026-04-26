<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Part;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index()
    {
        return Inertia::render('Catalog/Index', [
            'parts' => Part::with(['category', 'brand'])->latest()->get()
        ]);
    }
}
