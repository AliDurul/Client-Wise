'use client';
import EmailtoTicketModal from '@/components/dashboard/email/EmailtoTicketModal';
import Dropdown from '@/components/layout/Dropdown';
import { useUrlParams } from '@/hooks/useUrlParams';
import { modifyEmail } from '@/lib/features/email/emailActions';
import { selectAssignModal, setAssignModal } from '@/lib/features/email/emailSlice';
import { getData } from '@/lib/features/shared/actionUtils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getMessageBody } from '@/lib/utility/functions';
import { Email } from '@/types';
import Tippy from '@tippyjs/react';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export default function page({ params }: { params: Promise<{ emailId: string }> }) {

    // hooks
    const router = useRouter();
    const dispatch = useAppDispatch()
    const { getParam } = useUrlParams()

    // states & variables
    const assignModal = useAppSelector(selectAssignModal);
    const selectedTab = getParam('tab', 'INBOX');
    const { emailId } = use(params);



    // validation
    const { trigger } = useSWRMutation(`emails/${selectedTab}`, modifyEmail, {
        onError: (error, key, config) => {
            console.error('Error modifying email:', error);
        },
    });

    // api call
    const { data: email, isLoading } = useSWR<{ result: Email, success: boolean }>(`emails/${emailId}`, () => getData(`emails/${emailId}`), {
        onError: (err) => {
            console.log('err', err);
            toast.error(err?.message ?? 'Error fetching email', { duration: 3000 });
        },
        onSuccess: () => {
            trigger({ read: true, id: emailId }, {
                optimisticData: (currentData: any) => {

                    if (!currentData?.result) return currentData;

                    return {
                        ...currentData,
                        result: currentData.result.map((email: Email) =>
                            email.id == emailId
                                ? { ...email, isUnread: false }
                                : email
                        )
                    };
                },
                rollbackOnError: true,
                revalidate: true,
            });
        }
    });


    return (
        <>
            {
                isLoading
                    ? (<h1>Loading...</h1>)
                    : (
                        <div>
                            <div className="flex flex-wrap items-center justify-between p-4">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="hover:text-primary ltr:mr-2 rtl:ml-2"
                                        onClick={() => {
                                            // router.push('/emails');
                                            router.back();
                                            // dispatch(setEmail(null))
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 rtl:rotate-180">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                    </button>
                                    <h4 className="text-base font-medium ltr:mr-2 rtl:ml-2 md:text-lg">{email?.result?.title}</h4>
                                    <div className="badge bg-white-dark hover:top-0">{email?.result?.labelIds.join(',  ')}</div>
                                </div>
                                <div>
                                    <Tippy content="Print">
                                        <button type="button">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path opacity="0.5" d="M9 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M19 14L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path
                                                    d="M18 14V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V14"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    opacity="0.5"
                                                    d="M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2427 2 14.8284 2 12 2C9.17158 2 7.75737 2 6.87869 2.87868C6.23739 3.51998 6.06414 4.44655 6.01733 6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <circle opacity="0.5" cx="17" cy="10" r="1" fill="currentColor" />
                                                <path opacity="0.5" d="M15 16.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path opacity="0.5" d="M13 19H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </Tippy>
                                </div>
                            </div>
                            <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            <div className="relative p-4">
                                <div className="flex flex-wrap">
                                    {/* <div className="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                            {email?.result?.path ? (
                                <img src={`/assets/images/${email?.result?.path}`} className="h-12 w-12 rounded-full object-cover" alt="avatar" />
                            ) : (
                                <div className="rounded-full border border-gray-300 p-3 dark:border-gray-800">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                        <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            )}
                        </div> */}
                                    <div className="flex-1 ltr:mr-2 rtl:ml-2">
                                        <div className="flex items-center">
                                            <div className="whitespace-nowrap text-lg ltr:mr-4 rtl:ml-4">
                                                {email?.result?.firstName ? email?.result.firstName + ' ' + email?.result.lastName : email?.result?.email}
                                            </div>
                                            {/* <div className="ltr:mr-4 rtl:ml-4">
                                <Tippy content={email?.result?.firstName} className="capitalize">
                                    <div
                                        className={`h-2 w-2 rounded-full ${(email?.result?.isImportant && 'bg-danger') ||
                                            (email?.result?.labelIds.includes('INBOX') && 'bg-primary') ||
                                            (email?.result?.labelIds.includes('CATEGORY_UPDATES') && 'bg-success') ||
                                            (email?.result?.labelIds.includes('CATEGORY_FORUMS') && 'bg-warning')
                                            }`}
                                    />
                                </Tippy>
                            </div> */}

                                            <div className="whitespace-nowrap text-white-dark">{email?.result?.date}</div>
                                        </div>
                                        <div className="flex items-center text-white-dark">
                                            <div className="ltr:mr-1 rtl:ml-1">{'to me'}</div>
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement='bottom-start'
                                                    btnClassName="hover:text-primary flex items-center"
                                                    button={
                                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    }
                                                >
                                                    <ul className="w-fit ">
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">From:</div>
                                                                <div className="flex-1">{email?.result?.email}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">To:</div>
                                                                <div className="flex-1">{email?.result?.to}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">Date:</div>
                                                                <div className="flex-1">{email?.result?.date}</div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex items-center px-4 py-2">
                                                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">Subject:</div>
                                                                <div className="flex-1">{email?.result?.title}</div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                                            <Tippy content="Assign it">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-red-600 disabled:opacity-60`}
                                                    onClick={() => dispatch(setAssignModal({ open: true, email: email?.result ?? null }))}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <svg width="20" height="20" className='hover:text-red-800' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18.3569 1.61412C18.57 1.25893 19.0307 1.14376 19.3859 1.35687L19 1.99999C19.3859 1.35687 19.3855 1.35667 19.3859 1.35687L19.3873 1.35771L19.3888 1.35866L19.3925 1.36091L19.4021 1.36683C19.4095 1.3714 19.4187 1.37724 19.4297 1.38436C19.4517 1.39859 19.4808 1.41797 19.516 1.4426C19.5863 1.49182 19.6813 1.56232 19.7926 1.65508C20.0147 1.84016 20.3052 2.11666 20.5945 2.49271C21.1773 3.25044 21.75 4.40734 21.75 5.99999C21.75 7.59265 21.1773 8.74954 20.5945 9.50727C20.3052 9.88332 20.0147 10.1598 19.7926 10.3449C19.6813 10.4377 19.5863 10.5082 19.516 10.5574C19.4808 10.582 19.4517 10.6014 19.4297 10.6156C19.4187 10.6227 19.4095 10.6286 19.4021 10.6332L19.3925 10.6391L19.3888 10.6413L19.3873 10.6423C19.3869 10.6425 19.3859 10.6431 19 9.99999L19.3859 10.6431C19.0307 10.8562 18.57 10.741 18.3569 10.3859C18.1447 10.0322 18.258 9.57386 18.6097 9.35958L18.6152 9.35604C18.6225 9.35133 18.6363 9.34219 18.6558 9.32854C18.6949 9.30119 18.7562 9.25607 18.8324 9.19258C18.9853 9.06516 19.1948 8.86666 19.4055 8.59271C19.8227 8.05044 20.25 7.20734 20.25 5.99999C20.25 4.79264 19.8227 3.94954 19.4055 3.40727C19.1948 3.13332 18.9853 2.93482 18.8324 2.80741C18.7562 2.74391 18.6949 2.69879 18.6558 2.67145C18.6363 2.6578 18.6225 2.64866 18.6152 2.64394L18.6097 2.64041C18.258 2.42613 18.1447 1.96781 18.3569 1.61412Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 1.24999C7.37665 1.24999 5.25 3.37664 5.25 5.99999C5.25 8.62334 7.37665 10.75 10 10.75C12.6234 10.75 14.75 8.62334 14.75 5.99999C14.75 3.37664 12.6234 1.24999 10 1.24999ZM6.75 5.99999C6.75 4.20507 8.20507 2.74999 10 2.74999C11.7949 2.74999 13.25 4.20507 13.25 5.99999C13.25 7.79492 11.7949 9.24999 10 9.24999C8.20507 9.24999 6.75 7.79492 6.75 5.99999Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 12.25C7.96067 12.25 6.07752 12.7207 4.67815 13.5204C3.3 14.3079 2.25 15.5101 2.25 17C2.25 18.4899 3.3 19.6921 4.67815 20.4796C6.07752 21.2792 7.96067 21.75 10 21.75C12.0393 21.75 13.9225 21.2792 15.3219 20.4796C16.7 19.6921 17.75 18.4899 17.75 17C17.75 15.5101 16.7 14.3079 15.3219 13.5204C13.9225 12.7207 12.0393 12.25 10 12.25ZM3.75 17C3.75 16.2807 4.26701 15.4829 5.42236 14.8227C6.55649 14.1747 8.17334 13.75 10 13.75C11.8267 13.75 13.4435 14.1747 14.5776 14.8227C15.733 15.4829 16.25 16.2807 16.25 17C16.25 17.7193 15.733 18.517 14.5776 19.1772C13.4435 19.8253 11.8267 20.25 10 20.25C8.17334 20.25 6.55649 19.8253 5.42236 19.1772C4.26701 18.517 3.75 17.7193 3.75 17Z" fill="currentColor" />
                                                        <path d="M17.3859 3.35687C17.0307 3.14376 16.57 3.25893 16.3569 3.61412L16.6051 4.63761L16.6129 4.64293C16.6246 4.65113 16.6468 4.66735 16.6761 4.69178C16.7353 4.74107 16.8198 4.82082 16.9055 4.93227C17.0727 5.14954 17.25 5.49264 17.25 5.99999C17.25 6.50734 17.0727 6.85044 16.9055 7.06771C16.8198 7.17916 16.7353 7.25891 16.6761 7.3082C16.6468 7.33263 16.6246 7.34885 16.6129 7.35705L16.6051 7.36237C16.257 7.57782 16.1456 8.0337 16.3569 8.38586C16.57 8.74105 17.0307 8.85622 17.3859 8.64311L17 7.99999C17.3859 8.64311 17.3855 8.64331 17.3859 8.64311L17.3872 8.6423L17.3887 8.64144L17.3918 8.63951L17.3993 8.63492L17.4185 8.6227C17.4332 8.61321 17.4515 8.60096 17.4731 8.5859C17.516 8.55582 17.572 8.51423 17.6364 8.46053C17.7647 8.35357 17.9302 8.19582 18.0945 7.98227C18.4273 7.54954 18.75 6.89264 18.75 5.99999C18.75 5.10734 18.4273 4.45044 18.0945 4.01771C17.9302 3.80416 17.7647 3.64641 17.6364 3.53945C17.572 3.48576 17.516 3.44416 17.4731 3.41408C17.4515 3.39902 17.4332 3.38678 17.4185 3.37728L17.3993 3.36507L17.3918 3.36047L17.3887 3.35855L17.3872 3.35768C17.3869 3.35748 17.3859 3.35687 17 3.99999L17.3859 3.35687Z" fill="currentColor" />
                                                    </svg>
                                                </button>
                                            </Tippy>
                                            <Tippy content="Star">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-warning disabled:opacity-60 ${email?.result?.isStarred ? 'text-warning' : ''}`}
                                                    // onClick={() => setStar(email?.result?.id)}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <svg
                                                        className={email?.result?.isStarred ? 'fill-warning' : ''}
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tippy>
                                            <Tippy content="Important">
                                                <button
                                                    type="button"
                                                    className={`enabled:hover:text-primary disabled:opacity-60 ${email?.result?.isImportant ? 'text-primary' : ''}`}
                                                    // onClick={() => setImportant(email?.result?.id)}
                                                    disabled={selectedTab === 'trash'}
                                                >
                                                    <svg
                                                        className={`rotate-90 ${email?.result?.isImportant ? 'fill-primary' : ''}`}
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        />
                                                    </svg>
                                                </button>
                                            </Tippy>
                                            <Tippy content="Reply">
                                                <button
                                                    type="button"
                                                    className="hover:text-info"
                                                // onClick={() => openMail('reply', email?.result)}
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:hidden">
                                                        <path d="M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path opacity="0.5" d="M4.5 12L14.5 12C16.1667 12 19.5 13 19.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:hidden rtl:block">
                                                        <path d="M14.5 7L19.5 12L14.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path opacity="0.5" d="M19.5 12L9.5 12C7.83333 12 4.5 13 4.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </Tippy>
                                            <Tippy content="Forward">
                                                <button
                                                    type="button"
                                                    className="hover:text-info"
                                                // onClick={() => openMail('forward', email?.result)}
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:hidden rtl:block">
                                                        <path d="M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path opacity="0.5" d="M4.5 12L14.5 12C16.1667 12 19.5 13 19.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:hidden">
                                                        <path d="M14.5 7L19.5 12L14.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path opacity="0.5" d="M19.5 12L9.5 12C7.83333 12 4.5 13 4.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="prose mt-8 max-w-full prose-p:text-sm prose-img:m-0 prose-img:inline-block dark:prose-p:text-white md:prose-p:text-sm"
                                    dangerouslySetInnerHTML={{ __html: getMessageBody(email?.result?.payload) }}
                                ></div>
                                <p className="mt-4">Best Regards,</p>
                                <p>{email?.result?.firstName + ' ' + email?.result?.lastName}</p>

                                {email?.result?.attachments && (
                                    <div className="mt-8">
                                        <div className="mb-4 text-base">Attachments</div>
                                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                                        <div className="mt-6 flex flex-wrap items-center">
                                            {email?.result?.attachments.map((attachment: any, i: number) => {
                                                return (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        className="group relative mb-4 flex items-center rounded-md border border-white-light px-4 py-2.5 transition-all duration-300 hover:border-primary hover:text-primary ltr:mr-4 rtl:ml-4 dark:border-[#1b2e4b]"
                                                    >
                                                        {attachment.type === 'image' && (
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                />
                                                                <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                        )}
                                                        {attachment.type === 'folder' && (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                                <path opacity="0.5" d="M18 10L13 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path
                                                                    d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                />
                                                            </svg>
                                                        )}
                                                        {attachment.type === 'zip' && (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                                <path
                                                                    d="M9.5 15.5V15.375C9.5 14.8918 9.89175 14.5 10.375 14.5H13.625C14.1082 14.5 14.5 14.8918 14.5 15.375V15.5C14.5 16.8807 13.3807 18 12 18C10.6193 18 9.5 16.8807 9.5 15.5Z"
                                                                    stroke="#8E93A6"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                />
                                                                <path
                                                                    d="M9.5 3C9.5 2.5286 9.5 2.29289 9.64645 2.14645C9.79289 2 10.0286 2 10.5 2H11C11.4714 2 11.7071 2 11.8536 2.14645C12 2.29289 12 2.5286 12 3V3.5C12 3.9714 12 4.20711 11.8536 4.35355C11.7071 4.5 11.4714 4.5 11 4.5H10.5C10.0286 4.5 9.79289 4.5 9.64645 4.35355C9.5 4.20711 9.5 3.9714 9.5 3.5V3Z"
                                                                    stroke="#8E93A6"
                                                                    strokeWidth="1.5"
                                                                />
                                                                <path
                                                                    d="M9.5 8C9.5 7.5286 9.5 7.29289 9.64645 7.14645C9.79289 7 10.0286 7 10.5 7H11C11.4714 7 11.7071 7 11.8536 7.14645C12 7.29289 12 7.5286 12 8V8.5C12 8.9714 12 9.20711 11.8536 9.35355C11.7071 9.5 11.4714 9.5 11 9.5H10.5C10.0286 9.5 9.79289 9.5 9.64645 9.35355C9.5 9.20711 9.5 8.9714 9.5 8.5V8Z"
                                                                    stroke="#8E93A6"
                                                                    strokeWidth="1.5"
                                                                />
                                                                <path
                                                                    d="M12 5.5C12 5.0286 12 4.79289 12.1464 4.64645C12.2929 4.5 12.5286 4.5 13 4.5H13.5C13.9714 4.5 14.2071 4.5 14.3536 4.64645C14.5 4.79289 14.5 5.0286 14.5 5.5V6C14.5 6.4714 14.5 6.70711 14.3536 6.85355C14.2071 7 13.9714 7 13.5 7H13C12.5286 7 12.2929 7 12.1464 6.85355C12 6.70711 12 6.4714 12 6V5.5Z"
                                                                    stroke="#8E93A6"
                                                                    strokeWidth="1.5"
                                                                />
                                                                <path
                                                                    d="M12 10.5C12 10.0286 12 9.79289 12.1464 9.64645C12.2929 9.5 12.5286 9.5 13 9.5H13.5C13.9714 9.5 14.2071 9.5 14.3536 9.64645C14.5 9.79289 14.5 10.0286 14.5 10.5V11C14.5 11.4714 14.5 11.7071 14.3536 11.8536C14.2071 12 13.9714 12 13.5 12H13C12.5286 12 12.2929 12 12.1464 11.8536C12 11.7071 12 11.4714 12 11V10.5Z"
                                                                    stroke="#8E93A6"
                                                                    strokeWidth="1.5"
                                                                />
                                                                <path
                                                                    d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                />
                                                            </svg>
                                                        )}
                                                        {attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder' && (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                                <path
                                                                    d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path opacity="0.5" d="M6 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path opacity="0.5" d="M6 18H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                />
                                                            </svg>
                                                        )}

                                                        <div className="ltr:ml-3 rtl:mr-3">
                                                            <p className="text-xs font-semibold text-primary">{attachment.name}</p>
                                                            <p className="text-[11px] text-gray-400 dark:text-gray-600">{attachment.size}</p>
                                                        </div>
                                                        <div className="absolute top-0 z-[5] hidden h-full w-full rounded-md bg-dark-light/40 group-hover:block ltr:left-0 rtl:right-0"></div>
                                                        <div className="btn btn-primary absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full p-1 group-hover:block">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
            }

            {
                assignModal && <EmailtoTicketModal />
            }

        </>
    )
}
