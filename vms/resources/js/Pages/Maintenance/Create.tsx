import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Venue {
    id: number;
    name: string;
    capacity?: number;
    location?: string;
    status?: string | null;
}

interface MaintenanceData {
    venue_id: string;
    description: string;
    scheduled_for_date: string;
    scheduled_for_time: string;
}

type MaintenanceField = keyof MaintenanceData;
type FieldErrors = Partial<Record<MaintenanceField, string>>;

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'maintenance' | 'venue' | 'calendar' | 'clock' | 'pin' | 'users' | 'check' | 'arrow' | 'info' | 'note';
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
            return <svg {...shared}><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z" /><path d="m5 19 1 1" /></svg>;
        case 'venue':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'pin':
            return <svg {...shared}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
        case 'users':
            return <svg {...shared}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'arrow':
            return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
        case 'info':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
        case 'note':
            return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>;
    }
}

function FormSection({
    number,
    icon,
    title,
    description,
    children,
}: {
    number: number;
    icon: 'venue' | 'calendar' | 'note';
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon name={icon} />
                </span>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-700">Step {number}</p>
                    <h2 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">{title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                </div>
            </div>
            {children}
        </section>
    );
}

function FieldError({ message }: { message?: string }) {
    return message ? <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{message}</p> : null;
}

const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-50';

