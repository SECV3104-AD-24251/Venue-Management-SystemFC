import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        patch(route('profile.update'), { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className={`${className} space-y-5`}>
            <div>
                <InputLabel htmlFor="name" value="Name" className="mb-1.5 font-semibold text-slate-700" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    autoComplete="name"
                />
                <InputError message={errors.name} className="mt-1.5" />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Email address" className="mb-1.5 font-semibold text-slate-700" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    className="block w-full rounded-xl border-slate-200 px-3.5 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    autoComplete="username"
                />
                <InputError message={errors.email} className="mt-1.5" />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                        <p>Your email address has not been verified.</p>
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="mt-1 font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                        >
                            Resend verification email
                        </Link>
                        {status === 'verification-link-sent' && (
                            <p role="status" className="mt-2 font-medium text-emerald-700">
                                A new verification link has been sent.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p role="status" className="text-sm text-slate-600">Saved.</p>
                </Transition>
                <PrimaryButton
                    disabled={processing}
                    className="!rounded-xl !bg-blue-700 !px-5 !py-2.5 !text-sm !font-semibold !text-white hover:!bg-blue-800"
                >
                    {processing ? 'Saving…' : 'Save changes'}
                </PrimaryButton>
            </div>
        </form>
    );
}
