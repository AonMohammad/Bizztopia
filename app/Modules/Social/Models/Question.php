<?php

namespace App\Modules\Social\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'author_name',
        'author_role',
        'title',
        'slug',
        'body',
        'category',
        'upvotes_count',
        'answers_count',
        'is_solved',
        'status',
    ];

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class)->orderBy('is_accepted', 'desc')->orderBy('upvotes_count', 'desc');
    }
}
