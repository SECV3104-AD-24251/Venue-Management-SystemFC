import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, Ref, useRef, useState } from 'react';

function VisibilityIcon({ visible }: { visible: boolean }) {
    return visible ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
            <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15.7 15.7 0 0 1-3 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.1-.8" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

const inputClass =
    'block w-full rounded-xl border-slate-200 py-2.5 pl-3.5 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (event) => {
        event.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (formErrors) => {
                if (formErrors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (formErrors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const passwordField = (
        id: 'current_password' | 'password' | 'password_confirmation',
        label: string,
        value: string,
        visible: boolean,
        toggleVisibility: () => void,
        onChange: (value: string) => void,
        error?: string,
        inputRef?: Ref<HTMLInputElement>,
        autoComplete?: string,
    ) => (
        <div>
            <InputLabel htmlFor={id} value={label} className="mb-1.5 font-semibold text-slate-700" />
            <div className="relative">
                <TextInput
                    id={id}
                    ref={inputRef}
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className={inputClass}
                    autoComplete={autoComplete}
                    aria-invalid={Boolean(error)}
                />
                <button
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                    aria-pressed={visible}
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-3 text-slate-400 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                    <VisibilityIcon visible={visible} />
                </button>
            </div>
            <InputError message={error} className="mt-1.5" />
        </div>
    );

    return (
        <form onSubmit={updatePassword} className={`${className} space-y-5`}>
            {passwordField(
                'current_password',
                'Current password',
                data.current_password,
                showCurrentPassword,
                () => setShowCurrentPassword((visible) => !visible),
                (value) => setData('current_password', value),
                errors.current_password,
                currentPasswordInput,
                'current-password',
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {passwordField(
                    'password',
                    'New password',
                    data.password,
                    showNewPassword,
                    () => setShowNewPassword((visible) => !visible),
                    (value) => setData('password', value),
                    errors.password,
                    passwordInput,
                    'new-password',
                )}
                {passwordField(
                    'password_confirmation',
                    'Confirm new password',
                    data.password_confirmation,
                    showConfirmPassword,
                    () => setShowConfirmPassword((visible) => !visible),
                    (value) => setData('password_confirmation', value),
                    errors.password_confirmation,
                    undefined,
                    'new-password',
                )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={() => reset()}
                    disabled={processing}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Clear
                </button>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p role="status" className="text-sm text-slate-600">Password updated.</p>
                </Transition>
                <PrimaryButton
                    disabled={processing}
                    className="!rounded-xl !bg-blue-700 !px-5 !py-2.5 !text-sm !font-semibold !text-white hover:!bg-blue-800"
                >
                    {processing ? 'Updating…' : 'Update password'}
                </PrimaryButton>
            </div>
        </form>
    );
}
