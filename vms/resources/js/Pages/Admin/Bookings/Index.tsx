import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

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
    user: { name: string; email: string };
    approved_by: User | null;
    approved_at: string | null;
    rejection_reason: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface PaginatedBookings {
    data: Booking[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface AdminBookingsProps {
    bookings: PaginatedBookings;
    filters: {
        status?: string;
        search?: string;
        date_from?: string;
        date_to?: string;
    };
}

type BookingFilter = 'all' | 'pending' | 'approved' | 'rejected' | 'expired';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'booking' | 'check' | 'clock' | 'search' | 'calendar' | 'pin' | 'users' | 'edit' | 'delete' | 'download' | 'arrow' | 'info' | 'x' | 'check-circle' | 'x-circle' | 'chevron';
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
        case 'chevron':
            return <svg {...shared}><path d="m9 18 6-6-6-6" /></svg>;
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

function formatDate(date: string): string {
    const parsed = new Date(`${date}T00:00:00`);
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

function RejectModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
    bookingId,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (bookingId: number, reason: string) => void;
    loading: boolean;
    bookingId: number | null;
}) {
    const [reason, setReason] = useState('');

    if (!isOpen || bookingId === null) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Reject Booking</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <Icon name="x" className="h-5 w-5" />
                    </button>
                </div>
                <p className="mb-4 text-sm text-slate-600">Please provide a reason for rejecting this booking request.</p>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter rejection reason..."
                    required
                />
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(bookingId, reason)}
                        disabled={loading || !reason.trim()}
                        className="inline-flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? 'Rejecting...' : 'Reject Booking'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const AdminBookings: React.FC<AdminBookingsProps> = ({ bookings, filters }) => {
    const { props } = usePage();
    const user = props.auth.user;
    const [filter, setFilter] = useState<BookingFilter>('all');
    const [search, setSearch] = useState(filters.search || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [rejectBookingId, setRejectBookingId] = useState<number | null>(null);
    const [rejectLoading, setRejectLoading] = useState(false);

    const handleReject = (bookingId: number, reason: string) => {
        setRejectLoading(true);
        router.patch(
            route('admin.bookings.reject', bookingId),
            { rejection_reason: reason },
            {
                onSuccess: () => {
                    setRejectBookingId(null);
                    setRejectLoading(false);
                },
                onError: () => setRejectLoading(false),
            }
        );
    };

    const handleApprove = (bookingId: number) => {
        router.patch(
            route('admin.bookings.approve', bookingId),
            {},
            {
                onError: () => {},
            }
        );
    };

    const tabs: Array<{ key: BookingFilter; label: string }> = [
        { key: 'all', label: 'All' },
        { key: 'pending', label: 'Pending' },
        { key: 'approved', label: 'Approved' },
        { key: 'rejected', label: 'Rejected' },
        { key: 'expired', label: 'Expired' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Manage Bookings" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-end">
                    <div>
                        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Link href={route('admin.index')} className="transition hover:text-blue-700">Admin</Link>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page" className="font-semibold text-slate-800">Manage Bookings</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Manage Bookings
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Review and approve or reject venue booking requests.
                        </p>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                aria-pressed={filter === tab.key}
                                onClick={() => {
                                    setFilter(tab.key);
                                    router.get(route('admin.bookings.index'), { ...filters, status: tab.key === 'all' ? '' : tab.key }, { preserveScroll: true });
                                }}
                                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                                    filter === tab.key
                                        ? 'bg-blue-700 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
                            <label className="relative flex-1 sm:max-w-xs">
                                <span className="sr-only">Search bookings</span>
                                <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && router.get(route('admin.bookings.index'), { ...filters, search: e.currentTarget.value }, { preserveScroll: true })}
                                    placeholder="Search venue, name, email..."
                                    className="w-full rounded-xl border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    onBlur={() => router.get(route('admin.bookings.index'), { ...filters, date_from: dateFrom }, { preserveScroll: true })}
                                    className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <span className="flex items-center text-slate-400">to</span>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    onBlur={() => router.get(route('admin.bookings.index'), { ...filters, date_to: dateTo }, { preserveScroll: true })}
                                    className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {bookings.data.length === 0 ? (
                    <section className="rounded-2xl border border-slate-200/80 bg-white px-5 py-14 text-center shadow-sm">
                        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <Icon name="booking" />
                        </span>
                        <h2 className="mt-4 text-base font-bold text-slate-900">No bookings found</h2>
                        <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                            Try adjusting your filters or search terms.
                        </p>
                    </section>
                ) : (
                    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50/50">
                                    <tr className="border-b border-slate-200">
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Booking</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Venue</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Date & Time</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Requester</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Capacity</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/50">
                                    {bookings.data.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3">
                                                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                    #{booking.id}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">{booking.venue?.name || 'No venue'}</p>
                                                    <p className="text-xs text-slate-500">{booking.venue?.location || ''}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                                        <Icon name="calendar" className="h-4 w-4 text-blue-700" />
                                                        {formatDate(booking.date)}
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-900">
                                                        {formatTime(booking.start_time)} – {formatTime(booking.end_time)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">{booking.user.name}</p>
                                                    <p className="text-xs text-slate-500">{booking.user.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-sm font-medium text-slate-900">{booking.capacity} people</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {booking.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(booking.id)}
                                                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
                                                                disabled={rejectLoading}
                                                            >
                                                                <Icon name="check" className="h-3.5 w-3.5" />
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => setRejectBookingId(booking.id)}
                                                                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                                                                disabled={rejectLoading}
                                                            >
                                                                <Icon name="x" className="h-3.5 w-3.5" />
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {booking.status === 'rejected' && booking.rejection_reason && (
                                                        <button
                                                            type="button"
                                                            onClick={() => alert(booking.rejection_reason)}
                                                            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700"
                                                        >
                                                            <Icon name="info" className="h-3.5 w-3.5" />
                                                            View Reason
                                                        </button>
                                                    )}
                                                    {booking.approved_by && (
                                                        <span className="text-xs text-slate-500">
                                                            By {booking.approved_by.name} • {booking.approved_at ? formatDate(booking.approved_at) : ''}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {bookings.last_page > 1 && (
                            <div className="border-t border-slate-200 px-4 py-3 sm:px-6">
                                <nav className="flex items-center justify-between" aria-label="Pagination">
                                    <p className="text-sm text-slate-700">
                                        Showing {bookings.from} to {bookings.to} of {bookings.total} results
                                    </p>
                                    <div className="flex items-center gap-1">
                                        {bookings.current_page > 1 && (
                                            <button
                                                onClick={() => router.get(route('admin.bookings.index'), { ...filters, page: bookings.current_page - 1 }, { preserveScroll: true })}
                                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                            >
                                                Previous
                                            </button>
                                        )}
                                        {bookings.current_page < bookings.last_page && (
                                            <button
                                                onClick={() => router.get(route('admin.bookings.index'), { ...filters, page: bookings.current_page + 1 }, { preserveScroll: true })}
                                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        )}
                    </section>
                )}

                <RejectModal
                    isOpen={rejectBookingId !== null}
                    onClose={() => setRejectBookingId(null)}
                    onConfirm={handleReject}
                    loading={rejectLoading}
                    bookingId={rejectBookingId}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminBookings;