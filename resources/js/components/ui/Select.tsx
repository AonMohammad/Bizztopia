import React, { forwardRef } from 'react';

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    helperText?: string;
    placeholder?: string;
    fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    options,
    error,
    helperText,
    placeholder = 'Select an option...',
    fullWidth = true,
    className = '',
    id,
    disabled,
    ...props
}, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`${fullWidth ? 'w-full' : ''} space-y-1.5`}>
            {label && (
                <label 
                    htmlFor={selectId} 
                    className="block text-xs font-semibold uppercase tracking-wider text-[#466071]"
                >
                    {label}
                </label>
            )}
            <div className="relative rounded-xl shadow-xs">
                <select
                    ref={ref}
                    id={selectId}
                    disabled={disabled}
                    className={`
                        block w-full rounded-xl text-sm transition-all duration-200 appearance-none
                        bg-white text-[#102A3D]
                        border ${error ? 'border-[#D95353] focus:ring-[#D95353]' : 'border-[#D4E0E7] focus:border-[#4A9AD4] focus:ring-[#4A9AD4]/30'}
                        focus:outline-none focus:ring-4
                        disabled:bg-[#F7FAFC] disabled:text-[#94A6B3] disabled:cursor-not-allowed
                        px-4 py-2.5 pr-10
                        ${className}
                    `}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#718797]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
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

Select.displayName = 'Select';
