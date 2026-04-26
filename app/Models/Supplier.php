<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'phone', 'contact_person'];

    public function inbounds(): HasMany
    {
        return $this->hasMany(Inbound::class);
    }
}
