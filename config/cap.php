<?php

return [

    /*
    |--------------------------------------------------------------------------
    | CAP Ecosystem Vertical Profile
    |--------------------------------------------------------------------------
    |
    | Configuration defining the active Customer Acquisition Platform instance.
    | Bizztopia serves as the master reference implementation for Techception.
    |
    */

    'name' => env('CAP_NAME', 'Bizztopia'),

    'domain' => env('CAP_DOMAIN', 'bizztopia.com'),

    'industry' => env('CAP_INDUSTRY', 'General Businesses'),

    'region' => env('CAP_REGION', 'North America'),

    /*
    |--------------------------------------------------------------------------
    | Enabled Module Pillars
    |--------------------------------------------------------------------------
    |
    | Feature flags controlling module availability across verticals.
    |
    */

    'modules' => [
        'attract' => env('CAP_MODULE_ATTRACT', true),
        'engage' => env('CAP_MODULE_ENGAGE', true),
        'value' => env('CAP_MODULE_VALUE', true),
        'social' => env('CAP_MODULE_SOCIAL', true),
        'inspire' => env('CAP_MODULE_INSPIRE', true),
        'discover' => env('CAP_MODULE_DISCOVER', false), // Future Phase
    ],

    /*
    |--------------------------------------------------------------------------
    | Theme & Design System Tokens
    |--------------------------------------------------------------------------
    |
    */

    'theme' => [
        'primary_color' => '#4A9AD4',
        'secondary_color' => '#0B4778',
        'dark_navy' => '#062F52',
        'accent_color' => '#63B5E8',
    ],

    /*
    |--------------------------------------------------------------------------
    | Future CAP Replication Target Matrix
    |--------------------------------------------------------------------------
    |
    */

    'replication_targets' => [
        'Regentology' => 'Real Estate Professionals',
        'Rate My Doc' => 'Healthcare & Medical',
        'WeddingHub' => 'Wedding Professionals',
        'MuzzBizz' => 'Muslim-Owned Businesses',
        'HouzzWise' => 'Home Improvement',
        'KiddoTurf' => 'Kids & Family Services',
        'TruSecur' => 'Home Security & Energy',
    ],
];
