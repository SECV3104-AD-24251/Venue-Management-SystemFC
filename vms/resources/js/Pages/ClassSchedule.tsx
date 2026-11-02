import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

interface Schedule {
    id: number;
    class_name: string;
    section: number | string;
    lecturer_name: string | null;
    day: string;
    start_time: string | null;
    end_time: string | null;
    venue: { id?: number; name: string; image?: string | null } | null;
}

interface Venue {
    id: number;
    name: string;
    capacity: number;
}

interface ClassScheduleData {
    class_name: string;
    section: string;
    day: string;
    start_time: string;
    end_time: string;
    venue_id: string;
}

interface Props {
    schedules: Schedule[];
}

interface CalendarDay {
    day: string;
    items: Schedule[];
}

interface CalendarBlock {
    schedule: Schedule;
    lane: number;
    laneCount: number;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayOrder = new Map(days.map((day, index) => [day, index]));
const hourHeight = 84;

function toMinutes(time: string | null): number | null {
    if (!time) return null;

    const [hours, minutes] = time.split(':').map(Number);
    if (Number.isNaN(hours)) return null;

    return hours * 60 + (Number.isNaN(minutes) ? 0 : minutes);
}

function formatTime(time: string | null): string {
    if (!time) return '—';

    const minutes = toMinutes(time);
    if (minutes === null) return time;

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
}

function getCalendarBlocks(items: Schedule[]): CalendarBlock[] {
    const sorted = [...items].sort((a, b) => (toMinutes(a.start_time) ?? 0) - (toMinutes(b.start_time) ?? 0));
    const groups: Schedule[][] = [];
    let groupEnd = Number.NEGATIVE_INFINITY;

    for (const schedule of sorted) {
        const start = toMinutes(schedule.start_time) ?? 0;
        const end = Math.max(toMinutes(schedule.end_time) ?? start + 60, start + 15);

        if (start >= groupEnd) {
            groups.push([]);
            groupEnd = Number.NEGATIVE_INFINITY;
        }

        groups[groups.length - 1].push(schedule);
        groupEnd = Math.max(groupEnd, end);
    }

    return groups.flatMap((group) => {
        const laneEnds: number[] = [];
        const assigned = group.map((schedule) => {
            const start = toMinutes(schedule.start_time) ?? 0;
            const end = Math.max(toMinutes(schedule.end_time) ?? start + 60, start + 15);
            let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start);

            if (lane === -1) {
                lane = laneEnds.length;
                laneEnds.push(0);
            }

            laneEnds[lane] = end;
            return { schedule, lane };
        });

        return assigned.map(({ schedule, lane }) => ({
            schedule,
            lane,
            laneCount: laneEnds.length,
        }));
    });
}

function ScheduleIcon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'calendar' | 'plus' | 'search' | 'clock' | 'venue' | 'close';
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
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></svg>;
        case 'plus':
            return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>;
        case 'search':
            return <svg {...shared}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'venue':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4" /></svg>;
        case 'close':
            return <svg {...shared}><path d="m18 6-12 12M6 6l12 12" /></svg>;
    }
}

function VenueThumbnail({ venue }: { venue: Schedule['venue'] }) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-br from-slate-700 to-blue-900">
            {venue?.image && !imageFailed ? (
                <img
                    src={venue.image}
                    alt={`${venue.name} venue`}
                    className="h-full w-full object-cover"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white" aria-label={`${venue?.name ?? 'Venue'} image unavailable`}>
                    {venue?.name?.trim().charAt(0).toUpperCase() || 'V'}
                </div>
            )}
        </div>
    );
}

