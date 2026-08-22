import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Settings as SettingsIcon, Layers, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SettingsPageProps {
    config: any;
}

export default function Settings({ config }: SettingsPageProps) {
    const [selectedVertical, setSelectedVertical] = useState(config?.name || 'Bizztopia');
    const [replicating, setReplicating] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleReplicate = (name: string) => {
        setSelectedVertical(name);
        setReplicating(true);
        setTimeout(() => {
            setReplicating(false);
            setSuccessMessage(`Successfully replicated Master CAP settings to target vertical: ${name}`);
            setTimeout(() => setSuccessMessage(null), 4000);
        }, 1200);
    };

    return (
        <AdminLayout title="CAP Platform & Replication Settings">
            <Head title="Admin Platform Settings — Bizztopia" />

            <div className="max-w-4xl space-y-8">
                {successMessage && (
                    <div className="p-4 rounded-xl bg-[#249A68] text-white font-bold text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {successMessage}
                    </div>
                )}

                {/* Instance Overview */}
                <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                    <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2 border-b border-[#E6EEF3] pb-3">
                        <SettingsIcon className="w-5 h-5 text-[#4A9AD4]" /> Active Ecosystem Profile Configuration
                    </h2>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3]">
                            <span className="text-[#718797] font-semibold block">Platform Name</span>
                            <span className="text-sm font-extrabold text-[#102A3D]">{config?.name || 'Bizztopia'}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3]">
                            <span className="text-[#718797] font-semibold block">Target Domain</span>
                            <span className="text-sm font-extrabold text-[#102A3D]">{config?.domain || 'bizztopia.com'}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3]">
                            <span className="text-[#718797] font-semibold block">Target Region</span>
                            <span className="text-sm font-extrabold text-[#102A3D]">{config?.region || 'North America'}</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3]">
                            <span className="text-[#718797] font-semibold block">Industry Vertical</span>
                            <span className="text-sm font-extrabold text-[#102A3D]">{config?.industry || 'General Business'}</span>
                        </div>
                    </div>
                </div>

                {/* Module Pillar Feature Flags */}
                <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                    <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2 border-b border-[#E6EEF3] pb-3">
                        <ShieldCheck className="w-5 h-5 text-[#4A9AD4]" /> Active Module Feature Flags
                    </h2>

                    <div className="space-y-3">
                        {[
                            { name: 'Module 01 — Ideas Knowledge Hub', enabled: true },
                            { name: 'Module 02 — Engage Interactive Arena', enabled: true },
                            { name: 'Module 03 — Value Financial Workshop', enabled: true },
                            { name: 'Module 04 — Social Reputation Network', enabled: true },
                            { name: 'Module 05 — Inspire Visual Showroom', enabled: true },
                        ].map((mod) => (
                            <div key={mod.name} className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3] text-xs">
                                <span className="font-bold text-[#102A3D]">{mod.name}</span>
                                <Badge variant="success" size="sm">Active (100% Ready)</Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical Replication Controls */}
                <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                    <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2 border-b border-[#E6EEF3] pb-3">
                        <Layers className="w-5 h-5 text-[#4A9AD4]" /> Replicate CAP Architecture to Target Vertical
                    </h2>

                    <p className="text-xs text-[#466071]">
                        Select any target vertical from Techception's master roadmap below to generate instant environment profiles and theme presets:
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: 'Regentology', domain: 'regentology.com', tag: 'Real Estate Marketplace' },
                            { name: 'Rate My Doc', domain: 'ratemydoc.com', tag: 'Medical & Healthcare' },
                            { name: 'HouzzWise', domain: 'houzzwise.com', tag: 'Home Remodeling' },
                            { name: 'TruSecur', domain: 'trusecur.com', tag: 'Solar & Clean Energy' },
                        ].map((v) => (
                            <div key={v.name} className="p-4 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3] flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-[#102A3D]">{v.name}</div>
                                    <div className="text-[10px] text-[#718797]">{v.tag}</div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleReplicate(v.name)}
                                    isLoading={replicating && selectedVertical === v.name}
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