export default function MaintenanceCreate() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loadingVenues, setLoadingVenues] = useState(true);
    const [venuesError, setVenuesError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [data, setData] = useState<MaintenanceData>({
        venue_id: '',
        description: '',
        scheduled_for_date: '',
        scheduled_for_time: '',
    });

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get<Venue[]>('/api/venues');
                if (!Array.isArray(response.data)) {
                    throw new Error('The venues response was not a list.');
                }
                setVenues(response.data);
            } catch (error) {
                console.error('Error fetching venues:', error);
                setVenuesError('Venues could not be loaded. Please try again.');
            } finally {
                setLoadingVenues(false);
            }
        };

        void fetchVenues();
    }, []);

    const selectedVenue = venues.find((venue) => String(venue.id) === data.venue_id);

    const updateField = (field: MaintenanceField, value: string) => {
        setData((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
        setSubmitError('');
    };

    const validateForm = () => {
        const nextErrors: FieldErrors = {};
        if (!data.venue_id) nextErrors.venue_id = 'Select a venue for this maintenance job.';
        if (!data.description.trim()) nextErrors.description = 'Enter a description of the maintenance work.';
        if (!data.scheduled_for_date) nextErrors.scheduled_for_date = 'Select a scheduled date.';
        if (!data.scheduled_for_time) nextErrors.scheduled_for_time = 'Select a scheduled time.';
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError('');
        if (!validateForm()) return;

        if (!window.confirm('Are you sure you want to create this maintenance job?')) return;

        setSubmitting(true);
        try {
            const response = await axios.post('/maintenance', data);
            if (response.data?.success === false) {
                setSubmitError(response.data.message || 'The maintenance job could not be created.');
                return;
            }

            window.alert('Maintenance job created successfully!');
            setData({
                venue_id: '',
                description: '',
                scheduled_for_date: '',
                scheduled_for_time: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Error submitting maintenance job:', error);
            setSubmitError('The maintenance job could not be created. Please check your details and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Maintenance" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Create Maintenance Job
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Select a venue, describe the work required, and set the maintenance schedule.
                        </p>
                    </div>
                    <Link
                        href={route('maintenance.index')}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <Icon name="arrow" className="h-4 w-4 rotate-180" />
                        Back to maintenance
                    </Link>
                </section>

                <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        {submitError && (
                            <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                                <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0" />
                                <p>{submitError}</p>
                            </div>
                        )}

                        <FormSection
                            number={1}
                            icon="venue"
                            title="Choose a venue"
                            description="Select the venue where maintenance is needed."
                        >
                            <label htmlFor="venue_id" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Venue <span className="text-rose-600">*</span>
                            </label>
                            <select
                                id="venue_id"
                                name="venue_id"
                                value={data.venue_id}
                                onChange={(event) => updateField('venue_id', event.target.value)}
                                disabled={loadingVenues || venues.length === 0}
                                aria-invalid={Boolean(errors.venue_id)}
                                aria-describedby={errors.venue_id ? 'venue_id-error' : undefined}
                                className={inputClass}
                            >
                                <option value="">
                                    {loadingVenues ? 'Loading venues…' : venues.length ? 'Select a venue' : 'No venues available'}
                                </option>
                                {venues.map((venue) => (
                                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                                ))}
                            </select>
                            {errors.venue_id && <div id="venue_id-error"><FieldError message={errors.venue_id} /></div>}
                            {venuesError ? (
                                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-700">
                                    <span>{venuesError}</span>
                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="font-semibold underline underline-offset-2"
                                    >
                                        Refresh page
                                    </button>
                                </div>
                            ) : (
                                !loadingVenues && venues.length === 0 && (
                                    <p className="mt-2 text-xs text-slate-500">There are no venues to select.</p>
                                )
                            )}
                        </FormSection>

                        <FormSection
                            number={2}
                            icon="note"
                            title="Describe the work"
                            description="Add clear details to help the maintenance team understand the request."
                        >
                            <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Maintenance description <span className="text-rose-600">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                value={data.description}
                                onChange={(event) => updateField('description', event.target.value)}
                                placeholder="Describe the issue or maintenance work required…"
                                aria-invalid={Boolean(errors.description)}
                                aria-describedby={errors.description ? 'description-error' : undefined}
                                className={`${inputClass} min-h-32 resize-y`}
                            />
                            {errors.description && <div id="description-error"><FieldError message={errors.description} /></div>}
                        </FormSection>

                        <FormSection
                            number={3}
                            icon="calendar"
                            title="Set the schedule"
                            description="Choose when the maintenance job should be scheduled."
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="scheduled_for_date" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Scheduled date <span className="text-rose-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <Icon name="calendar" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="scheduled_for_date"
                                            name="scheduled_for_date"
                                            type="date"
                                            value={data.scheduled_for_date}
                                            onChange={(event) => updateField('scheduled_for_date', event.target.value)}
                                            aria-invalid={Boolean(errors.scheduled_for_date)}
                                            aria-describedby={errors.scheduled_for_date ? 'scheduled_for_date-error' : undefined}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                    {errors.scheduled_for_date && <div id="scheduled_for_date-error"><FieldError message={errors.scheduled_for_date} /></div>}
                                </div>
                                <div>
                                    <label htmlFor="scheduled_for_time" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Scheduled time <span className="text-rose-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <Icon name="clock" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="scheduled_for_time"
                                            name="scheduled_for_time"
                                            type="time"
                                            value={data.scheduled_for_time}
                                            onChange={(event) => updateField('scheduled_for_time', event.target.value)}
                                            aria-invalid={Boolean(errors.scheduled_for_time)}
                                            aria-describedby={errors.scheduled_for_time ? 'scheduled_for_time-error' : undefined}
                                            className={`${inputClass} pl-9`}
                                        />
                                    </div>
                                    {errors.scheduled_for_time && <div id="scheduled_for_time-error"><FieldError message={errors.scheduled_for_time} /></div>}
                                </div>
                            </div>
                        </FormSection>

                        <div className="flex flex-col-reverse justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
                            <p className="text-xs text-slate-500">
                                Fields marked with <span className="font-bold text-rose-600">*</span> are required.
                            </p>
                            <button
                                type="submit"
                                disabled={submitting || loadingVenues || venues.length === 0}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Icon name="check" className="h-4 w-4" />
                                {submitting ? 'Creating job…' : 'Create maintenance job'}
                            </button>
                        </div>
                    </form>

                    <aside className="flex flex-col gap-4 xl:sticky xl:top-6">
                        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 p-5">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Icon name="maintenance" />
                                </span>
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900">Job overview</h2>
                                    <p className="text-xs text-slate-500">Details from this form</p>
                                </div>
                            </div>
                            <div className="space-y-4 p-5">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Venue</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {selectedVenue?.name || 'Choose a venue'}
                                    </p>
                                    {selectedVenue?.location && (
                                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                            <Icon name="pin" className="h-3.5 w-3.5 shrink-0" />
                                            {selectedVenue.location}
                                        </p>
                                    )}
                                </div>
                                {selectedVenue?.capacity !== undefined && (
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Icon name="users" className="h-4 w-4 text-slate-400" />
                                        Capacity: <span className="font-semibold text-slate-800">{selectedVenue.capacity}</span>
                                    </div>
                                )}
                                {selectedVenue?.status && (
                                    <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                                        <span className="text-slate-500">Venue status</span>
                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold capitalize text-slate-700">
                                            {selectedVenue.status}
                                        </span>
                                    </div>
                                )}
                                <div className="border-t border-slate-100 pt-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scheduled for</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {data.scheduled_for_date || 'Date not set'}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {data.scheduled_for_time || 'Time not set'}
                                    </p>
                                </div>
                                <div className="border-t border-slate-100 pt-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</p>
                                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-5 text-slate-700">
                                        {data.description.trim() || 'Your maintenance notes will appear here.'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                            <div className="flex items-start gap-2.5">
                                <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900">Before you submit</h2>
                                    <p className="mt-1 text-xs leading-5 text-slate-600">
                                        Check that the venue, work description, date, and time are correct. You’ll be asked to confirm before the job is created.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
