<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartController extends Controller
{
    public function index()
    {
        return Inertia::render('Parts/Index', [
            'parts' => Part::with(['category', 'brand'])->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Parts/Create', [
            'categories' => Category::all(),
            'brands' => Brand::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sku' => 'required|string|max:255|unique:parts',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'location' => 'nullable|string|max:255',
            'unit' => 'required|string|max:20',
            'stock' => 'required|integer|min:0',
            'min_stock' => 'required|integer|min:0',
            'buy_price' => 'required|numeric|min:0',
        ]);

        Part::create($request->all());

        return redirect()->route('parts.index')->with('success', 'Part created successfully.');
    }

    public function edit(Part $part)
    {
        return Inertia::render('Parts/Edit', [
            'part' => $part,
            'categories' => Category::all(),
            'brands' => Brand::all(),
        ]);
    }

    public function update(Request $request, Part $part)
    {
        $request->validate([
            'sku' => 'required|string|max:255|unique:parts,sku,' . $part->id,
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'location' => 'nullable|string|max:255',
            'unit' => 'required|string|max:20',
            'stock' => 'required|integer|min:0',
            'min_stock' => 'required|integer|min:0',
            'buy_price' => 'required|numeric|min:0',
        ]);

        $part->update($request->all());

        return redirect()->route('parts.index')->with('success', 'Part updated successfully.');
    }

    public function destroy(Part $part)
    {
        $part->delete();

        return redirect()->route('parts.index')->with('success', 'Part deleted successfully.');
    }
}
