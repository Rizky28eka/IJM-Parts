<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Part extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku', 'name', 'category_id', 'brand_id', 
        'location', 'unit', 'stock', 'min_stock', 'buy_price'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function inboundDetails(): HasMany
    {
        return $this->hasMany(InboundDetail::class);
    }

    public function outboundDetails(): HasMany
    {
        return $this->hasMany(OutboundDetail::class);
    }

    public function stockAdjustments(): HasMany
    {
        return $this->hasMany(StockAdjustment::class);
    }
}
