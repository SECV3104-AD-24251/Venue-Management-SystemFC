import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

interface VenueReportRow {
    venue_id: number;
    venue_name: string;
    location: string;
}

interface BookingReport extends VenueReportRow {
    total_bookings: number;
}

interface MaintenanceReport extends VenueReportRow {
    total_maintenance: number;
}

interface CompletionReport extends VenueReportRow {
    completed_maintenance: number;
    total_tasks: number;
    completion_rate: number;
}

interface UtilizationReport extends VenueReportRow {
    total_hours_booked: number;
}

interface Props {
    summary: {
        totalVenues: number;
        totalBookings: number;
        totalMaintenance: number;
        completedMaintenance: number;
    };
    mostUsedVenues: BookingReport[];
    mostMaintainedVenues: MaintenanceReport[];
    maintenanceCompletion: CompletionReport[];
    venueUtilization: UtilizationReport[];
}

function ReportSection({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <h2 className="text-base font-bold tracking-tight text-slate-900">{title}</h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
            {children}
        </section>
    );
}

function EmptyReport({ message }: { message: string }) {
    return <p className="px-5 py-10 text-center text-sm text-slate-500">{message}</p>;
}

function TableFrame({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
                {children}
            </table>
        </div>
    );
}

function TableHeader({ columns }: { columns: string[] }) {
    return (
        <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {columns.map((column, index) => (
                    <th key={column} className={`px-5 py-3 ${index > 1 ? 'text-right' : ''}`}>
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function VenueCells({ venue }: { venue: VenueReportRow }) {
    return (
        <>
            <td className="px-5 py-4">
                <p className="font-semibold text-slate-900">{venue.venue_name}</p>
            </td>
            <td className="px-5 py-4 text-sm text-slate-600">{venue.location}</td>
        </>
    );
}

export default function VenueReports({
    summary,
    mostUsedVenues,
    mostMaintainedVenues,
    maintenanceCompletion,
    venueUtilization,
}: Props) {
    const summaryCards = [
        { label: 'Total Venues', value: summary.totalVenues, tone: 'bg-slate-100 text-slate-700' },
        { label: 'Total Bookings', value: summary.totalBookings, tone: 'bg-blue-50 text-blue-700' },
        { label: 'Maintenance Tasks', value: summary.totalMaintenance, tone: 'bg-amber-50 text-amber-700' },
        { label: 'Completed Tasks', value: summary.completedMaintenance, tone: 'bg-emerald-50 text-emerald-700' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Venue Reports" />
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8 xl:px-8">
                <section className="border-b border-slate-200/80 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Venue Reports</h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        Review booking activity, venue utilization, and maintenance progress across your venues.
                    </p>
                </section>

                <section aria-label="Report summary" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {summaryCards.map((card) => (
                        <article key={card.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{card.label}</p>
                            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                {card.value.toLocaleString()}
                            </p>
                            <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${card.tone}`}>
                                All venues
                            </span>
                        </article>
                    ))}
                </section>

                {summary.totalVenues === 0 ? (
                    <section className="rounded-2xl border border-slate-200/80 bg-white px-5 py-14 text-center shadow-sm">
                        <h2 className="text-base font-bold text-slate-900">No venue data yet</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Reports will be available after venues have been added.
                        </p>
                    </section>
                ) : (
                    <div className="grid gap-6 xl:grid-cols-2">
                        <ReportSection
                            title="Most Used Venues"
                            description="Venues ranked by total booking requests."
                        >
                            {mostUsedVenues.length === 0 ? <EmptyReport message="No booking data is available." /> : (
                                <TableFrame>
                                    <TableHeader columns={['Venue', 'Location', 'Bookings']} />
                                    <tbody className="divide-y divide-slate-100">
                                        {mostUsedVenues.map((venue) => (
                                            <tr key={venue.venue_id} className="transition hover:bg-slate-50/70">
                                                <VenueCells venue={venue} />
                                                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">
                                                    {venue.total_bookings.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableFrame>
                            )}
                        </ReportSection>

                        <ReportSection
                            title="Maintenance by Venue"
                            description="Venues ranked by the number of maintenance tasks."
                        >
                            {mostMaintainedVenues.length === 0 ? <EmptyReport message="No maintenance data is available." /> : (
                                <TableFrame>
                                    <TableHeader columns={['Venue', 'Location', 'Tasks']} />
                                    <tbody className="divide-y divide-slate-100">
                                        {mostMaintainedVenues.map((venue) => (
                                            <tr key={venue.venue_id} className="transition hover:bg-slate-50/70">
                                                <VenueCells venue={venue} />
                                                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">
                                                    {venue.total_maintenance.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableFrame>
                            )}
                        </ReportSection>

                        <ReportSection
                            title="Maintenance Completion"
                            description="Completed tasks and completion rate for each venue."
                        >
                            {maintenanceCompletion.length === 0 ? <EmptyReport message="No maintenance data is available." /> : (
                                <TableFrame>
                                    <TableHeader columns={['Venue', 'Location', 'Completed', 'Total', 'Rate']} />
                                    <tbody className="divide-y divide-slate-100">
                                        {maintenanceCompletion.map((venue) => (
                                            <tr key={venue.venue_id} className="transition hover:bg-slate-50/70">
                                                <VenueCells venue={venue} />
                                                <td className="px-5 py-4 text-right text-sm text-slate-700">{venue.completed_maintenance}</td>
                                                <td className="px-5 py-4 text-right text-sm text-slate-700">{venue.total_tasks}</td>
                                                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">
                                                    {venue.completion_rate}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableFrame>
                            )}
                        </ReportSection>

                        <ReportSection
                            title="Venue Utilization"
                            description="Total hours represented by recorded booking requests."
                        >
                            {venueUtilization.length === 0 ? <EmptyReport message="No utilization data is available." /> : (
                                <TableFrame>
                                    <TableHeader columns={['Venue', 'Location', 'Hours Booked']} />
                                    <tbody className="divide-y divide-slate-100">
                                        {venueUtilization.map((venue) => (
                                            <tr key={venue.venue_id} className="transition hover:bg-slate-50/70">
                                                <VenueCells venue={venue} />
                                                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">
                                                    {Number(venue.total_hours_booked).toLocaleString(undefined, {
                                                        maximumFractionDigits: 1,
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableFrame>
                            )}
                        </ReportSection>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