export default function ClassSchedule({ schedules }: Props) {
    const { props } = usePage();
    const user = props.auth.user;
    const [venues, setVenues] = useState<Venue[]>([]);
    const [venuesLoading, setVenuesLoading] = useState(true);
    const [venuesError, setVenuesError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [dayFilter, setDayFilter] = useState('All days');

    const { data, setData, post, processing, errors, reset } = useForm<ClassScheduleData>({
        class_name: '',
        section: '',
        day: '',
        start_time: '',
        end_time: '',
        venue_id: '',
    });

    useEffect(() => {
        let isMounted = true;

        axios
            .get<Venue[]>('/api/venues')
            .then(({ data: response }) => {
                if (!Array.isArray(response)) {
                    throw new Error('Unexpected venues response');
                }
                if (isMounted) setVenues(response);
            })
            .catch((error: unknown) => {
                console.error('Unable to load schedule venues:', error);
                if (isMounted) setVenuesError('Could not load venues. Please refresh the page and try again.');
            })
            .finally(() => {
                if (isMounted) setVenuesLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const orderedSchedules = useMemo(() => {
        const query = search.trim().toLowerCase();

        return (schedules ?? [])
            .filter((schedule) => {
                const matchesDay = dayFilter === 'All days' || schedule.day === dayFilter;
                const matchesSearch =
                    !query ||
                    schedule.class_name.toLowerCase().includes(query) ||
                    (schedule.venue?.name ?? '').toLowerCase().includes(query) ||
                    schedule.day.toLowerCase().includes(query) ||
                    String(schedule.section).toLowerCase().includes(query);

                return matchesDay && matchesSearch;
            })
            .sort((a, b) => {
                const weekdayDifference =
                    (dayOrder.get(a.day) ?? days.length) - (dayOrder.get(b.day) ?? days.length);
                return weekdayDifference || (a.start_time ?? '').localeCompare(b.start_time ?? '');
            });
    }, [dayFilter, schedules, search]);

    const daysWithClasses = new Set((schedules ?? []).map((schedule) => schedule.day)).size;
    const venuesUsed = new Set(
        (schedules ?? []).map((schedule) => schedule.venue?.name).filter(Boolean),
    ).size;
    const dayTabs = [
        { label: 'All days', count: schedules?.length ?? 0 },
        ...days.map((day) => ({
            label: day,
            count: (schedules ?? []).filter((schedule) => schedule.day === day).length,
        })),
    ];

    const calendarDays = useMemo<CalendarDay[]>(() => {
        const grouped = new Map<string, Schedule[]>();
        for (const schedule of orderedSchedules) {
            const items = grouped.get(schedule.day) ?? [];
            items.push(schedule);
            grouped.set(schedule.day, items);
        }

        if (dayFilter !== 'All days') {
            return [{ day: dayFilter, items: grouped.get(dayFilter) ?? [] }];
        }

        return days.map((day) => ({ day, items: grouped.get(day) ?? [] }));
    }, [dayFilter, orderedSchedules]);

    const calendarTimeRange = useMemo(() => {
        let startMinutes = 8 * 60;
        let endMinutes = 18 * 60;

        for (const schedule of orderedSchedules) {
            const start = toMinutes(schedule.start_time);
            const end = toMinutes(schedule.end_time);

            if (start !== null) startMinutes = Math.min(startMinutes, Math.floor(start / 60) * 60);
            if (end !== null) endMinutes = Math.max(endMinutes, Math.ceil(end / 60) * 60);
        }

        const start = startMinutes;
        const end = Math.max(endMinutes, start + 60);

        return { start, end };
    }, [orderedSchedules]);

    const calendarSpan = Math.max(calendarTimeRange.end - calendarTimeRange.start, 60);
    const calendarHeight = (calendarSpan / 60) * hourHeight;

    const calendarBlocksByDay = useMemo(() => {
        const blocks = new Map<string, CalendarBlock[]>();

        for (const group of calendarDays) {
            blocks.set(group.day, getCalendarBlocks(group.items));
        }

        return blocks;
    }, [calendarDays]);

    const hourMarks = useMemo(() => {
        const marks: { hour: number; minutes: number; label: string }[] = [];

        for (let hour = Math.ceil(calendarTimeRange.start / 60); hour <= Math.floor(calendarTimeRange.end / 60); hour++) {
            const hourOfDay = hour % 24;
            const period = hourOfDay >= 12 ? 'PM' : 'AM';
            const label = `${hourOfDay % 12 || 12}:00 ${period}`;
            marks.push({ hour, minutes: hour * 60, label });
        }

        return marks;
    }, [calendarTimeRange]);

    const timeTop = (minutes: number) =>
        `${(((minutes - calendarTimeRange.start) / 60) * hourHeight).toFixed(2)}px`;

    const currentDay = new Intl.DateTimeFormat('en', {
        weekday: 'long',
        timeZone: 'Asia/Kuala_Lumpur',
    }).format(new Date());

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        post(route('lecturer.schedule.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const inputClass =
        'mt-1 block w-full rounded-xl border-slate-200 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500';

    return (
        <AuthenticatedLayout>
            <Head title="Class Schedule" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 lg:flex-row lg:items-end">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Class Schedule</h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            View and manage your weekly classes, venues, and teaching times.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowForm((previous) => !previous)}
                        aria-expanded={showForm}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
                            showForm
                                ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                : 'bg-blue-700 text-white hover:bg-blue-800'
                        }`}
                    >
                        <ScheduleIcon name={showForm ? 'close' : 'plus'} className="h-4 w-4" />
                        {showForm ? 'Cancel' : 'Add Schedule'}
                    </button>
                </section>

                <section aria-label="Schedule summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Scheduled Classes', value: schedules?.length ?? 0, icon: 'calendar' as const, tone: 'bg-blue-50 text-blue-700' },
                        { label: 'Teaching Days', value: daysWithClasses, icon: 'clock' as const, tone: 'bg-emerald-50 text-emerald-700' },
                        { label: 'Venues Used', value: venuesUsed, icon: 'venue' as const, tone: 'bg-amber-50 text-amber-700' },
                    ].map((item) => (
                        <article key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.tone}`}>
                                    <ScheduleIcon name={item.icon} className="h-[18px] w-[18px]" />
                                </span>
                            </div>
                            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{item.value}</p>
                        </article>
                    ))}
                </section>

                {showForm && (
                    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                            <h2 className="text-base font-bold tracking-tight text-slate-900">Add a class to your schedule</h2>
                            <p className="mt-1 text-sm text-slate-500">Enter the class details and select an available venue.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                            {venuesError && (
                                <p role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                                    {venuesError}
                                </p>
                            )}
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label htmlFor="class_name" className="text-sm font-semibold text-slate-700">Class subject</label>
                                    <input
                                        id="class_name"
                                        type="text"
                                        value={data.class_name}
                                        onChange={(event) => setData('class_name', event.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.class_name && <p className="mt-1 text-sm text-rose-700">{errors.class_name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="section" className="text-sm font-semibold text-slate-700">Section</label>
                                    <input
                                        id="section"
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={data.section}
                                        onChange={(event) => setData('section', event.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.section && <p className="mt-1 text-sm text-rose-700">{errors.section}</p>}
                                </div>
                                <div>
                                    <label htmlFor="day" className="text-sm font-semibold text-slate-700">Day</label>
                                    <select
                                        id="day"
                                        value={data.day}
                                        onChange={(event) => setData('day', event.target.value)}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">Select a day</option>
                                        {days.map((day) => <option key={day} value={day}>{day}</option>)}
                                    </select>
                                    {errors.day && <p className="mt-1 text-sm text-rose-700">{errors.day}</p>}
                                </div>
                                <div>
                                    <label htmlFor="start_time" className="text-sm font-semibold text-slate-700">Start time</label>
                                    <input
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(event) => setData('start_time', event.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.start_time && <p className="mt-1 text-sm text-rose-700">{errors.start_time}</p>}
                                </div>
                                <div>
                                    <label htmlFor="end_time" className="text-sm font-semibold text-slate-700">End time</label>
                                    <input
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(event) => setData('end_time', event.target.value)}
                                        className={inputClass}
                                        required
                                    />
                                    {errors.end_time && <p className="mt-1 text-sm text-rose-700">{errors.end_time}</p>}
                                </div>
                                <div>
                                    <label htmlFor="venue_id" className="text-sm font-semibold text-slate-700">Venue</label>
                                    <select
                                        id="venue_id"
                                        value={data.venue_id}
                                        onChange={(event) => setData('venue_id', event.target.value)}
                                        className={inputClass}
                                        required
                                        disabled={venuesLoading || venues.length === 0}
                                    >
                                        <option value="">
                                            {venuesLoading ? 'Loading venues…' : 'Select a venue'}
                                        </option>
                                        {venues.map((venue) => (
                                            <option key={venue.id} value={String(venue.id)}>
                                                {venue.name} · Capacity {venue.capacity}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.venue_id && <p className="mt-1 text-sm text-rose-700">{errors.venue_id}</p>}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
                                <button
                                    type="submit"
                                    disabled={processing || venuesLoading || venues.length === 0 || Boolean(venuesError)}
                                    className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Saving schedule…' : 'Save schedule'}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50/70 px-4 pt-3 sm:px-5">
                        <div className="flex gap-1 overflow-x-auto">
                            {dayTabs.map((tab) => (
                                <button
                                    key={tab.label}
                                    type="button"
                                    aria-pressed={dayFilter === tab.label}
                                    onClick={() => setDayFilter(tab.label)}
                                    className={`-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition sm:px-4 ${
                                        dayFilter === tab.label
                                            ? 'border-blue-700 text-blue-700'
                                            : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                                        dayFilter === tab.label ? 'bg-blue-100 text-blue-800' : 'bg-slate-200/70 text-slate-600'
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
                        <label className="relative block flex-1">
                            <span className="sr-only">Search schedules</span>
                            <ScheduleIcon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search by class, section, day, or venue"
                                className="w-full rounded-xl border-slate-200 py-2.5 pl-9 pr-3 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => { setSearch(''); setDayFilter('All days'); }}
                            disabled={!search && dayFilter === 'All days'}
                            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            Clear filters
                        </button>
                    </div>

                    {orderedSchedules.length === 0 ? (
                        <div className="px-5 py-14 text-center">
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                <ScheduleIcon name="calendar" />
                            </span>
                            <h2 className="mt-4 text-base font-bold text-slate-900">
                                {(schedules?.length ?? 0) === 0 ? 'No classes scheduled yet' : 'No schedules match these filters'}
                            </h2>
                            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                                {(schedules?.length ?? 0) === 0
                                    ? 'Add your first class to keep your weekly teaching schedule up to date.'
                                    : 'Try another search or clear the filters to see your full schedule.'}
                            </p>
                            {(schedules?.length ?? 0) === 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowForm(true)}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    <ScheduleIcon name="plus" className="h-4 w-4" />
                                    Add Schedule
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <div className="min-w-[1180px]">
                                    <div className="sticky top-0 z-20 grid grid-cols-[96px_repeat(5,minmax(0,1fr))] border-b border-slate-200 bg-slate-50/95 backdrop-blur">
                                        <div className="flex flex-col items-center justify-center border-r border-slate-200 px-3 py-3 text-center">
                                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Time</span>
                                            <span className="mt-0.5 text-[10px] font-semibold text-slate-400">MYT · UTC+8</span>
                                        </div>
                                        {calendarDays.map((group) => {
                                            const isToday = group.day === currentDay;

                                            return (
                                                <div
                                                    key={group.day}
                                                    className={`relative border-r border-slate-200 px-4 py-3 last:border-r-0 ${
                                                        isToday ? 'bg-blue-50/60' : ''
                                                    }`}
                                                >
                                                    {isToday && <span className="absolute inset-x-0 top-0 h-1 bg-blue-600" />}
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-1.5">
                                                                <span className={`text-xs font-black uppercase tracking-tight ${isToday ? 'text-blue-900' : 'text-slate-800'}`}>
                                                                    {group.day}
                                                                </span>
                                                                {isToday && (
                                                                    <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">
                                                                        Today
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className={`mt-0.5 text-[11px] font-semibold ${isToday ? 'text-blue-700' : 'text-slate-500'}`}>
                                                                Weekly schedule
                                                            </p>
                                                        </div>
                                                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                            isToday ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                            {group.items.length} {group.items.length === 1 ? 'class' : 'classes'}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div
                                        className="grid grid-cols-[96px_repeat(5,minmax(0,1fr))] select-none"
                                        style={{ height: calendarHeight }}
                                    >
                                        <div className="relative border-r border-slate-200 bg-slate-50/30" style={{ height: calendarHeight }}>
                                            {hourMarks.map((mark) => (
                                                <span
                                                    key={mark.hour}
                                                    className="absolute right-2 -translate-y-1/2 whitespace-nowrap text-right text-[11px] font-bold text-slate-500 first:top-1 first:translate-y-0"
                                                    style={{ top: timeTop(mark.minutes) }}
                                                >
                                                    {mark.label}
                                                </span>
                                            ))}
                                        </div>

                                        {calendarDays.map((group) => {
                                            const blocks = calendarBlocksByDay.get(group.day) ?? [];
                                            const isToday = group.day === currentDay;

                                            return (
                                                <div
                                                    key={group.day}
                                                    className={`relative border-r border-slate-200 last:border-r-0 ${isToday ? 'bg-blue-50/20' : ''}`}
                                                    style={{ height: calendarHeight }}
                                                >
                                                    {hourMarks.map((mark) => (
                                                        <div
                                                            key={mark.hour}
                                                            className="absolute left-0 right-0 border-t border-dashed border-slate-200"
                                                            style={{ top: timeTop(mark.minutes) }}
                                                        />
                                                    ))}

                                                    {calendarTimeRange.start <= 12 * 60 && calendarTimeRange.end >= 13 * 60 && (
                                                        <div
                                                            className="absolute left-0 right-0 z-[1] flex items-center justify-center border-y border-slate-200/80 bg-slate-100/70 text-[10px] font-extrabold uppercase tracking-widest text-slate-400"
                                                            style={{
                                                                top: timeTop(12 * 60),
                                                                height: hourHeight,
                                                            }}
                                                        >
                                                            {group.day === 'Friday' ? 'Friday prayers' : 'Faculty recess'}
                                                        </div>
                                                    )}

                                                    {blocks.map(({ schedule, lane, laneCount }) => {
                                                        const startMinutes = toMinutes(schedule.start_time) ?? calendarTimeRange.start;
                                                        const endMinutes = Math.max(
                                                            toMinutes(schedule.end_time) ?? startMinutes + 60,
                                                            startMinutes + 15,
                                                        );
                                                        const eventHeight = Math.max(
                                                            ((endMinutes - startMinutes) / 60) * hourHeight,
                                                            56,
                                                        );
                                                        const laneWidth = 100 / laneCount;

                                                        return (
                                                            <article
                                                                key={schedule.id}
                                                                title={`${schedule.class_name} · Section ${schedule.section} · ${schedule.venue?.name ?? 'Venue not set'}`}
                                                                className="absolute z-10 overflow-hidden rounded-xl border border-blue-200 border-l-4 border-l-blue-600 bg-blue-50/95 px-2.5 py-2 shadow-sm transition hover:z-20 hover:shadow-md sm:px-3"
                                                                style={{
                                                                    top: timeTop(startMinutes),
                                                                    height: `${eventHeight}px`,
                                                                    left: `calc(${lane * laneWidth}% + 5px)`,
                                                                    width: `calc(${laneWidth}% - 10px)`,
                                                                }}
                                                            >
                                                                <div className="flex h-full min-w-0 items-start gap-2">
                                                                    <VenueThumbnail venue={schedule.venue} />
                                                                    {eventHeight >= 72 ? (
                                                                        <div className="flex h-full min-w-0 flex-1 flex-col">
                                                                            <div className="flex items-center justify-between gap-1">
                                                                                <span className="truncate rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white">
                                                                                    Class session
                                                                                </span>
                                                                                <span className="shrink-0 text-[10px] font-bold text-slate-500">
                                                                                    Sec {schedule.section}
                                                                                </span>
                                                                            </div>
                                                                            <h3 className="mt-1 line-clamp-2 text-[11px] font-black leading-snug text-slate-900 sm:text-xs">
                                                                                {schedule.class_name}
                                                                            </h3>
                                                                            <p className="mt-1 truncate text-[10px] font-semibold text-blue-900 sm:text-[11px]">
                                                                                {formatTime(schedule.start_time)} – {formatTime(schedule.end_time)}
                                                                            </p>
                                                                            {eventHeight >= 105 && (
                                                                                <p className="mt-auto truncate border-t border-blue-200/70 pt-1.5 text-[10px] font-medium text-slate-600">
                                                                                    {schedule.venue?.name ?? 'Venue not set'}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex h-full min-w-0 flex-1 flex-col justify-center">
                                                                            <p className="truncate text-[10px] font-bold text-slate-900">{schedule.class_name}</p>
                                                                            <p className="truncate text-[9px] font-semibold text-blue-800">
                                                                                {formatTime(schedule.start_time)} – {formatTime(schedule.end_time)}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </article>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200 bg-slate-50/80 px-4 py-3 text-xs font-medium text-slate-600 sm:flex-row sm:items-center">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Legend:</span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className="h-3 w-3 rounded-sm bg-blue-600" />
                                        Class session
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className="h-3 w-3 rounded-sm bg-slate-300" />
                                        Faculty recess
                                    </span>
                                </div>
                                <p className="text-slate-500">Scroll horizontally to view the full week.</p>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
