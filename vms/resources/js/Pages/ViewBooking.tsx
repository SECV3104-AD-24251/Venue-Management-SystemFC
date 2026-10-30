import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';

interface Booking {
    id: number;
    name: string;
    email: string;
    capacity: number;
    venue: { name: string; location?: string; capacity?: number } | null;
    date: string;
    start_time: string;
    end_time: string;
    comments: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'expired';
    rejection_reason: string | null;
}

interface ViewBookingProps {
    bookings: Booking[];
}

type BookingFilter = 'all' | 'upcoming' | 'past';
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected' | 'expired';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'booking' | 'check' | 'clock' | 'search' | 'calendar' | 'pin' | 'users' | 'edit' | 'delete' | 'download' | 'arrow' | 'info' | 'x' | 'check-circle' | 'x-circle';
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
        case 'booking':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 15l2 2 5-5" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'search':
            return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
        case 'pin':
            return <svg {...shared}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
        case 'users':
            return <svg {...shared}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'edit':
            return <svg {...shared}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>;
        case 'delete':
            return <svg {...shared}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5" /></svg>;
        case 'download':
            return <svg {...shared}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
        case 'arrow':
            return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
        case 'info':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
        case 'x':
            return <svg {...shared}><path d="M18 6 6 18M6 6l12 12" /></svg>;
        case 'check-circle':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'x-circle':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M10 10l4 4M14 10l-4 4" /></svg>;
    }
}

function StatusBadge({ status }: { status: Booking['status'] }) {
    const config: Record<Booking['status'], { bg: string; text: string; icon: 'clock' | 'check-circle' | 'x-circle' | 'info' }> = {
        pending: { bg: 'bg-amber-100', text: 'text-amber-800', icon: 'clock' },
        approved: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: 'check-circle' },
        rejected: { bg: 'bg-rose-100', text: 'text-rose-800', icon: 'x-circle' },
        expired: { bg: 'bg-slate-100', text: 'text-slate-700', icon: 'info' },
    };

    const cfg = config[status];

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
            <Icon name={cfg.icon} className="h-3.5 w-3.5" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

function getBookingEnd(booking: Booking): Date {
    return new Date(`${booking.date}T${booking.end_time}`);
}

function isUpcoming(booking: Booking, now: Date): boolean {
    const end = getBookingEnd(booking);
    return !Number.isNaN(end.getTime()) && end >= now;
}

function formatDate(date: string): string {
    const parsed = new Date(date.includes('T') ? date : `${date}T00:00:00`);
    return Number.isNaN(parsed.getTime())
        ? date
        : new Intl.DateTimeFormat('en', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          }).format(parsed);
}

function formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return time;
    const parsed = new Date();
    parsed.setHours(hour, minute, 0, 0);
    return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(parsed);
}

function durationMinutes(booking: Booking): number {
    const [startHour, startMinute] = booking.start_time.split(':').map(Number);
    const [endHour, endMinute] = booking.end_time.split(':').map(Number);
    if (![startHour, startMinute, endHour, endMinute].every(Number.isFinite)) return 0;
    return Math.max(0, endHour * 60 + endMinute - (startHour * 60 + startMinute));
}

function SummaryCard({
    label,
    value,
    detail,
    icon,
    tone,
}: {
    label: string;
    value: string | number;
    detail: string;
    icon: 'booking' | 'check' | 'clock';
    tone: string;
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
                    <Icon name={icon} className="h-[18px] w-[18px]" />
                </span>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </section>
    );
}

