import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

type NavigationItem = {
    label: string;
    routeName: string;
    icon: 'dashboard' | 'venues' | 'booking' | 'calendar' | 'maintenance' | 'report' | 'users';
};

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: NavigationItem['icon'] | 'building' | 'menu' | 'close' | 'chevron';
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
        case 'building':
            return <svg {...shared}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" /></svg>;
        case 'dashboard':
            return <svg {...shared}><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></svg>;
        case 'venues':
            return <svg {...shared}><path d="M3 21h18M5 21V6h14v15M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4M8 3h8" /></svg>;
        case 'booking':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 15l2 2 5-5" /></svg>;
        case 'calendar':
            return <svg {...shared}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></svg>;
        case 'maintenance':
            return <svg {...shared}><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3z" /></svg>;
        case 'report':
            return <svg {...shared}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" /></svg>;
        case 'menu':
            return <svg {...shared}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
        case 'close':
            return <svg {...shared}><path d="m18 6-12 12M6 6l12 12" /></svg>;
        case 'chevron':
            return <svg {...shared}><path d="m9 18 6-6-6-6" /></svg>;
    }
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { user } = usePage().props.auth;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigation: NavigationItem[] = [
        { label: 'Dashboard', routeName: 'dashboard', icon: 'dashboard' },
        { label: 'Venues', routeName: 'venue', icon: 'venues' },
...(user.role === 'admin'
            ? [
                    { label: 'Maintenance', routeName: 'maintenance.index', icon: 'maintenance' as const },
                    { label: 'Create Maintenance', routeName: 'maintenance.create', icon: 'booking' as const },
                    { label: 'Maintenance Monitor', routeName: 'admin.maintenance.monitor', icon: 'maintenance' as const },
                    { label: 'Venue Reports', routeName: 'venue-reports', icon: 'report' as const },
                    { label: 'Manage Bookings', routeName: 'admin.bookings.index', icon: 'booking' as const },
              ]
                        : user.role === 'lecturer'
              ? [
                    { label: 'Book a Venue', routeName: 'booking', icon: 'booking' as const },
                    { label: 'View Bookings', routeName: 'viewbooking', icon: 'calendar' as const },
                    { label: 'Class Schedule', routeName: 'schedule', icon: 'calendar' as const },
                ]
                            : user.role === 'staff'
                                ? [
                                            { label: 'Maintenance', routeName: 'maintenance.index', icon: 'maintenance' as const },
                                            { label: 'Create Maintenance', routeName: 'maintenance.create', icon: 'booking' as const },
                                            { label: 'Venue Reports', routeName: 'venue-reports', icon: 'report' as const },
                                    ]
                                : []),
    ];

    return (
        <div className="min-h-screen bg-[#f5f7fc] text-slate-900">
            <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
                <div className="mx-auto flex min-h-[4.5rem] max-w-[1600px] items-center justify-between gap-5 px-4 sm:px-6 xl:px-8">
                    <Link href={route('dashboard')} className="flex shrink-0 items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                            <Icon name="building" className="h-6 w-6" />
                        </span>
                        <span className="hidden min-w-0 sm:block">
                            <span className="block truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                                Venue Management
                            </span>
                            <span className="block text-xs text-slate-500">Faculty of Computing &amp; Informatics</span>
                        </span>
                    </Link>

                    <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
                        <div className="flex items-center gap-1">
                            {navigation.map((item) => {
                                const active = route().current(item.routeName);

                                return (
                                    <Link
                                        key={item.routeName}
                                        href={route(item.routeName)}
                                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                            active
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <Icon name={item.icon} className="h-[18px] w-[18px]" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <div className="hidden text-right md:block">
                            <p className="max-w-36 truncate text-sm font-semibold text-slate-800">{user.name}</p>
                            <p className="text-xs capitalize text-slate-500">{user.role}</p>
                        </div>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    aria-label="Open account menu"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800 ring-2 ring-white transition hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {user.name
                                        .split(/\s+/)
                                        .map((part: string) => part[0])
                                        .slice(0, 2)
                                        .join('')
                                        .toUpperCase()}
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="py-1 bg-white shadow-lg rounded-xl ring-1 ring-slate-200">
                                <Dropdown.Link href={route('profile.edit')}>Profile settings</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={mobileMenuOpen}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 xl:hidden"
                        >
                            <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-lg xl:hidden sm:px-6">
                        <div className="mx-auto grid max-w-[1600px] gap-1 sm:grid-cols-2">
                            {navigation.map((item) => {
                                const active = route().current(item.routeName);

                                return (
                                    <Link
                                        key={item.routeName}
                                        href={route(item.routeName)}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                                            active
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <Icon name={item.icon} className="h-5 w-5" />
                                        {item.label}
                                        {active && <Icon name="chevron" className="ml-auto h-4 w-4" />}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="mx-auto mt-3 max-w-[1600px] border-t border-slate-100 pt-3 text-xs text-slate-500 sm:hidden">
                            {user.name} · <span className="capitalize">{user.role}</span>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-[1600px] px-4 py-4 text-lg font-semibold text-slate-900 sm:px-6 xl:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
