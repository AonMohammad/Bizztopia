import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    badge?: string | number;
    disabled?: boolean;
}

export interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onChange: (id: string) => void;
    variant?: 'pills' | 'underline';
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab,
    onChange,
    variant = 'pills',
    className,
}) => {
    return (
        <div className={twMerge(clsx('flex items-center gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-2xl glass-panel', className))}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => !tab.disabled && onChange(tab.id)}
                        disabled={tab.disabled}
                        className={clsx(
                            'inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 select-none',
                            isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50',
                            tab.disabled && 'opacity-40 cursor-not-allowed'
                        )}
                    >
                        {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                        <span>{tab.label}</span>
                        {tab.badge && (
                            <span
                                className={clsx(
                                    'px-2 py-0.5 text-xs rounded-full font-bold',
                                    isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                                )}
                            >
                                {tab.badge}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};
