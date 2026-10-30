import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Venue = {
    id: number;
    name: string;
    location: string;
    capacity: number;
    status: string;
};

function MetricIcon({ kind }: { kind: 'venues' | 'bookings' | 'available' | 'attention' }) {
    const paths = {
        venues: <><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4" /><path d="M8 3h8" /></>,
        bookings: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 15l2 2 5-5" /></>,
        available: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
        attention: <><path d="M12 3 2.8 19a1.4 1.4 0 0 0 1.2 2h16a1.4 1.4 0 0 0 1.2-2L12 3Z" /><path d="M12 9v4M12 17h.01" /></>,
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
        >
            {paths[kind]}
        </svg>
    );
}

function MetricCard({
    label,
    value,
    note,
    kind,
    color,
}: {
    label: string;
    value: string | number;
    note: string;
    kind: 'venues' | 'bookings' | 'available' | 'attention';
    color: string;
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">{label}</p>
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                    <MetricIcon kind={kind} />
                </span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
            <p className="mt-2 border-t border-slate-100 pt-3 text-xs text-slate-500">{note}</p>
        </section>
    );
}

const Dashboard = () => {
    const { props } = usePage();
    const user = props.auth.user;
    const [venues, setVenues] = useState<Venue[] | null>(null);
    const [totalBookings, setTotalBookings] = useState<number | null>(null);
    const [notifications, setNotifications] = useState<string[] | null>(null);
    const [loadErrors, setLoadErrors] = useState<string[]>([]);

    useEffect(() => {
        let isMounted = true;
        const reportError = (label: string, error: unknown) => {
            console.error(`Unable to load dashboard ${label}:`, error);
            if (isMounted) {
                setLoadErrors((current) => [...current, label]);
            }
        };

        axios
            .get<Venue[]>('/api/venues')
            .then(({ data }) => {
                if (!Array.isArray(data)) {
                    throw new Error('Unexpected venue response');
                }
                if (isMounted) setVenues(data);
            })
            .catch((error: unknown) => reportError('venue information', error));

        axios
            .get<{ totalBookings: number }>('/api/bookings/count')
            .then(({ data }) => {
                if (typeof data.totalBookings !== 'number') {
                    throw new Error('Unexpected booking count response');
                }
                if (isMounted) setTotalBookings(data.totalBookings);
            })
            .catch((error: unknown) => reportError('booking count', error));

        axios
            .get<{
                notifications: Array<
                    string | { message?: string; data?: { message?: string } }
                >;
            }>('/api/notifications')
            .then(({ data }) => {
                if (!Array.isArray(data.notifications)) {
                    throw new Error('Unexpected notifications response');
                }
                const messages = data.notifications
                    .map((item) =>
                        typeof item === 'string' ? item : item.data?.message ?? item.message,
                    )
                    .filter((message): message is string => Boolean(message?.trim()));
                if (isMounted) setNotifications(messages);
            })
            .catch((error: unknown) => reportError('recent activity', error));

        return () => {
            isMounted = false;
        };
    }, []);

    const availableVenues =
        venues?.filter((venue) => venue.status?.trim().toLowerCase() === 'available').length ?? null;
    const unavailableVenues =
        venues === null || availableVenues === null ? null : venues.length - availableVenues;
    const availabilityPercentage =
        venues && venues.length > 0 && availableVenues !== null
            ? Math.round((availableVenues / venues.length) * 100)
            : 0;
    const today = new Intl.DateTimeFormat('en', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }).format(new Date());

    const displayValue = (value: number | null, failed: boolean) =>
        value === null ? (failed ? 'Error' : '—') : value.toLocaleString();
    const venueError = loadErrors.includes('venue information');
    const bookingsError = loadErrors.includes('booking count');
    const activityError = loadErrors.includes('recent activity');

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-5 py-6 shadow-sm sm:px-7 lg:flex lg:items-center lg:justify-between lg:gap-6">
                    <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />
                    <div className="relative">
                        <p className="text-sm font-medium text-blue-700">{today}</p>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Welcome back, {user.name.split(/\s+/)[0]}
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            Your venue operations at a glance. Review availability, recent bookings, and the spaces
                            managed by your faculty.
                        </p>
                    </div>
                    <div className="relative mt-5 flex flex-wrap gap-2.5 lg:mt-0 lg:justify-end">
                        <Link
                            href={route('venue')}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                            <MetricIcon kind="venues" />
                            Browse venues
                        </Link>
                        {user.level === '2' ? (
                            <Link
                                href={route('booking')}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                            >
                                <MetricIcon kind="bookings" />
                                Book a venue
                            </Link>
                        ) : user.level === '3' ? (
                            <Link
                                href={route('maintenance.create')}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                            >
                                <MetricIcon kind="attention" />
                                Report maintenance
                            </Link>
                        ) : (
                            <Link
                                href={route('viewbooking')}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                            >
                                <MetricIcon kind="bookings" />
                                View bookings
                            </Link>
                        )}
                    </div>
                </section>

                {loadErrors.length > 0 && (
                    <div
                        role="alert"
                        className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                    >
                        Some dashboard information could not be loaded: {loadErrors.join(', ')}. Refresh the page to
                        try again.
                    </div>
                )}

                <section aria-label="Venue statistics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        label="Total venues"
                        value={displayValue(venues?.length ?? null, venueError)}
                        note="Spaces in the venue directory"
                        kind="venues"
                        color="bg-slate-100 text-slate-700"
                    />
                    <MetricCard
                        label="Total bookings"
                        value={displayValue(totalBookings, bookingsError)}
                        note="Bookings recorded in the system"
                        kind="bookings"
                        color="bg-blue-50 text-blue-700"
                    />
                    <MetricCard
                        label="Available venues"
                        value={displayValue(availableVenues, venueError)}
                        note="Currently marked available"
                        kind="available"
                        color="bg-emerald-50 text-emerald-700"
                    />
                    <MetricCard
                        label="Not marked available"
                        value={displayValue(unavailableVenues, venueError)}
                        note="Check each venue's current status"
                        kind="attention"
                        color="bg-amber-50 text-amber-700"
                    />
                </section>

                <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    <div className="flex flex-col gap-6 lg:col-span-7">
                        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900">Venue availability</h2>
                                    <p className="mt-1 text-sm text-slate-500">Current status across your venue directory</p>
                                </div>
                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                    {venues ? `${venues.length} venues tracked` : venueError ? 'Data unavailable' : 'Loading'}
                                </span>
                            </div>
                            <div className="mt-5">
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-semibold text-slate-700">Marked available</span>
                                    <span className="font-semibold text-slate-900">
                                        {availableVenues === null ? (venueError ? 'Error' : '—') : `${availabilityPercentage}%`}
                                    </span>
                                </div>
                                <div
                                    className="h-3 overflow-hidden rounded-full bg-slate-100"
                                    role="progressbar"
                                    aria-label="Share of venues marked available"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={availabilityPercentage}
                                >
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 transition-all duration-500"
                                        style={{ width: `${availabilityPercentage}%` }}
                                    />
                                </div>
                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-blue-700" />
                                        Available <strong className="text-slate-800">{displayValue(availableVenues, venueError)}</strong>
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                                        Other status <strong className="text-slate-800">{displayValue(unavailableVenues, venueError)}</strong>
                                    </span>
                                </div>
                            </div>
                            {venues?.length === 0 && (
                                <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                    No venues have been added yet.
                                </p>
                            )}
                        </article>

                        <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900">Venue directory</h2>
                                    <p className="mt-1 text-sm text-slate-500">A quick look at spaces and their status</p>
                                </div>
                                <Link
                                    href={route('venue')}
                                    className="shrink-0 text-sm font-semibold text-blue-700 hover:text-blue-900"
                                >
                                    View all
                                </Link>
                            </div>
                            {venueError ? (
                                <p className="px-5 py-8 text-center text-sm text-rose-700 sm:px-6">
                                    Venue information could not be loaded.
                                </p>
                            ) : venues === null ? (
                                <p className="px-5 py-8 text-center text-sm text-slate-500 sm:px-6">Loading venues…</p>
                            ) : venues.length === 0 ? (
                                <p className="px-5 py-8 text-center text-sm text-slate-500 sm:px-6">No venues to display.</p>
                            ) : (
                                <ul className="divide-y divide-slate-100">
                                    {venues.slice(0, 5).map((venue) => {
                                        const isAvailable = venue.status?.trim().toLowerCase() === 'available';

                                        return (
                                            <li key={venue.id} className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                                        <MetricIcon kind="venues" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block truncate text-sm font-semibold text-slate-800">
                                                            {venue.name}
                                                        </span>
                                                        <span className="block truncate text-xs text-slate-500">
                                                            {venue.location} · Capacity {venue.capacity}
                                                        </span>
                                                    </span>
                                                </div>
                                                <span
                                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        isAvailable
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'bg-amber-50 text-amber-800'
                                                    }`}
                                                >
                                                    {venue.status || 'Unknown'}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </article>
                    </div>

                    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:col-span-5">
                        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-slate-900">Recent activity</h2>
                                <p className="mt-1 text-sm text-slate-500">The latest updates from your bookings</p>
                            </div>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <MetricIcon kind="bookings" />
                            </span>
                        </div>
                        {activityError ? (
                            <p className="py-8 text-center text-sm text-rose-700">Recent activity could not be loaded.</p>
                        ) : notifications === null ? (
                            <p className="py-8 text-center text-sm text-slate-500">Loading recent activity…</p>
                        ) : notifications.length === 0 ? (
                            <div className="py-10 text-center">
                                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                    <MetricIcon kind="bookings" />
                                </span>
                                <p className="mt-3 text-sm font-semibold text-slate-700">Nothing new just yet</p>
                                <p className="mt-1 text-sm text-slate-500">Booking updates will appear here.</p>
                            </div>
                        ) : (
                            <ul className="mt-2 divide-y divide-slate-100">
                                {notifications.slice(0, 6).map((message, index) => (
                                    <li key={`${message}-${index}`} className="flex gap-3 py-4">
                                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                                        <p className="text-sm leading-6 text-slate-600">{message}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </article>
                </section>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
