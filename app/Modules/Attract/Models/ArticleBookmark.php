<?php

namespace App\Modules\Attract\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleBookmark extends Model
{
    protected $table = 'article_bookmarks';

    protected $fillable = [
        'article_id',
        'session_id',
        'ip_address',
    ];

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
