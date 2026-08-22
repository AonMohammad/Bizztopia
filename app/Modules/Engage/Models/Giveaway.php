<?php

namespace App\Modules\Engage\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Giveaway extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'prize_value',
        'ends_at',
        'total_entries',
        'status',
        'rules',
    ];

    protected $casts = [
        'ends_at' => 'datetime',
        'total_entries' => 'integer',
    ];

    public function entries(): HasMany
    {
        return $this->hasMany(GiveawayEntry::class);
    }
}
