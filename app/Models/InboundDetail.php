<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InboundDetail extends Model
{
    use HasFactory;

    protected $fillable = ['inbound_id', 'part_id', 'quantity'];

    public function inbound(): BelongsTo
    {
        return $this->belongsTo(Inbound::class);
    }

    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}

