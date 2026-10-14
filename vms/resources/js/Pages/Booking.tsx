import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

interface Venue {
    id: number;
    name: string;
    location: string;
    capacity: number;
    status: string;
}

type BookingData = {
    name: string;
    email: string;
    capacity: string;
    date: string;
    start_time: string;
    end_time: string;
    comments: string;
    venue_id: string;
};

type BookingField = keyof BookingData;

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'user' | 'calendar' | 'clock' | 'venue' | 'users' | 'note' | 'check' | 'arrow' | 'info' | 'sparkles';
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
        case 'user':
            return <svg {...shared}><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></svg>;
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
        case 'clock':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
        case 'venue':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'users':
            return <svg {...shared}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'note':
            return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>;
        case 'check':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg>;
        case 'arrow':
            return <svg {...shared}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
        case 'info':
            return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
        case 'sparkles':
            return <svg {...shared}><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3ZM19 14l1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z" /></svg>;
    }
}

function FormSection({
    step,
    icon,
    title,
    description,
    children,
}: {
    step: number;
    icon: 'user' | 'calendar' | 'venue' | 'note';
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
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-700">Step {step}</p>
                    <h2 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">{title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                </div>
            </div>
            {children}
        </section>
    );
}

function FieldError({ message }: { message?: string }) {
    return message ? (
        <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
            {message}
        </p>
    ) : null;
}

