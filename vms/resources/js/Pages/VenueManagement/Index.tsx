import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: number;
    status: string;
    image: string | null;
    info1: string | null;
    info2: string | null;
    info3: string | null;
    info4: string | null;
    bookings_count: number;
    maintenances_count: number;
}

interface Props {
    venues: Venue[];
}

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'venue' | 'search' | 'plus' | 'edit' | 'trash' | 'check' | 'clock' | 'wrench' | 'users' | 'pin' | 'download' | 'refresh' | 'filter' | 'info' | 'building';
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
        case 'building':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'search':
            return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
        case 'plus':
            return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>;
        case 'edit':
            return <svg {...shared}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>;
        case 'trash':
            return <svg {...shared}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'wrench':
            return <svg {...shared}><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z" /></svg>;
        case 'users':
            return <svg {...shared}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'pin':
            return <svg {...shared}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
        case 'download':
            return <svg {...shared}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
        case 'refresh':
            return <svg {...shared}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></svg>;
        case 'filter':
            return <svg {...shared}><path d="M4 7h16M7 12h10M10 17h4" /></svg>;
        case 'info':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
    }
}

function statusClasses(status: string): string {
    if (status === 'available') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (status === 'maintenance') return 'border-blue-200 bg-blue-50 text-blue-700';
    return 'border-amber-200 bg-amber-50 text-amber-800';
}

function statusLabel(status: string): string {
    if (status === 'available') return 'Available';
    if (status === 'unavailable') return 'Unavailable';
    if (status === 'maintenance') return 'Maintenance';
    return status;
}

