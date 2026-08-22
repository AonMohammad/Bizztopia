<?php

namespace App\Core\FeatureFlags;

class FeatureFlagManager
{
    /**
     * Get feature flag statuses for the master CAP architecture.
     *
     * @return array<string, bool>
     */
    public static function all(): array
    {
        return [
            'attract' => config('cap.features.attract', true),
            'engage' => config('cap.features.engage', true),
            'value' => config('cap.features.value', true),
            'social' => config('cap.features.social', true),
            'inspire' => config('cap.features.inspire', true),
            // Discover is explicitly out of scope for current phase
            'discover' => config('cap.features.discover', false),
        ];
    }

    /**
     * Check if a specific module is enabled.
     */
    public static function isEnabled(string $feature): bool
    {
        $flags = static::all();
        return $flags[strtolower($feature)] ?? false;
    }
}
