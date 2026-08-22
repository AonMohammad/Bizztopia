<?php

namespace App\Modules\Attract\Services;

use App\Core\FeatureFlags\FeatureFlagManager;
use App\Shared\Contracts\ModuleInterface;

class AttractService implements ModuleInterface
{
    public function getId(): string
    {
        return 'attract';
    }

    public function getTitle(): string
    {
        return 'Attract — Knowledge Hub';
    }

    public function isEnabled(): bool
    {
        return FeatureFlagManager::isEnabled('attract');
    }

    /**
     * Get featured knowledge articles.
     */
    public function getFeaturedArticles(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'How to Build a High-Converting Local Business Presence',
                'category' => 'Guide',
                'read_time' => '8 min read',
                'summary' => 'Step-by-step strategy for capturing high-intent search traffic and optimizing customer acquisition.',
            ],
            [
                'id' => 2,
                'title' => '2026 Business Startup & Digital Infrastructure Checklist',
                'category' => 'Checklist',
                'read_time' => '5 min read',
                'summary' => 'Essential technical and legal checklist for modern digital business operations.',
            ],
        ];
    }
}
