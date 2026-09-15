import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { 
    X, 
    ShieldCheck, 
    Lock, 
    Mail, 
    User, 
    Building2, 
    ArrowRight, 
    Loader2, 
    CheckCircle2, 
    Eye, 
    EyeOff,
    Sparkles
} from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'register';
    noticeMessage?: string;
    onSuccessCallback?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
    isOpen,
    onClose,
    initialMode = 'login',
    noticeMessage,
    onSuccessCallback,
}) => {
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [accountType, setAccountType] = useState<'consumer' | 'business'>('consumer');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode, isOpen]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Login Form
    const loginForm = useForm({
        email: '',
        password: '',
        remember: true,
    });

    // Register Form
    const registerForm = useForm({
        name: '',
        email: '',
        password: '',
        role: 'consumer',
        business_name: '',
    });

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginForm.post('/login', {
            preserveScroll: true,
            onSuccess: () => {
                loginForm.reset('password');
                onClose();
                if (onSuccessCallback) {
                    onSuccessCallback();
                }
            },
        });
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerForm.setData('role', accountType === 'business' ? 'business_owner' : 'consumer');
        registerForm.post('/register', {
            preserveScroll: true,
            onSuccess: () => {
                registerForm.reset('password');
                onClose();
                if (onSuccessCallback) {
                    onSuccessCallback();
                }
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with blur */}
            <div 
                className="fixed inset-0 bg-[#031729]/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div 
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#031729] via-[#0B4778] to-[#287FBA] text-white p-6 sm:p-7 relative">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-7 h-7 rounded-lg bg-[#287FBA] flex items-center justify-center text-white shadow-xs">
                            <ShieldCheck className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-black tracking-wider uppercase text-blue-200">
                            Bizztopia Secure Access
                        </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black font-outfit text-white tracking-tight">
                        {mode === 'login' ? 'Log in to Your Account' : 'Create a Free Account'}
                    </h2>
                    
                    {noticeMessage ? (
                        <p className="text-xs text-blue-100 font-medium mt-1.5 flex items-center gap-1.5 bg-white/10 p-2 rounded-xl">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                            <span>{noticeMessage}</span>
                        </p>
                    ) : (
                        <p className="text-xs text-blue-100/90 font-medium mt-1">
                            {mode === 'login' 
                                ? 'Access your dashboard, manage reviews, and explore verified business solutions.' 
                                : 'Join over 2.4 million local consumers and verified service pros.'
                            }
                        </p>
                    )}

                    {/* Mode Toggle Tabs */}
                    <div className="grid grid-cols-2 gap-1 bg-white/15 p-1 rounded-2xl mt-4 text-xs font-black">
                        <button 
                            type="button"
                            onClick={() => setMode('login')}
                            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                mode === 'login' 
                                    ? 'bg-white text-[#0B4778] shadow-md' 
                                    : 'text-white/80 hover:text-white'
                            }`}
                        >
                            Log In
                        </button>
                        <button 
                            type="button"
                            onClick={() => setMode('register')}
                            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                mode === 'register' 
                                    ? 'bg-white text-[#0B4778] shadow-md' 
                                    : 'text-white/80 hover:text-white'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Form Body */}
                <div className="p-6 sm:p-7 space-y-4">
                    {mode === 'login' ? (
                        /* LOGIN FORM */
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            {loginForm.errors.email && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600">
                                    {loginForm.errors.email}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="email" 
                                        required
                                        value={loginForm.data.email}
                                        onChange={(e) => loginForm.setData('email', e.target.value)}
                                        placeholder="you@domain.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA] focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-xs">
                                    <label className="font-black uppercase tracking-wider text-slate-700">
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        required
                                        value={loginForm.data.password}
                                        onChange={(e) => loginForm.setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA] focus:bg-white transition-all"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1">
                                <label className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={loginForm.data.remember}
                                        onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded text-[#287FBA] focus:ring-[#287FBA]"
                                    />
                                    <span>Remember me</span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loginForm.processing}
                                className="w-full bg-[#287FBA] hover:bg-[#0B4778] disabled:opacity-75 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                            >
                                {loginForm.processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Log In</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center text-xs font-medium text-slate-500">
                                Don't have an account?{' '}
                                <button 
                                    type="button" 
                                    onClick={() => setMode('register')} 
                                    className="text-[#287FBA] font-extrabold hover:underline cursor-pointer"
                                >
                                    Sign up now
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* REGISTER FORM */
                        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                            {/* Account Type Toggle */}
                            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setAccountType('consumer');
                                        registerForm.setData('role', 'consumer');
                                    }}
                                    className={`py-2 px-2.5 rounded-xl font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                        accountType === 'consumer' ? 'bg-[#287FBA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <User className="w-3.5 h-3.5" />
                                    <span>Consumer / Buyer</span>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setAccountType('business');
                                        registerForm.setData('role', 'business_owner');
                                    }}
                                    className={`py-2 px-2.5 rounded-xl font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                        accountType === 'business' ? 'bg-[#287FBA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <Building2 className="w-3.5 h-3.5" />
                                    <span>Business Owner</span>
                                </button>
                            </div>

                            {registerForm.errors.email && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600">
                                    {registerForm.errors.email}
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="text" 
                                        required
                                        value={registerForm.data.name}
                                        onChange={(e) => registerForm.setData('name', e.target.value)}
                                        placeholder="Alex Johnson"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA] focus:bg-white"
                                    />
                                </div>
                            </div>

                            {accountType === 'business' && (
                                <div className="space-y-1">
                                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                                        Business Name
                                    </label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text" 
                                            value={registerForm.data.business_name}
                                            onChange={(e) => registerForm.setData('business_name', e.target.value)}
                                            placeholder="Apex Solutions LLC"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA] focus:bg-white"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type="email" 
                                        required
                                        value={registerForm.data.email}
                                        onChange={(e) => registerForm.setData('email', e.target.value)}
                                        placeholder="alex@domain.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA] focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        required
                                        value={registerForm.data.password}
                                        onChange={(e) => registerForm.setData('password', e.target.value)}
                                        placeholder="Min 6 characters"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA] focus:bg-white"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={registerForm.processing}
                                className="w-full bg-[#287FBA] hover:bg-[#0B4778] disabled:opacity-75 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                            >
                                {registerForm.processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center text-xs font-medium text-slate-500">
                                Already registered?{' '}
                                <button 
                                    type="button" 
                                    onClick={() => setMode('login')} 
                                    className="text-[#287FBA] font-extrabold hover:underline cursor-pointer"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
