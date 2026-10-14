import React, { useEffect, useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

interface Maintenance {
    id: number;
    description: string;
    scheduled_for_date: string;
    scheduled_for_time: string;
    status: string;
    venue: { name: string; location?: string } | null;
}

interface Props {
    maintenances: Maintenance[];
}

type MaintenanceFilter = 'all' | 'scheduled' | 'in-progress' | 'completed';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'maintenance' | 'venue' | 'calendar' | 'clock' | 'search' | 'download' | 'plus' | 'check' | 'arrow' | 'refresh' | 'edit' | 'report' | 'info' | 'filter';
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
        case 'download':
            return <svg {...shared}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
        case 'plus':
            return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'arrow':
            return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
        case 'refresh':
            return <svg {...shared}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></svg>;
        case 'edit':
            return <svg {...shared}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>;
        case 'report':
            return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>;
        case 'info':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
        case 'filter':
            return <svg {...shared}><path d="M4 7h16M7 12h10M10 17h4" /></svg>;
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

function formatTime(value: string): string {
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

export default function MaintenanceList({ maintenances = [] }: Props) {
    const [csrfToken, setCsrfToken] = useState<string | null>(
        document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null,
    );
    const [statuses, setStatuses] = useState<Record<number, string>>(() =>
        maintenances.reduce<Record<number, string>>((result, maintenance) => {
            result[maintenance.id] = maintenance.status;
            return result;
        }, {}),
    );
    const [filter, setFilter] = useState<MaintenanceFilter>('all');
    const [search, setSearch] = useState('');
    const [venueFilter, setVenueFilter] = useState('');
    const [statusError, setStatusError] = useState('');

    useEffect(() => {
        setStatuses(
            maintenances.reduce<Record<number, string>>((result, maintenance) => {
                result[maintenance.id] = maintenance.status;
                return result;
            }, {}),
        );
    }, [maintenances]);

    const refreshCsrfToken = async (): Promise<string> => {
        const response = await fetch('/refresh-csrf', {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`CSRF refresh failed with status ${response.status}.`);

        const data: { csrf_token?: string } = await response.json();
        if (!data.csrf_token) throw new Error('CSRF refresh returned no token.');

        document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', data.csrf_token);
        setCsrfToken(data.csrf_token);
        return data.csrf_token;
    };

    useEffect(() => {
        let active = true;
        const refresh = async () => {
            try {
                const token = await refreshCsrfToken();
                if (active) setCsrfToken(token);
            } catch (error) {
                console.error('Unable to refresh the CSRF token:', error);
            }
        };

        void refresh();
        const interval = window.setInterval(() => void refresh(), 30 * 60 * 1000);
        return () => {
            active = false;
            window.clearInterval(interval);
        };
    }, []);

    const venueOptions = useMemo(
        () => [...new Set(maintenances.map((item) => item.venue?.name).filter((name): name is string => Boolean(name)))].sort(),
        [maintenances],
    );

    const statusCounts = useMemo(
        () => ({
            scheduled: maintenances.filter((item) => statuses[item.id] === 'scheduled').length,
            inProgress: maintenances.filter((item) => statuses[item.id] === 'in-progress').length,
            completed: maintenances.filter((item) => statuses[item.id] === 'completed').length,
        }),
        [maintenances, statuses],
    );

    const filteredMaintenances = useMemo(() => {
        const query = search.trim().toLowerCase();
        return maintenances.filter((maintenance) => {
            const status = statuses[maintenance.id] || maintenance.status;
            const matchesTab = filter === 'all' || status === filter;
            const matchesVenue = !venueFilter || maintenance.venue?.name === venueFilter;
            const matchesSearch =
                !query ||
                maintenance.venue?.name.toLowerCase().includes(query) ||
                maintenance.description.toLowerCase().includes(query) ||
                String(maintenance.id).includes(query);
            return matchesTab && matchesVenue && matchesSearch;
        });
    }, [filter, maintenances, search, statuses, venueFilter]);

    const handleStatusChange = async (maintenanceId: number, newStatus: string) => {
        if (newStatus === 'completed') {
            const confirmed = window.confirm(
                'Are you sure you want to mark this task as "completed"? Once marked, it cannot be changed.',
            );
            if (!confirmed) return;
        }

        setStatusError('');
        try {
            const token = await refreshCsrfToken();
            const response = await fetch(`/api/maintenance/${maintenanceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token || csrfToken || '',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorMessage = `Status update failed with status ${response.status}.`;
                console.error(errorMessage, await response.text());
                throw new Error(errorMessage);
            }

            setStatuses((previous) => ({ ...previous, [maintenanceId]: newStatus }));
        } catch (error) {
            console.error('Failed to update maintenance status:', error);
            setStatusError('The status could not be updated. Please try again.');
        }
    };

    const generateReport = async (maintenanceId: number) => {
        try {
            const response = await fetch(`/maintenance/${maintenanceId}/report`, { method: 'GET' });
            if (!response.ok) throw new Error(`Report generation failed with status ${response.status}.`);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Maintenance_Report_${maintenanceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating maintenance report:', error);
            window.alert('The report could not be generated. Please try again.');
        }
    };

    const exportCsv = () => {
        const escapeCsv = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
        const rows = [
            ['Maintenance ID', 'Venue', 'Location', 'Description', 'Scheduled date', 'Scheduled time', 'Status'],
            ...filteredMaintenances.map((maintenance) => [
                maintenance.id,
                maintenance.venue?.name || '',
                maintenance.venue?.location || '',
                maintenance.description,
                maintenance.scheduled_for_date,
                maintenance.scheduled_for_time,
                statusLabel(statuses[maintenance.id] || maintenance.status),
            ]),
        ];
        const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'maintenance-records.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const resetFilters = () => {
        setFilter('all');
        setSearch('');
        setVenueFilter('');
    };

    const tabs: Array<{ key: MaintenanceFilter; label: string; count: number }> = [
        { key: 'all', label: 'All maintenance', count: maintenances.length },
        { key: 'scheduled', label: 'Scheduled', count: statusCounts.scheduled },
        { key: 'in-progress', label: 'In progress', count: statusCounts.inProgress },
        { key: 'completed', label: 'Completed', count: statusCounts.completed },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Maintenance List" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 lg:flex-row lg:items-end">
                    <div>
                        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                            <span className="font-semibold text-slate-800">Maintenance</span>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page">Records</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Maintenance &amp; Service Records
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Monitor maintenance jobs, update their status, and generate reports for completed work.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={exportCsv}
                            disabled={filteredMaintenances.length === 0}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Icon name="download" className="h-4 w-4" />
                            Export CSV
                        </button>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            <Icon name="refresh" className="h-4 w-4" />
                            Refresh
                        </button>
                        <Link
                            href={route('maintenance.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            <Icon name="plus" className="h-4 w-4" />
                            Add maintenance
                        </Link>
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
                                {venueOptions.map((venue) => <option key={venue} value={venue}>{venue}</option>)}
                            </select>
                        </label>
                        <button
                            type="button"
                            onClick={resetFilters}
                            disabled={filter === 'all' && !search && !venueFilter}
                            className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            <Icon name="filter" className="h-4 w-4" />
                            Clear filters
                        </button>
                    </div>

                    {statusError && (
                        <div role="alert" className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 sm:mx-5">
                            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>{statusError}</p>
                        </div>
                    )}

                    {filteredMaintenances.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Icon name="maintenance" />
                            </span>
                            <h2 className="mt-4 text-base font-bold text-slate-900">
                                {maintenances.length === 0 ? 'No maintenance records yet' : 'No records match these filters'}
                            </h2>
                            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                                {maintenances.length === 0
                                    ? 'New maintenance jobs will appear here after they are created.'
                                    : 'Try a different search or clear the filters to see more records.'}
                            </p>
                            {maintenances.length === 0 && (
                                <Link
                                    href={route('maintenance.create')}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    <Icon name="plus" className="h-4 w-4" />
                                    Add maintenance
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[950px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <th scope="col" className="px-5 py-3">Venue &amp; job</th>
                                            <th scope="col" className="px-5 py-3">Description</th>
                                            <th scope="col" className="px-5 py-3">Scheduled</th>
                                            <th scope="col" className="px-5 py-3">Status</th>
                                            <th scope="col" className="px-5 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredMaintenances.map((maintenance) => {
                                            const status = statuses[maintenance.id] || maintenance.status;
                                            return (
                                                <tr key={maintenance.id} className="align-top transition hover:bg-slate-50/70">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-start gap-3">
                                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                                                                <Icon name="venue" className="h-4 w-4" />
                                                            </span>
                                                            <div className="min-w-0">
                                                                <p className="font-semibold text-slate-900">{maintenance.venue?.name || 'Venue unavailable'}</p>
                                                                {maintenance.venue?.location && (
                                                                    <p className="mt-1 text-xs text-slate-500">{maintenance.venue.location}</p>
                                                                )}
                                                                <p className="mt-1 font-mono text-xs text-slate-400">#{maintenance.id}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="max-w-md px-5 py-4">
                                                        <p className="whitespace-pre-wrap break-words text-sm leading-5 text-slate-700">{maintenance.description}</p>
                                                    </td>
                                                    <td className="whitespace-nowrap px-5 py-4">
                                                        <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                                            <Icon name="calendar" className="h-4 w-4 text-blue-700" />
                                                            {formatDate(maintenance.scheduled_for_date)}
                                                        </p>
                                                        <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                                            <Icon name="clock" className="h-4 w-4" />
                                                            {formatTime(maintenance.scheduled_for_time)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(status)}`}>
                                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                            {statusLabel(status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex flex-col items-start gap-2">
                                                            <label className="sr-only" htmlFor={`status-${maintenance.id}`}>Update status for job {maintenance.id}</label>
                                                            <select
                                                                id={`status-${maintenance.id}`}
                                                                value={status}
                                                                onChange={(event) => void handleStatusChange(maintenance.id, event.target.value)}
                                                                disabled={status === 'completed'}
                                                                className="max-w-full rounded-lg border-slate-200 py-1.5 pl-2.5 pr-8 text-xs font-semibold text-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                                                            >
                                                                <option value="scheduled">Scheduled</option>
                                                                <option value="in-progress">In progress</option>
                                                                <option value="completed">Completed</option>
                                                            </select>
                                                            <button
                                                                type="button"
                                                                onClick={() => void generateReport(maintenance.id)}
                                                                disabled={status !== 'completed'}
                                                                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                                                                    status === 'completed'
                                                                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                                        : 'cursor-not-allowed bg-slate-100 text-slate-400'
                                                                }`}
                                                            >
                                                                <Icon name="report" className="h-3.5 w-3.5" />
                                                                Generate report
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-slate-100 md:hidden">
                                {filteredMaintenances.map((maintenance) => {
                                    const status = statuses[maintenance.id] || maintenance.status;
                                    return (
                                        <article key={maintenance.id} className="space-y-4 p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex min-w-0 items-start gap-3">
                                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                                                        <Icon name="venue" className="h-4 w-4" />
                                                    </span>
                                                    <div className="min-w-0">
                                                        <h3 className="break-words font-semibold text-slate-900">{maintenance.venue?.name || 'Venue unavailable'}</h3>
                                                        {maintenance.venue?.location && <p className="mt-1 text-xs text-slate-500">{maintenance.venue.location}</p>}
                                                        <p className="mt-1 font-mono text-xs text-slate-400">#{maintenance.id}</p>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(status)}`}>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {statusLabel(status)}
                                                </span>
                                            </div>
                                            <p className="whitespace-pre-wrap break-words text-sm leading-5 text-slate-700">{maintenance.description}</p>
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Icon name="calendar" className="h-4 w-4 text-blue-700" />
                                                    {formatDate(maintenance.scheduled_for_date)}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Icon name="clock" className="h-4 w-4" />
                                                    {formatTime(maintenance.scheduled_for_time)}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                                    <Icon name="edit" className="h-4 w-4" />
                                                    <span className="sr-only">Update status for job {maintenance.id}</span>
                                                    <select
                                                        aria-label={`Update status for job ${maintenance.id}`}
                                                        value={status}
                                                        onChange={(event) => void handleStatusChange(maintenance.id, event.target.value)}
                                                        disabled={status === 'completed'}
                                                        className="rounded-lg border-slate-200 py-1.5 pl-2.5 pr-8 text-xs font-semibold text-slate-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                                                    >
                                                        <option value="scheduled">Scheduled</option>
                                                        <option value="in-progress">In progress</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => void generateReport(maintenance.id)}
                                                    disabled={status !== 'completed'}
                                                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                                                        status === 'completed'
                                                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                            : 'cursor-not-allowed bg-slate-100 text-slate-400'
                                                    }`}
                                                >
                                                    <Icon name="report" className="h-3.5 w-3.5" />
                                                    Generate report
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 text-xs text-slate-500 sm:px-5">
                        Showing <span className="font-semibold text-slate-800">{filteredMaintenances.length}</span> of{' '}
                        <span className="font-semibold text-slate-800">{maintenances.length}</span> maintenance records
                    </div>
                </section>

                <section className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
                    <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    <div>
                        <h2 className="text-sm font-bold text-slate-900">Managing maintenance records</h2>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                            Status changes are saved to the maintenance record. Reports can be generated after a job is marked completed.
                        </p>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
