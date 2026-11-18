'use client';
import { authCredentials } from '@/lib/features/auth/authActions'
import React, { useActionState, useEffect, useRef } from 'react'
import Link from 'next/link';
import InputBox from '../shared/InputBox';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useWarmup } from '@/hooks/useWarmup';

export default function LoginForm() {
    const [state, action, isPending] = useActionState(authCredentials, null);
    const router = useRouter();

    // Pings the backend on mount; shows a "waking up" toast if it takes > 2s (Neon/Render cold start).
    useWarmup(isPending);

    // Optional public demo credentials (set in client/.env). The button is hidden when unset.
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD;
    const formRef = useRef<HTMLFormElement>(null);

    const fillDemo = () => {
        const form = formRef.current;
        if (!form || !demoEmail || !demoPassword) return;
        (form.elements.namedItem('email') as HTMLInputElement).value = demoEmail;
        (form.elements.namedItem('password') as HTMLInputElement).value = demoPassword;
    };

    useEffect(() => {
        if (!state?.message) return;

        if (state.success) {
            router.push('/');
            return;
        }

        toast.error(state.message || 'Something went wrong.');

    }, [state, router])


    return (
        <form ref={formRef} action={action} className="space-y-5">
            <div>
                <label htmlFor="email">Email</label>
                <InputBox
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    value={state?.inputs?.email as string}
                    errors={state?.errors?.email}
                    disabled={isPending}
                />

            </div>
            <div>
                <label htmlFor="password">Password</label>
                <InputBox
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={state?.inputs?.password as string}
                    errors={state?.errors?.password}
                    disabled={isPending}
                />

                <div className="flex justify-end mt-2">
                    <Link href="/reset-password" className="text-sm text-gray-500 hover:text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-full !py-3 text-base"
                disabled={isPending}
            >
                {isPending && (
                    <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 mr-3 inline-block align-middle"></span>
                )}
                {isPending ? "Signing in…" : "Sign in"}
            </button>

            {demoEmail && demoPassword && (
                <button
                    type="button"
                    onClick={fillDemo}
                    disabled={isPending}
                    className="btn btn-outline-primary w-full !py-3"
                >
                    Use the demo account
                </button>
            )}
        </form>
    )
}
