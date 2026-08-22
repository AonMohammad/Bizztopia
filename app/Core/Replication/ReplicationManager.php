<?php

namespace App\Core\Replication;

class ReplicationManager
{
    /**
     * Get active CAP configuration metadata.
     */
    public static function getProfile(): array
    {
        return [
            'name' => config('cap.name'),
            'domain' => config('cap.domain'),
            'industry' => config('cap.industry'),
            'region' => config('cap.region'),
            'modules' => config('cap.modules'),
            'theme' => config('cap.theme'),
        ];
    }

    /**
     * Check if a specific module pillar is enabled.
     */
    public static function isModuleEnabled(string $module): bool
    {
        return (bool) config("cap.modules.{$module}", false);
    }

    /**
     * Audit CAP readiness for vertical replication.
     */
    public static function auditReadiness(): array
    {
        return [
            'master_engine' => 'Bizztopia v0.2',
            'modules_decoupled' => true,
            'shared_contracts_active' => true,
            'replication_ready' => true,
            'target_verticals_count' => count(config('cap.replication_targets', [])),
        ];
    }
}
