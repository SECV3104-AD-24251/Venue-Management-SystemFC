import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

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

interface Props {
    schedules: Schedule[];
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayOrder = new Map(days.map((day, index) => [day, index]));

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

export default function AdminSchedules({ schedules }: Props) {
    const [search, setSearch] = useState('');
    const [dayFilter, setDayFilter] = useState('All days');
    const [lecturerFilter, setLecturerFilter] = useState('all');

    const orderedSchedules = useMemo(() => {
        const query = search.trim().toLowerCase();

        return (schedules ?? [])
            .filter((schedule) => {
                const matchesDay = dayFilter === 'All days' || schedule.day === dayFilter;
                const matchesLecturer = lecturerFilter === 'all' || schedule.lecturer_name === lecturerFilter;
                const matchesSearch =
                    !query ||
                    schedule.class_name.toLowerCase().includes(query) ||
                    (schedule.venue?.name ?? '').toLowerCase().includes(query) ||
                    schedule.day.toLowerCase().includes(query) ||
                    String(schedule.section).toLowerCase().includes(query) ||
                    (schedule.lecturer_name ?? '').toLowerCase().includes(query);

                return matchesDay && matchesLecturer && matchesSearch;
            })
            .sort((a, b) => {
                const weekdayDifference =
                    (dayOrder.get(a.day) ?? days.length) - (dayOrder.get(b.day) ?? days.length);
                return weekdayDifference || (a.start_time ?? '').localeCompare(b.start_time ?? '');
            });
    }, [dayFilter, lecturerFilter, schedules, search]);

    const scheduledClasses = schedules?.length ?? 0;
    const teachingDays = new Set((schedules ?? []).map((schedule) => schedule.day)).size;
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

    const lecturerOptions = useMemo(() => {
        const names = new Set<string>();

        for (const schedule of schedules ?? []) {
            const name = schedule.lecturer_name?.trim();
            if (name) names.add(name);
        }

        return [...names];
    }, [schedules]);

    return (
        <AuthenticatedLayout>
            <Head title="Class Schedules" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 lg:flex-row lg:items-end">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Class Schedules</h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Review the weekly class timetable, venue assignments, and teaching commitments.
                        </p>
                    </div>
                </section>

                <section aria-label="Schedule summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Scheduled Classes', value: scheduledClasses, icon: 'calendar' as const, tone: 'bg-blue-50 text-blue-700' },
                        { label: 'Teaching Days', value: teachingDays, icon: 'clock' as const, tone: 'bg-emerald-50 text-emerald-700' },
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

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-4 pt-3 sm:px-5">
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
                                placeholder="Search by class, section, day, lecturer, or venue"
                                className="w-full rounded-xl border-slate-200 py-2.5 pl-9 pr-3 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                        <select
                            aria-label="Filter by lecturer"
                            value={lecturerFilter}
                            onChange={(event) => setLecturerFilter(event.target.value)}
                            className="rounded-xl border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="all">All lecturers</option>
                            {lecturerOptions.map((lecturer) => (
                                <option key={lecturer} value={lecturer}>
                                    {lecturer}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => { setSearch(''); setDayFilter('All days'); setLecturerFilter('all'); }}
                            disabled={!search && dayFilter === 'All days' && lecturerFilter === 'all'}
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
                                    ? 'Create a schedule to start building the weekly timetable.'
                                    : 'Try another search or clear the filters to see the full schedule.'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <th className="px-5 py-3.5 sm:px-6" scope="col">Day</th>
                                        <th className="px-4 py-3.5" scope="col">Time</th>
                                        <th className="px-4 py-3.5" scope="col">Class</th>
                                        <th className="px-4 py-3.5" scope="col">Lecturer</th>
                                        <th className="px-5 py-3.5 text-right sm:px-6" scope="col">Venue</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {orderedSchedules.map((schedule) => (
                                        <tr key={schedule.id} className="transition hover:bg-slate-50/80">
                                            <td className="px-5 py-4 sm:px-6">
                                                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                                    {schedule.day}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-slate-700">
                                                {formatTime(schedule.start_time)} – {formatTime(schedule.end_time)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="font-semibold text-slate-900">{schedule.class_name}</p>
                                                <p className="mt-0.5 text-xs font-medium text-slate-500">Section {schedule.section}</p>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                {schedule.lecturer_name || '—'}
                                            </td>
                                            <td className="px-5 py-4 text-right sm:px-6">
                                                <span className="inline-flex items-center justify-end gap-1.5 text-sm font-medium text-slate-700">
                                                    <ScheduleIcon name="venue" className="h-4 w-4 text-slate-400" />
                                                    {schedule.venue?.name ?? 'Venue not set'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
