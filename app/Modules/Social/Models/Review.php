<?php

namespace App\Modules\Social\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reviewer_name',
        'business_name',
        'service_category',
        'rating',
        'title',
        'review_body',
        'is_verified',
        'status',
    ];
}