const ViewBooking: React.FC<ViewBookingProps> = ({ bookings = [] }) => {
    const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
    const [timeFilter, setTimeFilter] = useState<BookingFilter>('all');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [search, setSearch] = useState('');
    const now = new Date();

    const upcomingCount = bookings.filter((booking) => isUpcoming(booking, now)).length;
    const pastCount = bookings.length - upcomingCount;
    const totalHours = bookings.reduce((total, booking) => total + durationMinutes(booking), 0) / 60;

    const statusCounts = {
        pending: bookings.filter((b) => b.status === 'pending').length,
        approved: bookings.filter((b) => b.status === 'approved').length,
        rejected: bookings.filter((b) => b.status === 'rejected').length,
        expired: bookings.filter((b) => b.status === 'expired').length,
    };

    const filteredBookings = useMemo(() => {
        const query = search.trim().toLowerCase();
        return bookings.filter((booking) => {
            const matchesTimeFilter =
                timeFilter === 'all' ||
                (timeFilter === 'upcoming' && isUpcoming(booking, now)) ||
                (timeFilter === 'past' && !isUpcoming(booking, now));
            const matchesStatusFilter =
                statusFilter === 'all' || booking.status === statusFilter;
            const matchesSearch =
                query.length === 0 ||
                booking.venue?.name.toLowerCase().includes(query) ||
                booking.name.toLowerCase().includes(query) ||
                booking.email.toLowerCase().includes(query) ||
                booking.comments?.toLowerCase().includes(query) ||
                String(booking.id).includes(query);
            return matchesTimeFilter && matchesStatusFilter && matchesSearch;
        });
    }, [bookings, timeFilter, statusFilter, now, search]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            router.delete(`/bookings/${id}`);
        }
    };

    const exportBookings = () => {
        const escapeCsv = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
        const rows = [
            ['Booking ID', 'Venue', 'Date', 'Start time', 'End time', 'Capacity', 'Name', 'Email', 'Comments'],
            ...filteredBookings.map((booking) => [
                booking.id,
                booking.venue?.name || 'No venue',
                booking.date,
                booking.start_time,
                booking.end_time,
                booking.capacity,
                booking.name,
                booking.email,
                booking.comments || '',
            ]),
        ];
        const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'my-bookings.csv';
        downloadLink.click();
        URL.revokeObjectURL(url);
    };

    const tabs: Array<{ key: BookingFilter; label: string; count: number }> = [
        { key: 'all', label: 'All bookings', count: bookings.length },
        { key: 'upcoming', label: 'Upcoming', count: upcomingCount },
        { key: 'past', label: 'Past', count: pastCount },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="My Bookings" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            My Venue Bookings
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Review your reservations, check session details, and manage upcoming bookings.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={exportBookings}
                            disabled={filteredBookings.length === 0}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Icon name="download" className="h-4 w-4" />
                            Export list
                        </button>
                        <Link
                            href={route('booking')}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            Book a venue
                            <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section aria-label="Booking summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Total bookings"
                        value={bookings.length}
                        detail="Reservations in your history"
                        icon="booking"
                        tone="bg-blue-50 text-blue-700"
                    />
                    <SummaryCard
                        label="Upcoming"
                        value={upcomingCount}
                        detail="Sessions not yet ended"
                        icon="clock"
                        tone="bg-emerald-50 text-emerald-700"
                    />
                    <SummaryCard
                        label="Past sessions"
                        value={pastCount}
                        detail="Sessions that have ended"
                        icon="check"
                        tone="bg-slate-100 text-slate-700"
                    />
                    <SummaryCard
                        label="Allocated time"
                        value={`${totalHours.toLocaleString(undefined, { maximumFractionDigits: 1 })}h`}
                        detail="Total duration of your reservations"
                        icon="clock"
                        tone="bg-violet-50 text-violet-700"
                    />
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
                        <span className="text-xs font-semibold text-slate-500 mr-2">Time:</span>
                        {[
                            { key: 'all', label: 'All', count: bookings.length },
                            { key: 'upcoming', label: 'Upcoming', count: upcomingCount },
                            { key: 'past', label: 'Past', count: pastCount },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                aria-pressed={timeFilter === tab.key}
                                onClick={() => setTimeFilter(tab.key as BookingFilter)}
                                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                                    timeFilter === tab.key
                                        ? 'bg-blue-700 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                {tab.label}
                                <span className={`rounded-full px-1.5 py-0.5 text-xs ${
                                    timeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
                        <span className="text-xs font-semibold text-slate-500 mr-2">Status:</span>
                        {[
                            { key: 'all', label: 'All', count: bookings.length },
                            { key: 'pending', label: 'Pending', count: statusCounts.pending },
                            { key: 'approved', label: 'Approved', count: statusCounts.approved },
                            { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
                            { key: 'expired', label: 'Expired', count: statusCounts.expired },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                aria-pressed={statusFilter === tab.key}
                                onClick={() => setStatusFilter(tab.key as StatusFilter)}
                                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                                    statusFilter === tab.key
                                        ? 'bg-blue-700 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                {tab.label}
                                <span className={`rounded-full px-1.5 py-0.5 text-xs ${
                                    statusFilter === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">Reservation list</h2>
                            <p className="mt-0.5 text-xs text-slate-500">
                                Showing {filteredBookings.length} of {bookings.length} bookings
                            </p>
                        </div>
                        <label className="relative block w-full sm:max-w-sm">
                            <span className="sr-only">Search bookings</span>
                            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search venue, name, email, or ID"
                                className="w-full rounded-xl border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                    </div>
                </section>

                {filteredBookings.length === 0 ? (
                    <section className="rounded-2xl border border-slate-200/80 bg-white px-5 py-14 text-center shadow-sm">
                        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <Icon name="booking" />
                        </span>
                        <h2 className="mt-4 text-base font-bold text-slate-900">
                            {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your search'}
                        </h2>
                        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                            {bookings.length === 0
                                ? 'When you submit a venue booking, it will appear here.'
                                : 'Try another search or switch to a different booking tab.'}
                        </p>
                        {bookings.length === 0 && (
                            <Link
                                href={route('booking')}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                            >
                                Book a venue
                                <Icon name="arrow" className="h-4 w-4" />
                            </Link>
                        )}
                    </section>
                ) : (
                    <section aria-label="Reservations" className="flex flex-col gap-4">
                        {filteredBookings.map((booking) => {
                            const upcoming = isUpcoming(booking, now);
                            const expanded = expandedBooking === booking.id;
                            const minutes = durationMinutes(booking);
                            const duration = minutes > 0
                                ? `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}`
                                : '—';
                            const canModify = booking.status !== 'approved';

                            return (
                                <article
                                    key={booking.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
                                >
                                    <div className="flex flex-col gap-4 p-5 sm:p-6">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                    Booking #{booking.id}
                                                </span>
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                                    upcoming
                                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                        : 'border-slate-200 bg-slate-100 text-slate-600'
                                                }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${upcoming ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                                                    {upcoming ? 'Upcoming' : 'Past'}
                                                </span>
                                                <StatusBadge status={booking.status} />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setExpandedBooking(expanded ? null : booking.id)}
                                                aria-expanded={expanded}
                                                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                                            >
                                                {expanded ? 'Hide details' : 'View details'}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
                                            <div className="space-y-2 md:col-span-7">
                                                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                                                    {booking.venue?.name || 'No venue'}
                                                </h3>
                                                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                                                    <Icon name="pin" className="h-4 w-4 shrink-0 text-slate-400" />
                                                    {booking.venue?.location || 'Venue location unavailable'}
                                                </p>
                                                <p className="flex items-center gap-1.5 text-sm text-slate-600">
                                                    <Icon name="users" className="h-4 w-4 shrink-0 text-slate-400" />
                                                    Requested capacity: <strong className="text-slate-800">{booking.capacity} people</strong>
                                                </p>
                                            </div>

                                            <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-5">
                                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Icon name="calendar" className="h-4 w-4 text-blue-700" />
                                                        {formatDate(booking.date)}
                                                    </span>
                                                    <span className="font-semibold text-slate-700">{duration} session</span>
                                                </div>
                                                <p className="text-lg font-bold tracking-tight text-slate-900">
                                                    {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                                                </p>
                                                <div className="flex flex-wrap items-center justify-between gap-1 border-t border-slate-200 pt-2 text-xs text-slate-500">
                                                    <span>Booked by <strong className="text-slate-700">{booking.name}</strong></span>
                                                    <span>#{booking.id}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {expanded && (
                                            <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-2">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Requester</p>
                                                    <p className="mt-1 text-sm font-medium text-slate-800">{booking.name}</p>
                                                    <p className="mt-0.5 break-all text-xs text-slate-500">{booking.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Comments</p>
                                                    <p className="mt-1 text-sm leading-5 text-slate-700">
                                                        {booking.comments || 'No comments provided.'}
                                                    </p>
                                                </div>
                                                {booking.status === 'rejected' && booking.rejection_reason && (
                                                    <div className="sm:col-span-2">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rejection Reason</p>
                                                        <p className="mt-1 text-sm leading-5 text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                                                            {booking.rejection_reason}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
                                            <p className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                                                <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                                                {booking.status === 'approved'
                                                    ? 'This booking is confirmed and cannot be modified.'
                                                    : 'Modify or delete this reservation using the actions.'}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => router.visit(`/bookings/${booking.id}/edit`)}
                                                    disabled={!canModify}
                                                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                                                        canModify
                                                            ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                                            : 'border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <Icon name="edit" className="h-4 w-4" />
                                                    Modify
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                                                >
                                                    <Icon name="delete" className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default ViewBooking;
