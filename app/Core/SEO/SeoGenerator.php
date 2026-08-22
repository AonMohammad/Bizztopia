<?php

namespace App\Core\SEO;

use App\Modules\Attract\Models\Article;

class SeoGenerator
{
    /**
     * Generate Schema.org JSON-LD structured metadata for AI answer engines (AEO).
     */
    public static function articleJsonLd(Article $article): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $article->title,
            'description' => $article->subtitle ?? $article->seo_description,
            'inLanguage' => 'en-US',
            'spatialCoverage' => 'North America',
            'articleSection' => $article->category->name ?? 'Business Ideas',
            'author' => [
                '@type' => 'Person',
                'name' => $article->author->name ?? 'North American Editorial Team',
                'jobTitle' => $article->author->role_title ?? 'Business Analyst',
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'Bizztopia',
                'url' => url('/'),
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('images/logo.png'),
                ],
            ],
            'datePublished' => $article->published_at ? $article->published_at->toIso8601String() : $article->created_at->toIso8601String(),
            'dateModified' => $article->updated_at->toIso8601String(),
            'mainEntityOfPage' => url("/ideas/{$article->slug}"),
        ];
    }
}
