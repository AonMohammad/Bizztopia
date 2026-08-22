import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    helperText,
    icon,
    fullWidth = true,
    className = '',
    id,
    disabled,
    ...props
}, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`${fullWidth ? 'w-full' : ''} space-y-1.5`}>
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="block text-xs font-semibold uppercase tracking-wider text-[#466071]"
                >
                    {label}
                </label>
            )}
            <div className="relative rounded-xl shadow-xs">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718797]">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    className={`
                        block w-full rounded-xl text-sm transition-all duration-200
                        bg-white text-[#102A3D] placeholder-[#94A6B3]
                        border ${error ? 'border-[#D95353] focus:ring-[#D95353]' : 'border-[#D4E0E7] focus:border-[#4A9AD4] focus:ring-[#4A9AD4]/30'}
                        focus:outline-none focus:ring-4
                        disabled:bg-[#F7FAFC] disabled:text-[#94A6B3] disabled:cursor-not-allowed
                        ${icon ? 'pl-10' : 'px-4'} py-2.5
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-[#D95353] font-medium flex items-center gap-1">
                    <span>•</span> {error}
                </p>
            )}
            {!error && helperText && (
                <p className="text-xs text-[#718797]">
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
