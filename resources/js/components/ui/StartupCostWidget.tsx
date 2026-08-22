import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Input } from './Input';
import { DollarSign, ShieldCheck, PieChart, Plus, Trash2 } from 'lucide-react';

export interface StartupItem {
    id: number;
    category: string;
    name: string;
    amount: number;
}

export interface StartupCostWidgetProps {
    className?: string;
}

export const StartupCostWidget: React.FC<StartupCostWidgetProps> = ({ className = '' }) => {
    const [items, setItems] = useState<StartupItem[]>([
        { id: 1, category: 'Legal & Registration', name: 'LLC / Inc Business Registration & EIN', amount: 650 },
        { id: 2, category: 'Web & CAP Engine', name: 'Next.js Domain & SSL Web Platform', amount: 1800 },
        { id: 3, category: 'Launch Marketing', name: 'Initial Lead Acquisition & Search Ads', amount: 1200 },
        { id: 4, category: 'Operations & Tech', name: 'Software Suite & CRM Automation', amount: 850 },
    ]);

    const [newItemCategory, setNewItemCategory] = useState<string>('General');
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemAmount, setNewItemAmount] = useState<string>('');

    const addItem = () => {
        if (!newItemName || !newItemAmount) return;
        const amt = parseFloat(newItemAmount) || 0;
        const newItem: StartupItem = {
            id: Date.now(),
            category: newItemCategory,
            name: newItemName,
            amount: amt
        };
        setItems([...items, newItem]);
        setNewItemName('');
        setNewItemAmount('');
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const reserve = Math.round(subtotal * 0.15); // 15% emergency contingency
    const totalRequired = subtotal + reserve;

    return (
        <div 
            className={`
                bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EEF3] shadow-xs 
                hover:shadow-md transition-all duration-300 space-y-6
                ${className}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF8F1] text-[#249A68] flex items-center justify-center font-bold">
                        <PieChart className="w-5 h-5" />
                    </div>
                    <div>
                        <Badge variant="success" size="sm">Value Tool</Badge>
                        <h3 className="text-xl font-bold font-outfit text-[#102A3D]">Startup Capital Estimator</h3>
                    </div>
                </div>
                <span className="text-xs font-semibold text-[#718797]">15% Reserve Auto-Calculated</span>
            </div>

            {/* Expenses List */}
            <div className="space-y-3">
                {items.map((item) => (
                    <div 
                        key={item.id} 
                        className="p-3.5 rounded-xl border border-[#E6EEF3] bg-[#F7FAFC] flex items-center justify-between text-xs"
                    >
                        <div>
                            <span className="font-semibold text-[#102A3D] block">{item.name}</span>
                            <span className="text-[10px] text-[#718797] uppercase tracking-wider">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-[#0B4778]">${item.amount.toLocaleString()}</span>
                            <button 
                                onClick={() => removeItem(item.id)}
                                className="text-[#D95353] hover:text-[#A93636] transition-colors p-1"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Custom Item Inputs */}
            <div className="p-4 rounded-xl border border-[#D4E0E7] bg-[#F4FAFE] space-y-3">
                <span className="text-xs font-bold text-[#466071] uppercase tracking-wider block">Add Custom Startup Expense</span>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-6">
                        <Input 
                            placeholder="Expense name (e.g. Licensing)" 
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-4">
                        <Input 
                            placeholder="Amount ($)" 
                            type="number"
                            value={newItemAmount}
                            onChange={(e) => setNewItemAmount(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Button variant="primary" fullWidth onClick={addItem}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Summary Totals Footer */}
            <div className="p-6 rounded-2xl bg-[#0B4778] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <span className="text-xs text-[#8FC7E8]">Subtotal: ${subtotal.toLocaleString()} + 15% Reserve: ${reserve.toLocaleString()}</span>
                    <div className="text-sm font-bold text-white">Recommended Total Capital Needed</div>
                </div>
                <div className="text-3xl font-extrabold text-[#63B5E8]">
                    ${totalRequired.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
