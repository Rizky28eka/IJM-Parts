<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OutboundDetail extends Model
{
    use HasFactory;

    protected $fillable = ['outbound_id', 'part_id', 'quantity'];

    public function outbound(): BelongsTo
    {
        return $this->belongsTo(Outbound::class);
    }

    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}

