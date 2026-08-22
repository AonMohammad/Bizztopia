import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Settings as SettingsIcon, Layers, ShieldCheck, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Settings({ config }) {
    const [selectedVertical, setSelectedVertical] = useState(config?.name || 'Bizztopia');
    const [replicating, setReplicating] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Module toggle states
    const [modules, setModules] = useState({
        attract: true,
        engage: true,
        value: true,
        social: true,
        inspire: true,
    });

    const toggleModule = (key) => {
        setModules({ ...modules, [key]: !modules[key] });
    };

    const handleReplicate = (name) => {
        setSelectedVertical(name);
        setReplicating(true);
        setTimeout(() => {
            setReplicating(false);
            setSuccessMessage(`Successfully replicated Master CAP settings to target vertical: ${name}`);
            setTimeout(() => setSuccessMessage(null), 4000);
        }, 1200);
    };

    return (
        <AdminLayout title="Platform Settings Resource">
            <Head title="Platform Settings — Filament Admin" />

            <div className="max-w-4xl space-y-8 text-xs">
                {successMessage && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {successMessage}
                    </div>
                )}

                {/* Instance Overview */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                        <SettingsIcon className="w-4 h-4 text-amber-400" /> Active Ecosystem Profile Configuration
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 font-semibold block">Platform Name</span>
                            <span className="text-sm font-extrabold text-white">{config?.name || 'Bizztopia'}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 font-semibold block">Target Domain</span>
                            <span className="text-sm font-extrabold text-white">{config?.domain || 'bizztopia.com'}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 font-semibold block">Target Region</span>
                            <span className="text-sm font-extrabold text-white">{config?.region || 'North America'}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 font-semibold block">Industry Scope</span>
                            <span className="text-sm font-extrabold text-white">{config?.industry || 'General Business'}</span>
                        </div>
                    </div>
                </div>

                {/* Module Feature Flags Toggles */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                        <ShieldCheck className="w-4 h-4 text-amber-400" /> Toggle Module Feature Availability
                    </h3>

                    <div className="space-y-3">
                        {[
                            { key: 'attract', name: 'Module 01 — Ideas Knowledge Hub' },
                            { key: 'engage', name: 'Module 02 — Engage Interactive Arena' },
                            { key: 'value', name: 'Module 03 — Value Financial Workshop' },
                            { key: 'social', name: 'Module 04 — Social Reputation Network' },
                            { key: 'inspire', name: 'Module 05 — Inspire Visual Showroom' },
                        ].map((mod) => (
                            <div key={mod.key} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="font-bold text-white">{mod.name}</span>
                                <button
                                    onClick={() => toggleModule(mod.key)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                                        modules[mod.key] 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                            : 'bg-slate-800 text-slate-400 border-slate-700'
                                    }`}
                                >
                                    {modules[mod.key] ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                                    <span>{modules[mod.key] ? 'Enabled' : 'Disabled'}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical Replication Controls */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-base font-bold font-outfit text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                        <Layers className="w-4 h-4 text-amber-400" /> Replicate CAP Architecture to Target Vertical
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: 'Regentology', domain: 'regentology.com', tag: 'Real Estate' },
                            { name: 'Rate My Doc', domain: 'ratemydoc.com', tag: 'Medical' },
                            { name: 'HouzzWise', domain: 'houzzwise.com', tag: 'Home Remodeling' },
                            { name: 'TruSecur', domain: 'trusecur.com', tag: 'Solar Energy' },
                        ].map((v) => (
                            <div key={v.name} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-white">{v.name}</div>
                                    <div className="text-[10px] text-slate-400">{v.tag}</div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleReplicate(v.name)}
                                    isLoading={replicating && selectedVertical === v.name}
                                    className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                                >
                                    Replicate
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
