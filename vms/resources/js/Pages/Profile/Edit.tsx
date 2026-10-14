import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

function Icon({
    name,
    className = 'h-5 w-5',
}: {
    name: 'user' | 'lock' | 'shield' | 'check';
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
        case 'lock':
            return <svg {...shared}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" /></svg>;
        case 'shield':
            return <svg {...shared}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /></svg>;
        case 'check':
            return <svg {...shared}><path d="m5 12 4 4L19 6" /></svg>;
    }
}

function SectionHeader({
    icon,
    title,
    description,
}: {
    icon: 'user' | 'lock';
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon name={icon} />
            </span>
            <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900">{title}</h2>
                <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
            </div>
        </div>
    );
}

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const user = usePage().props.auth.user;
    const role = user.level === '1' ? 'Admin' : user.level === '2' ? 'Lecturer' : 'Staff';
    const emailVerified = Boolean(user.email_verified_at);

    return (
        <AuthenticatedLayout>
            <Head title="Profile settings" />
            <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
                <header className="border-b border-slate-200/80 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Profile settings</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        Update your account details and password.
                    </p>
                </header>

                <section aria-label="Account overview" className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex min-w-0 items-center gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
                            {user.name.trim().charAt(0).toUpperCase() || <Icon name="user" />}
                        </span>
                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-bold text-slate-900">{user.name}</h2>
                            <p className="mt-0.5 break-all text-sm text-slate-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                            <Icon name="shield" className="h-3.5 w-3.5" />
                            {role}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            emailVerified
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-amber-200 bg-amber-50 text-amber-800'
                        }`}>
                            {emailVerified ? <Icon name="check" className="h-3.5 w-3.5" /> : <Icon name="user" className="h-3.5 w-3.5" />}
                            Email {emailVerified ? 'verified' : 'not verified'}
                        </span>
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <SectionHeader
                        icon="user"
                        title="Profile information"
                        description="Update the name and email address associated with your account."
                    />
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="p-5 sm:p-6"
                    />
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <SectionHeader
                        icon="lock"
                        title="Change password"
                        description="Choose a new password to keep your account secure."
                    />
                    <UpdatePasswordForm className="p-5 sm:p-6" />
                </section>

                <section className="overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-sm">
                    <div className="border-b border-rose-100 bg-rose-50/70 px-5 py-4 sm:px-6">
                        <h2 className="text-base font-bold text-rose-900">Delete account</h2>
                        <p className="mt-1 text-sm leading-5 text-rose-800/80">
                            Permanently delete your account. You’ll need to confirm with your password.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6">
                        <DeleteUserForm className="w-fit" />
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
