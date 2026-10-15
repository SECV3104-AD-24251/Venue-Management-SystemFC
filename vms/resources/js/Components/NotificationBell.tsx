import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface Notification {
    id: string;
    type: string;
    data: {
        booking_id: number;
        venue_name: string;
        date: string;
        start_time: string;
        end_time: string;
        status?: string;
        message: string;
        rejection_reason?: string;
    };
    read_at: string | null;
    created_at: string;
}



function BellIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    );
}

export default function NotificationBell() {
    const { user } = usePage().props.auth;
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [connected, setConnected] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const subscribedRef = useRef(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (!user || subscribedRef.current) return;

        const echo = (window as any).Echo;
        if (!echo) {
            console.warn('Echo not initialized. Real-time notifications disabled.');
            return;
        }

        subscribedRef.current = true;

        echo.private(`App.Models.User.${user.id}`)
            .notification((notification: Notification) => {
                setNotifications((prev) => {
                    const exists = prev.some((n) => n.id === notification.id);
                    if (exists) return prev;
                    return [notification, ...prev];
                });
                setUnreadCount((prev) => prev + 1);
            })
            .subscribed(() => {
                setConnected(true);
            })
            .error((error: any) => {
                console.error('Pusher subscription error:', error);
                setConnected(false);
            });

        return () => {
            subscribedRef.current = false;
            echo.leave(`App.Models.User.${user.id}`);
        };
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications', {
                headers: { Accept: 'application/json' },
            });
            if (!response.ok) return;
            const data = await response.json();
            setNotifications(data.notifications || []);
            setUnreadCount((data.notifications || []).filter((n: Notification) => !n.read_at).length);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const response = await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
            if (!response.ok) throw new Error('Failed to mark as read');
            setNotifications((prev) =>
                prev.map((n) => {
                    if (n.id !== id) return n;
                    const updated = { ...n, read_at: new Date().toISOString() };
                    return updated;
                })
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch('/api/notifications/read-all', { method: 'POST' });
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, read_at: new Date().toISOString() }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                aria-expanded={dropdownOpen}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <BellIcon />
                {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
                {connected && (
                    <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                )}
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-96">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                        <div>
                            <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
                            {unreadCount > 0 && (
                                <p className="text-xs text-slate-500">{unreadCount} unread</p>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-10 text-center">
                                <BellIcon className="mx-auto h-8 w-8 text-slate-300" />
                                <p className="mt-2 text-sm text-slate-500">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.slice(0, 10).map((notification) => (
                                <button
                                    key={notification.id}
                                    type="button"
                                    onClick={() => markAsRead(notification.id)}
                                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${
                                        !notification.read_at ? 'bg-blue-50/50' : ''
                                    }`}
                                >
                                    <span
                                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                            notification.data.status === 'approved'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : notification.data.status === 'rejected'
                                                ? 'bg-rose-100 text-rose-700'
                                                : 'bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        {notification.data.status === 'approved' ? (
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        ) : notification.data.status === 'rejected' ? (
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                        ) : (
                                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                        )}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-slate-900">{notification.data.venue_name}</p>
                                        <p className="mt-0.5 text-xs text-slate-600">{notification.data.message}</p>
                                        <p className="mt-1 text-xs text-slate-400">{formatTime(notification.created_at)}</p>
                                    </div>
                                    {!notification.read_at && (
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
