<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PartRequestDetail extends Model
{
    use HasFactory;

    protected $fillable = ['part_request_id', 'part_id', 'quantity'];

    public function partRequest(): BelongsTo
    {
        return $this->belongsTo(PartRequest::class);
    }

    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}
