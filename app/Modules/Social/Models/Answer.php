<?php

namespace App\Modules\Social\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'user_id',
        'author_name',
        'author_role',
        'body',
        'upvotes_count',
        'is_accepted',
    ];

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}
