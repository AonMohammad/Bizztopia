import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className,
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
        primary: 'bg-[#4A9AD4] hover:bg-[#3B8CC8] active:bg-[#2F7FBB] text-white shadow-md shadow-[#4A9AD4]/20 border border-[#8FC7E8]/30',
        secondary: 'bg-[#0B4778] hover:bg-[#083B66] text-white shadow-md shadow-[#0B4778]/20 border border-[#062F52]',
        accent: 'bg-[#63B5E8] hover:bg-[#4A9AD4] text-white shadow-md shadow-[#63B5E8]/20',
        gradient: 'bg-gradient-brand text-white shadow-lg shadow-[#0B4778]/25 hover:opacity-95 border border-[#8FC7E8]/30',
        outline: 'border border-[#B9CBD6] hover:border-[#4A9AD4] bg-white text-[#102A3D] hover:bg-[#F4FAFE]',
        ghost: 'bg-transparent text-[#466071] hover:text-[#0B4778] hover:bg-[#EAF5FC]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2.5 font-bold',
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : icon ? (
                <span className="shrink-0">{icon}</span>
            ) : null}
            {children}
        </button>
    );
};
