<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditorialBoard extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'layout_type',
        'category_filter',
        'ad_type',
        'ad_code',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
