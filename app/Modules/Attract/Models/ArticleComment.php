<?php

namespace App\Modules\Attract\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleComment extends Model
{
    protected $table = 'article_comments';

    protected $fillable = [
        'article_id',
        'author_name',
        'author_email',
        'author_company',
        'body',
        'status',
        'ip_address',
    ];

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
