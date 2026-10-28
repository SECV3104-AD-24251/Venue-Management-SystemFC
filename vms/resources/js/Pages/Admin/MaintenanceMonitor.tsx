import React, { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Maintenance {
    id: number;
    description: string;
    scheduled_for_date: string;
    scheduled_for_time: string;
    status: string;
    venue: { name: string; location?: string } | null;
    completed_at: string;
}

interface Props {
    maintenances: Maintenance[];
}

type MaintenanceFilter = 'all' | 'scheduled' | 'in-progress' | 'completed';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'maintenance' | 'venue' | 'calendar' | 'clock' | 'search' | 'filter' | 'check';
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
        case 'maintenance':
            return <svg {...shared}><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z" /></svg>;
        case 'venue':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'search':
            return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
        case 'filter':
            return <svg {...shared}><path d="M4 7h16M7 12h10M10 17h4" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
    }
}

function statusLabel(status: string): string {
    return status === 'in-progress'
        ? 'In progress'
        : status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClasses(status: string): string {
    if (status === 'completed') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (status === 'in-progress') return 'border-blue-200 bg-blue-50 text-blue-700';
    return 'border-amber-200 bg-amber-50 text-amber-800';
}

function formatDate(value: string): string {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

function formatTime(value: string | null | undefined): string {
    if (!value) return '—';
    const [hours, minutes] = value.split(':').map(Number);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return value;
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(time);
}

function SummaryCard({
    label,
    count,
    detail,
    tone,
    icon,
}: {
    label: string;
    count: number;
    detail: string;
    tone: string;
    icon: 'maintenance' | 'clock' | 'check';
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
                    <Icon name={icon} className="h-[18px] w-[18px]" />
                </span>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{count}</p>
            <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </section>
    );
}

const MaintenanceMonitor: React.FC<Props> = ({ maintenances = [] }) => {
    const [filter, setFilter] = useState<MaintenanceFilter>('all');
    const [search, setSearch] = useState('');
    const [venueFilter, setVenueFilter] = useState('');

    const venueOptions = useMemo(
        () => [...new Set(maintenances.map((item) => item.venue?.name).filter((name): name is string => Boolean(name)))].sort(),
        [maintenances],
    );

    const statusCounts = useMemo(
        () => ({
            scheduled: maintenances.filter((item) => item.status === 'scheduled').length,
            inProgress: maintenances.filter((item) => item.status === 'in-progress').length,
            completed: maintenances.filter((item) => item.status === 'completed').length,
        }),
        [maintenances],
    );

    const filteredMaintenances = useMemo(() => {
        const query = search.trim().toLowerCase();
        return maintenances.filter((maintenance) => {
            const status = maintenance.status;
            const matchesTab = filter === 'all' || status === filter;
            const matchesVenue = !venueFilter || maintenance.venue?.name === venueFilter;
            const matchesSearch =
                !query ||
                maintenance.venue?.name.toLowerCase().includes(query) ||
                maintenance.description.toLowerCase().includes(query) ||
                String(maintenance.id).includes(query);
            return matchesTab && matchesVenue && matchesSearch;
        });
    }, [filter, maintenances, search, venueFilter]);

    const tabs: Array<{ key: MaintenanceFilter; label: string; count: number }> = [
        { key: 'all', label: 'All maintenance', count: maintenances.length },
        { key: 'scheduled', label: 'Scheduled', count: statusCounts.scheduled },
        { key: 'in-progress', label: 'In progress', count: statusCounts.inProgress },
        { key: 'completed', label: 'Completed', count: statusCounts.completed },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Maintenance Monitoring
                </h2>
            }
        >
            <Head title="Maintenance Monitoring" />

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 lg:flex-row lg:items-end">
                    <div>
                        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                            <span className="font-semibold text-slate-800">Admin</span>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">Maintenance Monitor</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Maintenance Monitoring
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            View maintenance jobs and their status. Admin view is read-only.
                        </p>
                    </div>
                </section>

                <section aria-label="Maintenance summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Total jobs"
                        count={maintenances.length}
                        detail="Maintenance records"
                        icon="maintenance"
                        tone="bg-blue-50 text-blue-700"
                    />
                    <SummaryCard
                        label="Scheduled"
                        count={statusCounts.scheduled}
                        detail="Jobs awaiting work"
                        icon="clock"
                        tone="bg-amber-50 text-amber-700"
                    />
                    <SummaryCard
                        label="In progress"
                        count={statusCounts.inProgress}
                        detail="Jobs currently underway"
                        icon="maintenance"
                        tone="bg-sky-50 text-sky-700"
                    />
                    <SummaryCard
                        label="Completed"
                        count={statusCounts.completed}
                        detail="Jobs marked complete"
                        icon="check"
                        tone="bg-emerald-50 text-emerald-700"
                    />
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50/70 px-4 pt-3 sm:px-5">
                        <div className="flex gap-1 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    aria-pressed={filter === tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={`-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition sm:px-4 ${
                                        filter === tab.key
                                            ? 'border-blue-700 text-blue-700'
                                            : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                                        filter === tab.key ? 'bg-blue-100 text-blue-800' : 'bg-slate-200/70 text-slate-600'
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
                        <label className="relative block flex-1">
                            <span className="sr-only">Search maintenance records</span>
                            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search venue, description, or ID"
                                className="w-full rounded-xl border-slate-200 py-2.5 pl-9 pr-3 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <Icon name="venue" className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="sr-only">Filter by venue</span>
                            <select
                                value={venueFilter}
                                onChange={(event) => setVenueFilter(event.target.value)}
                                className="w-full min-w-48 rounded-xl border-slate-200 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">All venues</option>
                                {venueOptions.map((venue) => (
                                    <option key={venue} value={venue}>
                                        {venue}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Venue</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Scheduled Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Scheduled Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Completed At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {filteredMaintenances.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-500">
                                            No maintenance records found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMaintenances.map((maintenance) => (
                                        <tr key={maintenance.id} className="hover:bg-slate-50">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">#{maintenance.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                                {maintenance.venue?.name || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                                                {maintenance.description}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                                {formatDate(maintenance.scheduled_for_date)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                                {formatTime(maintenance.scheduled_for_time)}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses(maintenance.status)}`}>
                                                    {statusLabel(maintenance.status)}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                                {maintenance.completed_at ? formatDate(maintenance.completed_at) : 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
};

export default MaintenanceMonitor;
