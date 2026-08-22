export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: string;
    role: 'consumer' | 'business_owner' | 'business_staff' | 'author' | 'moderator' | 'admin' | 'super_admin';
    created_at: string;
}

export interface PageProps<T = Record<string, unknown>> {
    auth: {
        user: User | null;
    };
    featureFlags: FeatureFlags;
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface FeatureFlags {
    attract: boolean;
    engage: boolean;
    value: boolean;
    social: boolean;
    inspire: boolean;
    discover: boolean;
}

export type ModuleType = 'attract' | 'engage' | 'value' | 'social' | 'inspire';

export interface ModuleMetadata {
    id: ModuleType;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    badgeText: string;
    colorScheme: string;
    enabled: boolean;
}
