import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Venue {
    id?: number;
    name: string;
    location: string;
    capacity: number;
    status?: string | null;
    image?: string | null;
    description?: string | null;
    equipment?: string[] | null;
    info?: string[] | null;
    info1?: string | null;
    info2?: string | null;
    info3?: string | null;
    info4?: string | null;
}

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'venue' | 'pin' | 'users' | 'check' | 'clock' | 'arrow' | 'sparkles';
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
        case 'venue':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'pin':
            return <svg {...shared}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
        case 'users':
            return <svg {...shared}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'arrow':
            return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
        case 'sparkles':
            return <svg {...shared}><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3ZM19 14l1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z" /></svg>;
    }
}

function Specification({
    icon,
    label,
    value,
    detail,
}: {
    icon: 'venue' | 'pin' | 'users' | 'clock' | 'check';
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Icon name={icon} className="h-4 w-4 text-blue-700" />
                {label}
            </div>
            <p className="mt-2 truncate text-sm font-bold text-slate-900" title={value}>{value}</p>
            <p className="mt-1 truncate text-xs text-slate-500" title={detail}>{detail}</p>
        </div>
    );
}

export default function VenueDetails({ venue }: { venue: Venue }) {
    const status = venue.status?.trim() || 'Unknown';
    const isAvailable = status.toLowerCase() === 'available';
    const initial = venue.name.trim().charAt(0).toUpperCase() || 'V';
    const amenities = [
        ...(Array.isArray(venue.equipment) ? venue.equipment : []),
        ...(Array.isArray(venue.info) ? venue.info : []),
        venue.info1,
        venue.info2,
        venue.info3,
        venue.info4,
    ].filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    const uniqueAmenities = [...new Set(amenities)];

    const card = (icon: ReactNode, title: string, content: ReactNode) => (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    {icon}
                </span>
                <h2 className="text-base font-bold tracking-tight text-slate-900">{title}</h2>
            </div>
            {content}
        </section>
    );

    return (
        <AuthenticatedLayout>
            <Head title={`${venue.name} · Venue Details`} />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                    <Link href={route('venue')} className="transition hover:text-blue-700">
                        Venues
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page" className="max-w-full truncate font-semibold text-slate-800">
                        {venue.name}
                    </span>
                </nav>

                <section className="flex flex-col justify-between gap-5 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-800 text-2xl font-bold text-white shadow-sm">
                            {initial}
                        </div>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    {venue.name}
                                </h1>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                        isAvailable
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                            : 'border-amber-200 bg-amber-50 text-amber-800'
                                    }`}
                                >
                                    <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                                    {status}
                                </span>
                            </div>
                            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="pin" className="h-4 w-4 text-slate-400" />
                                    {venue.location}
                                </span>
                                <span aria-hidden="true" className="text-slate-300">·</span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Icon name="users" className="h-4 w-4 text-slate-400" />
                                    Capacity {venue.capacity} people
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                        <Link
                            href={route('venue')}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            Back to venues
                        </Link>
                        <Link
                            href={route('booking')}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Book this venue
                            <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    <div className="flex flex-col gap-6 lg:col-span-8">
                        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                            {venue.image ? (
                                <img
                                    src={venue.image}
                                    alt={`Interior of ${venue.name}`}
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            ) : (
                                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 sm:h-80">
                                    <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                                    <div className="absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                                    <div className="relative flex flex-col items-center text-center text-white">
                                        <span className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-4xl font-bold shadow-lg backdrop-blur">
                                            {initial}
                                        </span>
                                        <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{venue.name}</h2>
                                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-100">
                                            <Icon name="pin" className="h-4 w-4" />
                                            {venue.location}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:p-5">
                                <Specification
                                    icon="users"
                                    label="Capacity"
                                    value={`${venue.capacity} people`}
                                    detail="Maximum listed capacity"
                                />
                                <Specification
                                    icon="pin"
                                    label="Location"
                                    value={venue.location}
                                    detail="Venue location"
                                />
                                <Specification
                                    icon={isAvailable ? 'check' : 'clock'}
                                    label="Current status"
                                    value={status}
                                    detail="Refer to booking for time-slot availability"
                                />
                            </div>
                        </section>

                        {card(
                            <Icon name="sparkles" className="h-5 w-5" />,
                            'Facilities & amenities',
                            uniqueAmenities.length > 0 ? (
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {uniqueAmenities.map((amenity) => (
                                        <li key={amenity} className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3">
                                            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                            <span className="text-sm leading-5 text-slate-700">{amenity}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-500">
                                    No facility or amenity details have been added for this venue yet.
                                </p>
                            ),
                        )}

                        {venue.description && (
                            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-3 flex items-center gap-2.5">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <Icon name="venue" />
                                    </span>
                                    <h2 className="text-base font-bold tracking-tight text-slate-900">About this venue</h2>
                                </div>
                                <p className="text-sm leading-6 text-slate-600">{venue.description}</p>
                            </section>
                        )}
                    </div>

                    <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-4">
                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-700">Reservation</p>
                                    <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">Book this venue</h2>
                                </div>
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Icon name="check" />
                                </span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                                    <Icon name="users" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                                    <div>
                                        <p className="text-xs text-slate-500">Maximum capacity</p>
                                        <p className="mt-0.5 text-sm font-semibold text-slate-900">{venue.capacity} people</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                                    <div>
                                        <p className="text-xs text-slate-500">Location</p>
                                        <p className="mt-0.5 text-sm font-semibold text-slate-900">{venue.location}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-xs leading-5 text-slate-500">
                                Choose a date and time on the booking page to check availability before submitting your request.
                            </p>
                            <Link
                                href={route('booking')}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Continue to booking
                                <Icon name="arrow" className="h-4 w-4" />
                            </Link>
                        </section>

                        <section className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                                <Icon name="clock" />
                            </span>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">Check slot availability</h2>
                                <p className="mt-1 text-xs leading-5 text-slate-600">
                                    Venue status may not reflect a particular time slot. Confirm your date and time on the booking page.
                                </p>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
