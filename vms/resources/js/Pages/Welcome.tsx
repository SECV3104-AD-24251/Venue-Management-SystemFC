import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6 py-16 selection:bg-[#FF2D20] selection:text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative flex w-full max-w-2xl flex-col items-center text-center sm:max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100 backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        Faculty Venue Management
                    </span>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Welcome to the Venue Management System
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                        Browse faculty venues, check live booking availability, and keep class schedules aligned — all in one place.
                    </p>

                    <nav className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>

                    <footer className="mt-12 text-center text-sm text-slate-400">
                        <p>
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </p>
                        <p>by Group Vamos</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
