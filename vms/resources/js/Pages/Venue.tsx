import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: number;
    status: string;
}

type VenueStatusFilter = 'all' | 'available' | 'other';
type AvailabilityByVenue = Record<number, boolean>;

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'venue' | 'check' | 'clock' | 'search' | 'download' | 'list' | 'grid' | 'pin' | 'users' | 'refresh';
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
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'search':
            return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
        case 'download':
            return <svg {...shared}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
        case 'list':
            return <svg {...shared}><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>;
        case 'grid':
            return <svg {...shared}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></svg>;
        case 'pin':
            return <svg {...shared}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
        case 'users':
            return <svg {...shared}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'refresh':
            return <svg {...shared}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></svg>;
    }
}

function SummaryCard({
    label,
    value,
    detail,
    icon,
    tone,
}: {
    label: string;
    value: number | string;
    detail: string;
    icon: 'venue' | 'check' | 'clock' | 'search';
    tone: string;
}) {
    return (
        <section className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{detail}</p>
            </div>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <Icon name={icon} />
            </span>
        </section>
    );
}

function StatusBadge({ available, label }: { available: boolean; label: string }) {
    return (
        <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                available
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${available ? 'bg-emerald-600' : 'bg-amber-600'}`} />
            {label}
        </span>
    );
}

export default function Venue() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [availability, setAvailability] = useState<AvailabilityByVenue | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<VenueStatusFilter>('all');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [loadingVenues, setLoadingVenues] = useState(true);
    const [checkingAvailability, setCheckingAvailability] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const requestSequence = useRef(0);

    useEffect(() => {
        let isMounted = true;

        axios
            .get<Venue[]>('/api/venues')
            .then(({ data }) => {
                if (!Array.isArray(data)) {
                    throw new Error('Unexpected venue response');
                }
                if (isMounted) setVenues(data);
            })
            .catch((error: unknown) => {
                console.error('Unable to load venues:', error);
                if (isMounted) setLoadError('Venue information could not be loaded. Please refresh and try again.');
            })
            .finally(() => {
                if (isMounted) setLoadingVenues(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const intervalIsComplete = Boolean(selectedDate && selectedStartTime && selectedEndTime);
    const intervalIsValid = intervalIsComplete && selectedStartTime < selectedEndTime;

    useEffect(() => {
        let isCurrent = true;
        const requestId = ++requestSequence.current;

        if (!intervalIsComplete || !intervalIsValid || venues.length === 0) {
            setAvailability(null);
            setAvailabilityError('');
            setCheckingAvailability(false);
            return () => {
                isCurrent = false;
            };
        }

        setCheckingAvailability(true);
        setAvailabilityError('');

        Promise.all(
            venues.map(async (venue) => {
                const { data } = await axios.post<{ available: boolean }>('/api/venues/check-availability', {
                    venue_id: venue.id,
                    date: selectedDate,
                    start_time: selectedStartTime,
                    end_time: selectedEndTime,
                });
                if (typeof data.available !== 'boolean') {
                    throw new Error(`Unexpected availability response for venue ${venue.id}`);
                }
                return [venue.id, data.available] as const;
            }),
        )
            .then((results) => {
                if (isCurrent && requestSequence.current === requestId) {
                    setAvailability(Object.fromEntries(results));
                }
            })
            .catch((error: unknown) => {
                console.error('Unable to check venue availability:', error);
                if (isCurrent && requestSequence.current === requestId) {
                    setAvailabilityError('Availability could not be checked. Showing each venue’s listed status instead.');
                    setAvailability(null);
                }
            })
            .finally(() => {
                if (isCurrent && requestSequence.current === requestId) {
                    setCheckingAvailability(false);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [intervalIsComplete, intervalIsValid, selectedDate, selectedEndTime, selectedStartTime, venues]);

    const isAvailable = (venue: Venue) =>
        availability
            ? availability[venue.id] === true
            : venue.status?.trim().toLowerCase() === 'available';

    const availableCount = venues.filter(isAvailable).length;
    const otherStatusCount = venues.length - availableCount;

    const filteredVenues = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return venues.filter((venue) => {
            const matchesSearch =
                normalizedSearch.length === 0 ||
                venue.name.toLowerCase().includes(normalizedSearch) ||
                venue.location.toLowerCase().includes(normalizedSearch);
            const available = isAvailable(venue);
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'available' && available) ||
                (statusFilter === 'other' && !available);

            return matchesSearch && matchesStatus;
        });
    }, [availability, search, statusFilter, venues]);

    const resetFilters = () => {
        setSelectedDate('');
        setSelectedStartTime('');
        setSelectedEndTime('');
        setSearch('');
        setStatusFilter('all');
    };

    const exportVenues = () => {
        const escapeCsv = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
        const rows = [
            ['Name', 'Location', 'Capacity', 'Status'],
            ...filteredVenues.map((venue) => [
                venue.name,
                venue.location,
                venue.capacity,
                availability
                    ? availability[venue.id]
                        ? 'Available'
                        : 'Not available for selected time'
                    : venue.status || 'Unknown',
            ]),
        ];
        const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'venue-directory.csv';
        downloadLink.click();
        URL.revokeObjectURL(url);
    };

    const statusLabel = (venue: Venue) => {
        if (availability) return availability[venue.id] ? 'Available for selected time' : 'Unavailable for selected time';
        return venue.status || 'Unknown';
    };

    const timeError = intervalIsComplete && !intervalIsValid;

    return (
        <AuthenticatedLayout>
            <Head title="Venue Directory" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-end">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                            Venue management
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Faculty Venue Directory
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Browse available spaces, check a time slot, and view venue details.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={exportVenues}
                        disabled={filteredVenues.length === 0}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Icon name="download" className="h-4 w-4" />
                        Export list
                    </button>
                </section>

                <section aria-label="Venue summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Total venues"
                        value={loadingVenues ? '—' : venues.length}
                        detail="In the faculty directory"
                        icon="venue"
                        tone="bg-slate-100 text-slate-700"
                    />
                    <SummaryCard
                        label="Available"
                        value={loadingVenues ? '—' : availableCount}
                        detail={availability ? 'For selected time slot' : 'Based on listed status'}
                        icon="check"
                        tone="bg-emerald-50 text-emerald-700"
                    />
                    <SummaryCard
                        label="Other status"
                        value={loadingVenues ? '—' : otherStatusCount}
                        detail="Occupied, unavailable, or in maintenance"
                        icon="clock"
                        tone="bg-amber-50 text-amber-700"
                    />
                    <SummaryCard
                        label="Matching results"
                        value={loadingVenues ? '—' : filteredVenues.length}
                        detail="Based on current filters"
                        icon="search"
                        tone="bg-blue-50 text-blue-700"
                    />
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-center">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900">Availability &amp; search</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Choose a date and time to check live booking availability.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-rose-700"
                        >
                            <Icon name="refresh" className="h-4 w-4" />
                            Reset filters
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        <div>
                            <label htmlFor="venue-date" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Select date
                            </label>
                            <input
                                id="venue-date"
                                type="date"
                                value={selectedDate}
                                onChange={(event) => setSelectedDate(event.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="venue-start-time" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Start time
                            </label>
                            <input
                                id="venue-start-time"
                                type="time"
                                value={selectedStartTime}
                                onChange={(event) => setSelectedStartTime(event.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="venue-end-time" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                End time
                            </label>
                            <input
                                id="venue-end-time"
                                type="time"
                                value={selectedEndTime}
                                onChange={(event) => setSelectedEndTime(event.target.value)}
                                className={`w-full rounded-xl bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:ring-blue-500 ${
                                    timeError
                                        ? 'border-rose-400 focus:border-rose-500'
                                        : 'border-slate-200 focus:border-blue-500'
                                }`}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="venue-search" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Search venues
                            </label>
                            <div className="relative">
                                <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="venue-search"
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search by name or location"
                                    className="w-full rounded-xl border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {timeError && (
                        <p role="alert" className="mt-3 text-sm font-medium text-rose-700">
                            End time must be later than start time.
                        </p>
                    )}
                    {checkingAvailability && (
                        <p role="status" className="mt-3 text-sm font-medium text-blue-700">
                            Checking venue availability for the selected time…
                        </p>
                    )}
                    {availabilityError && (
                        <p role="alert" className="mt-3 text-sm text-amber-800">
                            {availabilityError}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-xs font-semibold text-slate-500">Show:</span>
                            {([
                                ['all', 'All venues'],
                                ['available', 'Available'],
                                ['other', 'Other status'],
                            ] as const).map(([filter, label]) => (
                                <button
                                    key={filter}
                                    type="button"
                                    aria-pressed={statusFilter === filter}
                                    onClick={() => setStatusFilter(filter)}
                                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                        statusFilter === filter
                                            ? 'bg-blue-700 text-white shadow-sm'
                                            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        {intervalIsValid && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700">
                                <Icon name="check" className="h-4 w-4" />
                                Checking date and time availability
                            </span>
                        )}
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-slate-900">Venue list</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {loadingVenues
                                    ? 'Loading venues…'
                                    : `Showing ${filteredVenues.length} of ${venues.length} venues`}
                            </p>
                        </div>
                        <div className="inline-flex w-fit items-center rounded-xl border border-slate-200 bg-white p-1">
                            <button
                                type="button"
                                aria-label="List view"
                                aria-pressed={viewMode === 'list'}
                                onClick={() => setViewMode('list')}
                                className={`rounded-lg p-2 transition ${
                                    viewMode === 'list'
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                <Icon name="list" className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Grid view"
                                aria-pressed={viewMode === 'grid'}
                                onClick={() => setViewMode('grid')}
                                className={`rounded-lg p-2 transition ${
                                    viewMode === 'grid'
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                <Icon name="grid" className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {loadError ? (
                        <div role="alert" className="px-5 py-12 text-center text-sm text-rose-700 sm:px-6">
                            {loadError}
                        </div>
                    ) : loadingVenues ? (
                        <div role="status" className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6">
                            Loading venues…
                        </div>
                    ) : filteredVenues.length === 0 ? (
                        <div className="px-5 py-12 text-center sm:px-6">
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <Icon name="search" className="h-5 w-5" />
                            </span>
                            <p className="mt-3 text-sm font-semibold text-slate-800">
                                {venues.length === 0 ? 'No venues have been added yet' : 'No venues match these filters'}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Try a different search term or reset the filters.
                            </p>
                        </div>
                    ) : viewMode === 'list' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <th className="px-5 py-3.5 sm:px-6" scope="col">Venue</th>
                                        <th className="px-4 py-3.5" scope="col">Location</th>
                                        <th className="px-4 py-3.5 text-right" scope="col">Capacity</th>
                                        <th className="px-4 py-3.5" scope="col">Status</th>
                                        <th className="px-5 py-3.5 text-right sm:px-6" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredVenues.map((venue) => {
                                        const available = isAvailable(venue);

                                        return (
                                            <tr key={venue.id} className="transition hover:bg-slate-50/80">
                                                <td className="px-5 py-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                                            <Icon name="venue" />
                                                        </span>
                                                        <span className="font-semibold text-slate-900">{venue.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-slate-600">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Icon name="pin" className="h-4 w-4 text-slate-400" />
                                                        {venue.location}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right text-sm font-semibold text-slate-800">
                                                    {venue.capacity} <span className="font-normal text-slate-500">pax</span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge available={available} label={statusLabel(venue)} />
                                                </td>
                                                <td className="px-5 py-4 text-right sm:px-6">
                                                    <Link
                                                        href={route('venues.show', { id: venue.id })}
                                                        className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    >
                                                        See details
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredVenues.map((venue) => {
                                const available = isAvailable(venue);

                                return (
                                    <li key={venue.id} className="flex flex-col rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-sm">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                                <Icon name="venue" />
                                            </span>
                                            <StatusBadge available={available} label={statusLabel(venue)} />
                                        </div>
                                        <h3 className="mt-4 font-semibold text-slate-900">{venue.name}</h3>
                                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
                                            <Icon name="pin" className="h-4 w-4" />
                                            {venue.location}
                                        </p>
                                        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-600">
                                            <Icon name="users" className="h-4 w-4 text-slate-400" />
                                            Capacity {venue.capacity}
                                        </p>
                                        <Link
                                            href={route('venues.show', { id: venue.id })}
                                            className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            See details
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {!loadError && !loadingVenues && filteredVenues.length > 0 && (
                        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-xs text-slate-500 sm:px-6">
                            Showing {filteredVenues.length} of {venues.length} venues
                            {availability && ' · Availability reflects the selected date and time'}
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
