import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'venue' | 'pin' | 'users' | 'check' | 'arrow' | 'info' | 'note' | 'image' | 'plus';
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
        case 'image':
            return <svg {...shared}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>;
        case 'plus':
            return <svg {...shared}><path d="M12 5v14M5 12h14" /></svg>;
    }
}

const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20';

export default function VenueCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        location: '',
        capacity: '',
        status: 'available',
        image: '',
        info1: '',
        info2: '',
        info3: '',
        info4: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('venue-management.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Venue" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-end">
                    <div>
                        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Link href={route('venue-management.index')} className="transition hover:text-blue-700">
                                Manage Venues
                            </Link>
                            <span aria-hidden="true">/</span>
                            <span aria-current="page" className="font-semibold text-slate-800">Add Venue</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Add New Venue</h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            Fill in the details below to add a new venue to the faculty directory.
                        </p>
                    </div>
                    <Link
                        href={route('venue-management.index')}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <Icon name="arrow" className="h-4 w-4 rotate-180" />
                        Back to venues
                    </Link>
                </section>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="flex flex-col gap-4">
                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Icon name="venue" />
                                </span>
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900">Venue Details</h2>
                                    <p className="mt-1 text-sm text-slate-500">Basic information about the venue</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Venue Name <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. Bilik Kuliah"
                                        className={inputClass}
                                        aria-invalid={!!errors.name}
                                    />
                                    {errors.name && <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Location <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="e.g. N28, Level 3"
                                        className={inputClass}
                                        aria-invalid={!!errors.location}
                                    />
                                    {errors.location && <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.location}</p>}
                                </div>
                                <div>
                                    <label htmlFor="capacity" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Capacity <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        id="capacity"
                                        type="number"
                                        min="1"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        placeholder="e.g. 40"
                                        className={inputClass}
                                        aria-invalid={!!errors.capacity}
                                    />
                                    {errors.capacity && <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.capacity}</p>}
                                </div>
                                <div>
                                    <label htmlFor="status" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                        Status <span className="text-rose-600">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={inputClass}
                                        aria-invalid={!!errors.status}
                                    >
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                    {errors.status && <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">{errors.status}</p>}
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Icon name="info" />
                                </span>
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900">Facilities & Amenities</h2>
                                    <p className="mt-1 text-sm text-slate-500">List equipment and features available at this venue</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {(['info1', 'info2', 'info3', 'info4'] as const).map((field, i) => (
                                    <div key={field}>
                                        <label htmlFor={field} className="mb-1.5 block text-sm font-semibold text-slate-700">
                                            Amenity {i + 1}
                                        </label>
                                        <input
                                            id={field}
                                            type="text"
                                            value={data[field]}
                                            onChange={(e) => setData(field, e.target.value)}
                                            placeholder="e.g. Projector, Air-Conditioner, WiFi"
                                            className={inputClass}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Icon name="image" />
                                </span>
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-slate-900">Image</h2>
                                    <p className="mt-1 text-sm text-slate-500">URL path to a venue image (optional)</p>
                                </div>
                            </div>
                            <label htmlFor="image" className="mb-1.5 block text-sm font-semibold text-slate-700">
                                Image URL
                            </label>
                            <input
                                id="image"
                                type="text"
                                value={data.image}
                                onChange={(e) => setData('image', e.target.value)}
                                placeholder="e.g. /images/venue-name.jpg"
                                className={inputClass}
                            />
                        </section>
                    </div>

                    <aside className="flex flex-col gap-4 xl:sticky xl:top-6">
                        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                            <h2 className="mb-4 text-sm font-bold text-slate-900">Preview</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">{data.name || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">{data.location || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Capacity</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">{data.capacity || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
                                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-700">
                                        {data.status}
                                    </span>
                                </div>
                                {[data.info1, data.info2, data.info3, data.info4].filter(Boolean).length > 0 && (
                                    <div className="border-t border-slate-100 pt-3">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Amenities</p>
                                        <ul className="mt-2 space-y-1">
                                            {[data.info1, data.info2, data.info3, data.info4].filter(Boolean).map((info) => (
                                                <li key={info} className="flex items-center gap-1.5 text-xs text-slate-600">
                                                    <Icon name="check" className="h-3 w-3 text-emerald-600" />
                                                    {info}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>

                        <div className="flex flex-col-reverse justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
                            <p className="text-xs text-slate-500">
                                Fields marked with <span className="font-bold text-rose-600">*</span> are required.
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Icon name="plus" className="h-4 w-4" />
                                {processing ? 'Creating…' : 'Add Venue'}
                            </button>
                        </div>
                    </aside>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
