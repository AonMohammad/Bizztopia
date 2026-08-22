import React from 'react';

export interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    name = '',
    size = 'md',
    className = ''
}) => {
    const sizeMap = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg'
    };

    const getInitials = (str: string) => {
        if (!str) return '?';
        const parts = str.trim().split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return str.substring(0, 2).toUpperCase();
    };

    return (
        <div
            className={`
                relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0
                bg-gradient-to-br from-[#0B4778] to-[#287FBA] text-white font-semibold shadow-xs
                ${sizeMap[size]}
                ${className}
            `}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span>{getInitials(name)}</span>
            )}
        </div>
    );
};
