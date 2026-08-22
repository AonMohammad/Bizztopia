<?php

namespace App\Shared\Contracts;

interface ModuleInterface
{
    /**
     * Get the unique module identifier.
     */
    public function getId(): string;

    /**
     * Get the module title.
     */
    public function getTitle(): string;

    /**
     * Check if the module is enabled via Feature Flags.
     */
    public function isEnabled(): bool;
}
