import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import LoginBtns from '@/components/auth/LoginBtns';

export default function page() {
    return (
        <div className="flex max-h-screen">
            {/* Left Panel - Brand Section */}
            <div className="hidden min-h-screen w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#4361ee] via-[#805dca] to-[#e7515a] p-8 text-white lg:flex">
                <div className="mx-auto w-full max-w-[500px]">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                            <Image 
                                src={'/assets/images/logo-dark.png'} 
                                width={125} 
                                height={125} 
                                alt="CRM Logo" 
                                className="h-auto w-auto"
                                priority
                            />
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="mb-8">
                        <Image 
                            src="/assets/images/crm-importance.jpg" 
                            width={500} 
                            height={500} 
                            alt="CRM Illustration" 
                            className="mx-auto w-full drop-shadow-2xl lg:max-w-[370px] xl:max-w-[450px] rounded-3xl" 
                        />
                    </div>

                    {/* Title & Description */}
                    <div className="text-center">
                        <h3 className="text-3xl font-bold leading-tight xl:text-4xl">
                            Manage Your Customer Relationships Efficiently
                        </h3>
                        <p className="text-lg leading-relaxed text-white/90">
                            Access your CRM dashboard to manage customers, track leads, handle support tickets, and grow your business.
                        </p>
                    </div>

                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="relative flex w-full min-h-screen flex-col items-center justify-center bg-white dark:bg-[#060818] lg:w-1/2">
                {/* Mobile Logo */}
                <div className="absolute left-5 top-5 lg:hidden">
                    <Image 
                        src={'/assets/images/logo-light.png'} 
                        width={125} 
                        height={125} 
                        alt="CRM Logo" 
                        className="h-auto w-auto"
                        priority
                    />
                </div>

                <div className="w-full max-w-[480px] p-6 md:p-10">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome Back
                        </h2>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                            Sign in to access your CRM dashboard
                        </p>
                    </div>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Footer Links */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Having trouble signing in?{' '}
                            <Link 
                                href="/reset-password" 
                                className="font-semibold text-primary transition hover:underline"
                            >
                                Reset Password
                            </Link>
                        </p>
                    </div>

                    {/* Optional: Social Login (currently commented out) */}
                    {/* <div className="relative my-7 h-5 text-center before:absolute before:inset-0 before:m-auto before:h-[1px] before:w-full before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                        <div className="relative z-[1] inline-block bg-white px-2 font-bold text-gray-500 dark:bg-[#060818] dark:text-gray-400">
                            <span>OR</span>
                        </div>
                    </div>
                    <LoginBtns /> */}
                </div>

                {/* Footer */}
                <div className="absolute bottom-5 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} <Link href="https://alidurul.dev" className='text-blue-500 hover:underline'>Ali Durul</Link> All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