const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export default function Booking() {
    const { props } = usePage();
    const user = props.auth.user;
    const [venues, setVenues] = useState<Venue[]>([]);
    const [venuesLoading, setVenuesLoading] = useState(true);
    const [venuesError, setVenuesError] = useState('');
    const [availabilityError, setAvailabilityError] = useState('');
    const [suggestions, setSuggestions] = useState<Venue[]>([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<BookingField, string>>>({});
    const suggestionRequest = useRef(0);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const { data } = await axios.get<Venue[]>('/api/venues');
                setVenues(data);
                setVenuesLoading(false);
            } catch (error) {
                console.error('Unable to fetch venues:', error);
                setVenuesError('Could not load venues. Please refresh the page.');
                setVenuesLoading(false);
            }
        };
        fetchVenues();
    }, []);

    const {
        data,
        setData,
        reset,
    } = useForm<BookingData>({
        name: user.name,
        email: user.email,
        capacity: '',
        date: '',
        start_time: '',
        end_time: '',
        comments: '',
        venue_id: '',
    });

    const selectedVenue = venues.find((venue) => String(venue.id) === data.venue_id) ?? null;
    const capacity = Number(data.capacity);
    const capacityPercentage =
        selectedVenue && capacity > 0
            ? Math.min(100, Math.round((capacity / selectedVenue.capacity) * 100))
            : 0;
    const duration = useMemo(() => {
        if (!data.start_time || !data.end_time || data.end_time <= data.start_time) return null;
        const [startHour, startMinute] = data.start_time.split(':').map(Number);
        const [endHour, endMinute] = data.end_time.split(':').map(Number);
        const minutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);
        return `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}`;
    }, [data.end_time, data.start_time]);

    const clearFieldError = (field: BookingField) => {
        setFieldErrors((current) => ({ ...current, [field]: undefined }));
        setSubmitError('');
        setSubmitMessage('');
    };

    const updateField = (field: BookingField, value: string) => {
        setData(field, value);
        clearFieldError(field);
        if (field === 'date' || field === 'start_time' || field === 'end_time') {
            setSuggestions([]);
        }
    };

    const checkVenueAvailability = async (
        venueId: number,
        date: string,
        startTime: string,
        endTime: string,
    ): Promise<boolean> => {
        const { data: response } = await axios.post<{ success: boolean }>('/api/bookings/check-time', {
            venue_id: venueId,
            date,
            start_time: startTime,
            end_time: endTime,
        });
        if (typeof response.success !== 'boolean') {
            throw new Error('Unexpected availability response');
        }
        return response.success;
    };

    const findSuggestedVenues = async () => {
        setAvailabilityError('');
        setSuggestions([]);
        setData('venue_id', '');
        clearFieldError('venue_id');

        if (!data.capacity || Number(data.capacity) < 1 || !data.date || !data.start_time || !data.end_time) {
            setAvailabilityError('Enter the expected attendance, date, start time, and end time before checking venues.');
            return;
        }
        if (data.end_time <= data.start_time) {
            setAvailabilityError('End time must be later than start time.');
            return;
        }

        const requestId = ++suggestionRequest.current;
        setSuggestionsLoading(true);
        const fittingVenues = venues
            .filter((venue) => venue.capacity >= Number(data.capacity))
            .sort((first, second) => first.capacity - second.capacity);

        if (fittingVenues.length === 0) {
            setAvailabilityError('No venues have enough capacity for this group. Try a smaller attendance number.');
            setSuggestionsLoading(false);
            return;
        }

        try {
            const results = await Promise.all(
                fittingVenues.map(async (venue) => ({
                    venue,
                    available: await checkVenueAvailability(
                        venue.id,
                        data.date,
                        data.start_time,
                        data.end_time,
                    ),
                })),
            );
            if (suggestionRequest.current === requestId) {
                setSuggestions(results.filter((result) => result.available).map((result) => result.venue));
                if (results.every((result) => !result.available)) {
                    setAvailabilityError('No matching venues are available for this date and time.');
                }
            }
        } catch (error) {
            console.error('Unable to check venue availability:', error);
            if (suggestionRequest.current === requestId) {
                setAvailabilityError('Venue availability could not be checked. Please try again.');
            }
        } finally {
            if (suggestionRequest.current === requestId) {
                setSuggestionsLoading(false);
            }
        }
    };

    const handleReset = () => {
        reset();
        setSuggestions([]);
        setAvailabilityError('');
        setSubmitError('');
        setSubmitMessage('');
        setFieldErrors({});
    };

    const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError('');
        setSubmitMessage('');
        setFieldErrors({});

        if (!data.venue_id) {
            setFieldErrors({ venue_id: 'Choose a venue before submitting your request.' });
            return;
        }
        if (data.end_time <= data.start_time) {
            setFieldErrors({ end_time: 'End time must be later than start time.' });
            return;
        }

        setSubmitting(true);
        try {
            const isAvailable = await checkVenueAvailability(
                Number(data.venue_id),
                data.date,
                data.start_time,
                data.end_time,
            );
            if (!isAvailable) {
                setFieldErrors({ venue_id: 'This venue is no longer available for the selected time.' });
                setSubmitting(false);
                return;
            }

            const { data: response } = await axios.post<{ success: boolean; message?: string }>('/bookings', data);
            if (!response.success) {
                setSubmitError(response.message || 'The booking request could not be submitted.');
                return;
            }
            setSubmitMessage(response.message || 'Booking request submitted successfully.');
            reset();
            setSuggestions([]);
            setFieldErrors({});
        } catch (error: unknown) {
            console.error('Unable to submit booking:', error);
            if (axios.isAxiosError<{ errors?: Record<string, string[]>; message?: string }>(error)) {
                const validationErrors = error.response?.data?.errors;
                if (validationErrors) {
                    setFieldErrors(
                        Object.fromEntries(
                            Object.entries(validationErrors).map(([field, messages]) => [
                                field,
                                messages[0],
                            ]),
                        ) as Partial<Record<BookingField, string>>,
                    );
                } else {
                    setSubmitError(error.response?.data?.message || 'The booking request could not be submitted. Please try again.');
                }
            } else {
                setSubmitError('The booking request could not be submitted. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const today = new Date();
    const todayValue = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
    ].join('-');
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowValue = [
        tomorrow.getFullYear(),
        String(tomorrow.getMonth() + 1).padStart(2, '0'),
        String(tomorrow.getDate()).padStart(2, '0'),
    ].join('-');

    return (
        <AuthenticatedLayout>
            <Head title="Book a Venue" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-end">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
                            Venue management
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Book a Faculty Venue
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Find a space that fits your group and submit a booking request for your session.
                        </p>
                    </div>
                    <Link
                        href={route('viewbooking')}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <Icon name="calendar" className="h-4 w-4" />
                        View my bookings
                    </Link>
                </section>

                {submitMessage && (
                    <div role="status" className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                        <p>{submitMessage}</p>
                    </div>
                )}
                {submitError && (
                    <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                        {submitError}
                    </div>
                )}

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                    <section className="flex flex-col gap-5 lg:col-span-8">
                        <form onSubmit={handleBookingSubmit} className="flex flex-col gap-5">
                            <FormSection
                                step={1}
                                icon="user"
                                title="Requester details"
                                description="Confirm the contact information for this reservation."
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Full name <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            maxLength={255}
                                            value={data.name}
                                            onChange={(event) => updateField('name', event.target.value)}
                                            className={inputClass}
                                        />
                                        <FieldError message={fieldErrors.name} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Faculty email <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={data.email}
                                            onChange={(event) => updateField('email', event.target.value)}
                                            className={inputClass}
                                        />
                                        <FieldError message={fieldErrors.email} />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50/70 px-3.5 py-3 text-xs leading-5 text-blue-800">
                                    <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
                                    Booking updates will be associated with your account and sent to the email above.
                                </div>
                            </FormSection>

                            <FormSection
                                step={2}
                                icon="calendar"
                                title="Session schedule"
                                description="Choose the date and time for your booking request."
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label htmlFor="date" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Booking date <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            id="date"
                                            type="date"
                                            min={todayValue}
                                            required
                                            value={data.date}
                                            onChange={(event) => updateField('date', event.target.value)}
                                            className={inputClass}
                                        />
                                        <div className="mt-2 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => updateField('date', todayValue)}
                                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                                            >
                                                Today
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => updateField('date', tomorrowValue)}
                                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                                            >
                                                Tomorrow
                                            </button>
                                        </div>
                                        <FieldError message={fieldErrors.date} />
                                    </div>
                                    <div>
                                        <label htmlFor="start_time" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Start time <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            id="start_time"
                                            type="time"
                                            required
                                            value={data.start_time}
                                            onChange={(event) => updateField('start_time', event.target.value)}
                                            className={inputClass}
                                        />
                                        <FieldError message={fieldErrors.start_time} />
                                    </div>
                                    <div>
                                        <label htmlFor="end_time" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            End time <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            id="end_time"
                                            type="time"
                                            min={data.start_time || undefined}
                                            required
                                            value={data.end_time}
                                            onChange={(event) => updateField('end_time', event.target.value)}
                                            className={inputClass}
                                        />
                                        <FieldError message={fieldErrors.end_time} />
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                                    <p className="text-xs text-slate-500">
                                        Availability is checked against existing bookings for the selected slot.
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                                        <Icon name="clock" className="h-4 w-4 text-blue-700" />
                                        Duration: {duration || '—'}
                                    </span>
                                </div>
                            </FormSection>

                            <FormSection
                                step={3}
                                icon="venue"
                                title="Venue and attendance"
                                description="Select a venue that can accommodate the expected attendance."
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                    <div className="md:col-span-8">
                                        <label htmlFor="venue_id" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Venue <span className="text-rose-600">*</span>
                                        </label>
                                        <select
                                            id="venue_id"
                                            required
                                            value={data.venue_id}
                                            onChange={(event) => {
                                                updateField('venue_id', event.target.value);
                                                setSuggestions([]);
                                            }}
                                            disabled={venuesLoading || venues.length === 0}
                                            className={inputClass}
                                        >
                                            <option value="">
                                                {venuesLoading ? 'Loading venues…' : 'Choose a venue'}
                                            </option>
                                            {venues.map((venue) => (
                                                <option key={venue.id} value={venue.id}>
                                                    {venue.name} · Capacity {venue.capacity} · {venue.location}
                                                </option>
                                            ))}
                                        </select>
                                        <FieldError message={fieldErrors.venue_id} />
                                        {venuesError && <p role="alert" className="mt-1.5 text-xs text-rose-700">{venuesError}</p>}
                                    </div>
                                    <div className="md:col-span-4">
                                        <label htmlFor="capacity" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Expected attendance <span className="text-rose-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="capacity"
                                                type="number"
                                                min="1"
                                                required
                                                value={data.capacity}
                                                onChange={(event) => updateField('capacity', event.target.value)}
                                                placeholder="Number of people"
                                                className={`${inputClass} pr-14`}
                                            />
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                                people
                                            </span>
                                        </div>
                                        <FieldError message={fieldErrors.capacity} />
                                    </div>
                                    {selectedVenue && (
                                        <div className="md:col-span-12">
                                            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3">
                                                <div className="flex items-center gap-2 text-sm text-slate-700">
                                                    <Icon name="venue" className="h-4 w-4 text-blue-700" />
                                                    <span className="font-semibold">{selectedVenue.location}</span>
                                                </div>
                                                <span className="text-xs text-slate-500">
                                                    Capacity: {capacity > selectedVenue.capacity
                                                        ? `Over limit by ${capacity - selectedVenue.capacity}`
                                                        : `${capacity || 0} of ${selectedVenue.capacity} seats`}
                                                </span>
                                            </div>
                                            {capacity > 0 && (
                                                <div className="mt-3">
                                                    <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                                                        <span>Venue capacity used</span>
                                                        <span className={capacity > selectedVenue.capacity ? 'font-semibold text-rose-700' : 'font-semibold text-slate-700'}>
                                                            {capacityPercentage}%
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="h-2 overflow-hidden rounded-full bg-slate-100"
                                                        role="progressbar"
                                                        aria-label="Expected attendance compared with venue capacity"
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        aria-valuenow={capacityPercentage}
                                                    >
                                                        <div
                                                            className={`h-full rounded-full transition-all ${capacity > selectedVenue.capacity ? 'bg-rose-500' : 'bg-gradient-to-r from-blue-700 to-cyan-500'}`}
                                                            style={{ width: `${capacityPercentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Find a suitable venue</p>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            We’ll check available rooms that meet your group size.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={findSuggestedVenues}
                                        disabled={suggestionsLoading || venuesLoading || venues.length === 0}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Icon name="sparkles" className="h-4 w-4" />
                                        {suggestionsLoading ? 'Checking availability…' : 'Find available venues'}
                                    </button>
                                </div>
                                {availabilityError && (
                                    <p role="alert" className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-900">
                                        {availabilityError}
                                    </p>
                                )}
                                {suggestions.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Available matches
                                        </p>
                                        {suggestions.map((venue) => (
                                            <button
                                                key={venue.id}
                                                type="button"
                                                onClick={() => {
                                                    setData('venue_id', String(venue.id));
                                                    setFieldErrors((current) => ({ ...current, venue_id: undefined }));
                                                    setAvailabilityError('');
                                                }}
                                                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                                                    data.venue_id === String(venue.id)
                                                        ? 'border-emerald-300 bg-emerald-50'
                                                        : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50'
                                                }`}
                                            >
                                                <span className="min-w-0">
                                                    <span className="block truncate text-sm font-semibold text-slate-900">
                                                        {venue.name}
                                                    </span>
                                                    <span className="mt-0.5 block text-xs text-slate-500">
                                                        {venue.location} · Up to {venue.capacity} people
                                                    </span>
                                                </span>
                                                <span className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                                                    data.venue_id === String(venue.id)
                                                        ? 'bg-emerald-700 text-white'
                                                        : 'bg-blue-700 text-white'
                                                }`}>
                                                    {data.venue_id === String(venue.id) ? 'Selected' : 'Select'}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {venues.length === 0 && !venuesLoading && !venuesError && (
                                    <p className="mt-3 text-sm text-slate-500">There are no venues available to book.</p>
                                )}
                            </FormSection>

                            <FormSection
                                step={4}
                                icon="note"
                                title="Additional information"
                                description="Add any notes the venue team should know about your session."
                            >
                                <label htmlFor="comments" className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Comments <span className="font-normal text-slate-400">(optional)</span>
                                </label>
                                <textarea
                                    id="comments"
                                    rows={4}
                                    maxLength={500}
                                    value={data.comments}
                                    onChange={(event) => updateField('comments', event.target.value)}
                                    placeholder="Share setup requirements or other notes for the venue team."
                                    className={`${inputClass} resize-y`}
                                />
                                <div className="mt-1 flex justify-between text-xs text-slate-400">
                                    <FieldError message={fieldErrors.comments} />
                                    <span className="ml-auto">{data.comments.length}/500</span>
                                </div>
                            </FormSection>

                            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                                <p className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                                    <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                                    Your request will be reviewed by the venue team. Availability is checked again before submission.
                                </p>
                                <div className="flex shrink-0 items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                    >
                                        Reset form
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting || venuesLoading || venues.length === 0}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {submitting ? 'Submitting…' : 'Submit request'}
                                        {!submitting && <Icon name="arrow" className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>

                    <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-4">
                        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-5 text-white">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-100">
                                        <Icon name="venue" />
                                    </span>
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        selectedVenue
                                            ? 'bg-white/10 text-blue-100'
                                            : 'bg-white/10 text-slate-300'
                                    }`}>
                                        {selectedVenue ? 'Selected venue' : 'Booking summary'}
                                    </span>
                                </div>
                                <h2 className="mt-5 text-xl font-bold tracking-tight">
                                    {selectedVenue?.name || 'Your venue'}
                                </h2>
                                <p className="mt-1 text-sm text-slate-300">
                                    {selectedVenue?.location || 'Choose a venue to see its details here'}
                                </p>
                            </div>
                            <div className="space-y-4 p-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                                        <p className="text-xs text-slate-500">Capacity</p>
                                        <p className="mt-1 text-sm font-bold text-slate-900">
                                            {selectedVenue ? `${selectedVenue.capacity} people` : '—'}
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                                        <p className="text-xs text-slate-500">Attendance</p>
                                        <p className="mt-1 text-sm font-bold text-slate-900">
                                            {data.capacity ? `${data.capacity} people` : '—'}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-100 p-3.5">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                            <Icon name="calendar" className="h-4 w-4" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-slate-800">
                                                {data.date
                                                    ? new Intl.DateTimeFormat('en', {
                                                          weekday: 'long',
                                                          month: 'long',
                                                          day: 'numeric',
                                                          year: 'numeric',
                                                      }).format(new Date(`${data.date}T00:00:00`))
                                                    : 'Date not selected'}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {data.start_time || '—'} – {data.end_time || '—'}
                                                {duration ? ` · ${duration}` : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {selectedVenue && capacity > selectedVenue.capacity && (
                                    <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs leading-5 text-rose-800">
                                        Attendance exceeds the capacity of this venue. Choose a larger venue or lower the expected attendance.
                                    </p>
                                )}

                                {selectedVenue && capacity <= selectedVenue.capacity && capacity > 0 && (
                                    <p className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                                        <Icon name="check" className="h-4 w-4" />
                                        This venue can accommodate your group.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Icon name="check" className="h-5 w-5 text-blue-700" />
                                <h2 className="font-bold text-slate-900">What happens next</h2>
                            </div>
                            <ol className="space-y-4">
                                {[
                                    ['Submit your request', 'We validate your details and check the venue slot.'],
                                    ['Booking review', 'The venue team reviews the request and follows up with you.'],
                                    ['Confirmation', 'Your booking status will be available in your booking history.'],
                                ].map(([title, description], index) => (
                                    <li key={title} className="flex gap-3">
                                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                            index === 0 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {index + 1}
                                        </span>
                                        <span>
                                            <span className="block text-sm font-semibold text-slate-800">{title}</span>
                                            <span className="mt-0.5 block text-xs leading-5 text-slate-500">{description}</span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                                <Icon name="info" />
                            </span>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">Booking guidelines</h2>
                                <p className="mt-1 text-xs leading-5 text-slate-600">
                                    Submit accurate attendance and schedule details. A request is not confirmed until it has been reviewed.
                                </p>
                                <Link
                                    href={route('viewbooking')}
                                    className="mt-2 inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900"
                                >
                                    Check booking history
                                </Link>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
