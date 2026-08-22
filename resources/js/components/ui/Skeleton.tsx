import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular',
    ...props
}) => {
    const variantStyles = {
        text: 'h-4 w-full rounded-md',
        circular: 'rounded-full',
        rectangular: 'rounded-xl'
    };

    return (
        <div
            className={`
                animate-pulse bg-gradient-to-r from-[#EEF4F8] via-[#EAF5FC] to-[#EEF4F8]
                ${variantStyles[variant]}
                ${className}
            `}
            {...props}
        />
    );
};