export default function VenueManagement({ venues }: Props) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'unavailable' | 'maintenance'>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState('');

    const { delete: destroy, processing } = useForm();

    const filtered = venues.filter((v) => {
        const q = search.trim().toLowerCase();
        const matchSearch = !q || v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q);
        const matchStatus = statusFilter === 'all' || v.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const counts = {
        total: venues.length,
        available: venues.filter((v) => v.status === 'available').length,
        unavailable: venues.filter((v) => v.status === 'unavailable').length,
        maintenance: venues.filter((v) => v.status === 'maintenance').length,
    };

    const handleDelete = (e: FormEvent, venue: Venue) => {
        e.preventDefault();
        setDeleteError('');
        if (deleteConfirm !== venue.id) {
            setDeleteConfirm(venue.id);
            return;
        }
        destroy(route('venue-management.destroy', venue.id), {
            preserveScroll: true,
            onError: () => {
                setDeleteError('Failed to delete venue. It may have existing bookings.');
                setDeleteConfirm(null);
            },
            onFinish: () => setDeleteConfirm(null),
        });
    };

    const exportCsv = () => {
        const esc = (val: string | number | null) => `"${String(val ?? '').replace(/"/g, '""')}"`;
        const rows = [
            ['ID', 'Name', 'Location', 'Capacity', 'Status', 'Bookings', 'Maintenances'],
            ...filtered.map((v) => [v.id, v.name, v.location, v.capacity, v.status, v.bookings_count, v.maintenances_count]),
        ];
        const csv = rows.map((r) => r.map(esc).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'venues-export.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const tabs = [
        { key: 'all' as const, label: 'All', count: counts.total },
        { key: 'available' as const, label: 'Available', count: counts.available },
        { key: 'unavailable' as const, label: 'Unavailable', count: counts.unavailable },
        { key: 'maintenance' as const, label: 'Maintenance', count: counts.maintenance },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Manage Venues" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 lg:flex-row lg:items-end">
                    <div>
                        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                            <span className="font-semibold text-slate-800">Admin</span>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">Venues</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Manage Venues</h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Create, edit, and remove venues from the faculty directory.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={exportCsv}
                            disabled={filtered.length === 0}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Icon name="download" className="h-4 w-4" />
                            Export CSV
                        </button>
                        <Link
                            href={route('venue-management.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            <Icon name="plus" className="h-4 w-4" />
                            Add Venue
                        </Link>
                    </div>
                </section>

                <section aria-label="Venue summary" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: 'Total Venues', value: counts.total, tone: 'bg-slate-100 text-slate-700', icon: 'building' as const },
                        { label: 'Available', value: counts.available, tone: 'bg-emerald-50 text-emerald-700', icon: 'check' as const },
                        { label: 'Unavailable', value: counts.unavailable, tone: 'bg-amber-50 text-amber-700', icon: 'clock' as const },
                        { label: 'Maintenance', value: counts.maintenance, tone: 'bg-blue-50 text-blue-700', icon: 'wrench' as const },
                    ].map((s) => (
                        <section key={s.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{s.label}</p>
                                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.tone}`}>
                                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                                </span>
                            </div>
                            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{s.value}</p>
                        </section>
                    ))}
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50/70 px-4 pt-3 sm:px-5">
                        <div className="flex gap-1 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    aria-pressed={statusFilter === tab.key}
                                    onClick={() => setStatusFilter(tab.key)}
                                    className={`-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition sm:px-4 ${
                                        statusFilter === tab.key
                                            ? 'border-blue-700 text-blue-700'
                                            : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                                        statusFilter === tab.key ? 'bg-blue-100 text-blue-800' : 'bg-slate-200/70 text-slate-600'
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
                        <label className="relative block flex-1">
                            <span className="sr-only">Search venues</span>
                            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or location"
                                className="w-full rounded-xl border-slate-200 py-2.5 pl-9 pr-3 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => { setSearch(''); setStatusFilter('all'); }}
                            disabled={!search && statusFilter === 'all'}
                            className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            <Icon name="filter" className="h-4 w-4" />
                            Clear
                        </button>
                    </div>

                    {deleteError && (
                        <div role="alert" className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 sm:mx-5">
                            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>{deleteError}</p>
                        </div>
                    )}

                    {filtered.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Icon name="venue" />
                            </span>
                            <h2 className="mt-4 text-base font-bold text-slate-900">
                                {venues.length === 0 ? 'No venues yet' : 'No venues match these filters'}
                            </h2>
                            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                                {venues.length === 0
                                    ? 'Add your first venue to start managing the directory.'
                                    : 'Try a different search or clear the filters.'}
                            </p>
                            {venues.length === 0 && (
                                <Link
                                    href={route('venue-management.create')}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    <Icon name="plus" className="h-4 w-4" />
                                    Add Venue
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[900px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <th className="px-5 py-3">Venue</th>
                                            <th className="px-5 py-3">Location</th>
                                            <th className="px-5 py-3 text-right">Capacity</th>
                                            <th className="px-5 py-3">Status</th>
                                            <th className="px-5 py-3 text-right">Bookings</th>
                                            <th className="px-5 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filtered.map((venue) => (
                                            <tr key={venue.id} className="align-top transition hover:bg-slate-50/70">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                                                            <Icon name="venue" className="h-4 w-4" />
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-slate-900">{venue.name}</p>
                                                            {venue.info1 && <p className="mt-1 text-xs text-slate-500">{venue.info1}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                                                        <Icon name="pin" className="h-4 w-4 text-slate-400" />
                                                        {venue.location}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">{venue.capacity}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(venue.status)}`}>
                                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                        {statusLabel(venue.status)}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">{venue.bookings_count}</td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('venue-management.edit', venue.id)}
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                                        >
                                                            <Icon name="edit" className="h-3.5 w-3.5" />
                                                            Edit
                                                        </Link>
                                                        {deleteConfirm === venue.id ? (
                                                            <form onSubmit={(e) => handleDelete(e, venue)} className="flex items-center gap-1">
                                                                <button
                                                                    type="submit"
                                                                    disabled={processing}
                                                                    className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setDeleteConfirm(null)}
                                                                    className="inline-flex items-center rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </form>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => handleDelete(e, venue)}
                                                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50"
                                                            >
                                                                <Icon name="trash" className="h-3.5 w-3.5" />
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-slate-100 md:hidden">
                                {filtered.map((venue) => (
                                    <article key={venue.id} className="space-y-3 p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-slate-900">{venue.name}</h3>
                                                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
                                                    <Icon name="pin" className="h-3.5 w-3.5" />
                                                    {venue.location}
                                                </p>
                                            </div>
                                            <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(venue.status)}`}>
                                                {statusLabel(venue.status)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Icon name="users" className="h-3.5 w-3.5" />
                                                {venue.capacity} pax
                                            </span>
                                            <span>{venue.bookings_count} bookings</span>
                                        </div>
                                        <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                                            <Link
                                                href={route('venue-management.edit', venue.id)}
                                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                                            >
                                                <Icon name="edit" className="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                            {deleteConfirm === venue.id ? (
                                                <form onSubmit={(e) => handleDelete(e, venue)} className="flex flex-1 items-center gap-1">
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="flex-1 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-slate-600"
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleDelete(e, venue)}
                                                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700"
                                                >
                                                    <Icon name="trash" className="h-3.5 w-3.5" />
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 text-xs text-slate-500 sm:px-5">
                        Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of{' '}
                        <span className="font-semibold text-slate-800">{venues.length}</span> venues
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
