import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'building' | 'user' | 'mail' | 'lock' | 'eye' | 'eyeOff' | 'arrow' | 'shield' | 'calendar';
    className?: string;
}) {
    const shared = {
        className,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true as const,
    };

    switch (name) {
        case 'building':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'user':
            return <svg {...shared}><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg>;
        case 'mail':
            return <svg {...shared}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
        case 'lock':
            return <svg {...shared}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" /></svg>;
        case 'eye':
            return <svg {...shared}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>;
        case 'eyeOff':
            return <svg {...shared}><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15.7 15.7 0 0 1-3 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.1-.8" /></svg>;
        case 'arrow':
            return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
        case 'shield':
            return <svg {...shared}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></svg>;
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
    }
}

const inputClass =
    'block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        level: '3',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const roles = [
        {
            value: '3',
            label: 'Staff',
            description: 'Create an account for staff access.',
        },
        {
            value: '2',
            label: 'Lecturer',
            description: 'Create an account for lecturer access.',
        },
    ];

    return (
        <>
            <Head title="Create account" />
            <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
                <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
                    <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                                <Icon name="building" />
                            </span>
                            <span>
                                <span className="block text-sm font-bold tracking-tight text-slate-900 sm:text-base">Venue Management System</span>
                                <span className="mt-0.5 block text-xs text-slate-500">Faculty of Computing &amp; Informatics</span>
                            </span>
                        </Link>
                        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex">
                            <Icon name="shield" className="h-4 w-4 text-emerald-700" />
                            Account registration
                        </div>
                    </div>
                </header>

                <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-60"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />
                    <section className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.22)] lg:grid-cols-5">
                        <div className="relative isolate flex flex-col justify-between overflow-hidden bg-slate-900 p-6 text-white sm:p-9 lg:col-span-2 lg:p-10">
                            <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
                                <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-blue-600/40 blur-3xl" />
                                <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
                                <div
                                    className="absolute inset-0 opacity-[0.08]"
                                    style={{
                                        backgroundImage: 'radial-gradient(#dbeafe 1px, transparent 1px)',
                                        backgroundSize: '20px 20px',
                                    }}
                                />
                            </div>
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                                    <Icon name="shield" className="h-4 w-4" />
                                    Venue access portal
                                </span>
                                <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                                    Create your account.
                                </h1>
                                <p className="mt-4 text-sm leading-6 text-slate-300">
                                    Register to access venue reservations and the services available to your account.
                                </p>
                            </div>
                            <div className="mt-9 space-y-3">
                                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                                        <Icon name="calendar" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Booking management</p>
                                        <p className="mt-0.5 text-xs text-slate-300">Manage campus venue reservations</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                                    <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                                    <p className="text-xs leading-5 text-slate-300">
                                        Choose the account role that matches your campus position. Role options are limited to those enabled for self-registration.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-3 lg:px-14 lg:py-10">
                            <div className="mx-auto w-full max-w-md">
                                <div className="mb-6 text-center">
                                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                                        <Icon name="user" className="h-6 w-6" />
                                    </span>
                                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Create account</h2>
                                    <p className="mt-1.5 text-sm text-slate-500">Enter your details to get started.</p>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                            Full name
                                        </label>
                                        <div className="relative">
                                            <Icon name="user" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                                            <input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className={inputClass}
                                                placeholder="Your full name"
                                                autoComplete="name"
                                                autoFocus
                                                required
                                                aria-invalid={Boolean(errors.name)}
                                                aria-describedby={errors.name ? 'name-error' : undefined}
                                                onChange={(event) => setData('name', event.target.value)}
                                            />
                                        </div>
                                        {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                            Email address
                                        </label>
                                        <div className="relative">
                                            <Icon name="mail" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className={inputClass}
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                required
                                                aria-invalid={Boolean(errors.email)}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                                onChange={(event) => setData('email', event.target.value)}
                                            />
                                        </div>
                                        {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.email}</p>}
                                    </div>

                                    <fieldset>
                                        <legend className="mb-1.5 block text-sm font-semibold text-slate-700">Account role</legend>
                                        <div className="grid grid-cols-2 gap-3">
                                            {roles.map((role) => {
                                                const selected = data.level === role.value;
                                                return (
                                                    <label
                                                        key={role.value}
                                                        className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition ${
                                                            selected
                                                                ? 'border-blue-300 bg-blue-50/70 ring-1 ring-blue-200'
                                                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="level"
                                                            value={role.value}
                                                            checked={selected}
                                                            onChange={(event) => setData('level', event.target.value)}
                                                            className="mt-0.5 h-4 w-4 border-slate-300 text-blue-700 focus:ring-blue-500"
                                                        />
                                                        <span>
                                                            <span className="block text-sm font-semibold text-slate-800">{role.label}</span>
                                                            <span className="mt-0.5 block text-xs leading-4 text-slate-500">{role.description}</span>
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        {errors.level && <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.level}</p>}
                                    </fieldset>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Icon name="lock" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                                                <input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={data.password}
                                                    className={`${inputClass} pr-10`}
                                                    placeholder="Create a password"
                                                    autoComplete="new-password"
                                                    required
                                                    aria-invalid={Boolean(errors.password)}
                                                    aria-describedby={errors.password ? 'password-error' : undefined}
                                                    onChange={(event) => setData('password', event.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((visible) => !visible)}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                    aria-pressed={showPassword}
                                                    className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-2.5 text-slate-400 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                                >
                                                    <Icon name={showPassword ? 'eyeOff' : 'eye'} className="h-[18px] w-[18px]" />
                                                </button>
                                            </div>
                                            {errors.password && <p id="password-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="password_confirmation" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                                Confirm password
                                            </label>
                                            <div className="relative">
                                                <Icon name="lock" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                                                <input
                                                    id="password_confirmation"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    className={`${inputClass} pr-10`}
                                                    placeholder="Re-enter password"
                                                    autoComplete="new-password"
                                                    required
                                                    aria-invalid={Boolean(errors.password_confirmation)}
                                                    aria-describedby={errors.password_confirmation ? 'password_confirmation-error' : undefined}
                                                    onChange={(event) => setData('password_confirmation', event.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                                                    aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                                                    aria-pressed={showConfirmPassword}
                                                    className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-2.5 text-slate-400 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                                >
                                                    <Icon name={showConfirmPassword ? 'eyeOff' : 'eye'} className="h-[18px] w-[18px]" />
                                                </button>
                                            </div>
                                            {errors.password_confirmation && <p id="password_confirmation-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.password_confirmation}</p>}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? 'Creating account…' : 'Create account'}
                                        {!processing && <Icon name="arrow" className="h-4 w-4" />}
                                    </button>
                                </form>

                                <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                                    <p className="text-sm text-slate-600">
                                        Already have an account?{' '}
                                        <Link href={route('login')} className="font-semibold text-blue-700 hover:text-blue-900 hover:underline">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
                        <p>Venue Management System · Faculty of Computing &amp; Informatics</p>
                        <p>Account registration is intended for authorized users.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
