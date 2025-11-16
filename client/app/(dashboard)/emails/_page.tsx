'use client';
import useSWR from 'swr';
import { Email, Pagination } from '@/types';
import { EmailListSkeleton } from '@/components/dashboard/email/EmailSkeletons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectAssignModal, selectEmailIds, selectFilteredEmails, setAssignModal, setEmail, setFilteredEmails } from '@/lib/features/email/emailSlice';
import Tippy from '@tippyjs/react';
import { formatDate, truncateText } from '@/lib/utility/functions';
import { useRouter } from 'next/navigation';
import { useUrlParams } from '@/hooks/useUrlParams';
import toast from 'react-hot-toast';
import { getAllData } from '@/lib/features/shared/actionUtils';
import EmailtoTicketModal from '@/components/dashboard/email/EmailtoTicketModal';
import useEmails from '@/hooks/useEmail';

export default function page() {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const assignModal = useAppSelector(selectAssignModal);
    const filteredEmails = useAppSelector(selectFilteredEmails);
    const emailIds = useAppSelector(selectEmailIds);
    const { getParam } = useUrlParams()
    const selectedTab = getParam('tab', 'INBOX');
    
    const { isLoading } = useEmails();

    // functions
    const setStar = (mailId: string) => {
        // if (mailId) {
        //     let item = filteredMailList.find((d: any) => d.id === mailId);
        //     item.isStar = !item.isStar;
        //     setTimeout(() => {
        //         searchMails(false);
        //     });
        // }
    };


    const setImportant = (mailId: string) => {
        // if (mailId) {
        //     let item = filteredMailList.find((d: any) => d.id === mailId);
        //     item.isImportant = !item.isImportant;
        //     setTimeout(() => {
        //         searchMails(false);
        //     });
        // }
    };

    const handleAssignModal = (e: React.MouseEvent<HTMLButtonElement>, email: Email | null) => {
        e.stopPropagation();

        dispatch(setAssignModal({ open: true, email }));
    }



    return (

        <>
            {
                isLoading
                    ? (<EmailListSkeleton />)
                    : filteredEmails.result.length
                        ? (
                            <div className="table-responsive min-h-[400px] grow overflow-y-auto sm:min-h-[300px]">
                                <table className="table-hover">
                                    <tbody>
                                        {filteredEmails.result.map((mail: Email) => {
                                            return (
                                                <tr
                                                    key={mail.id}
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        router.push(`/emails/${mail.id}`);
                                                        dispatch(setEmail(mail));
                                                    }}>
                                                    <td>
                                                        <div className="flex items-center whitespace-nowrap">
                                                            <div className="ltr:mr-3 rtl:ml-3">
                                                                {emailIds.includes(mail.id)}
                                                                <input
                                                                    type="checkbox"
                                                                    id={`chk-${mail.id}`}
                                                                    value={mail.id}
                                                                    checked={emailIds.length ? emailIds.includes(mail.id) : false}
                                                                    // onChange={() => handleCheckboxChange(mail.id)}
                                                                    onClick={(event) => event.stopPropagation()}
                                                                    className="form-checkbox"
                                                                />
                                                            </div>
                                                            <div className="ltr:mr-3 rtl:ml-3">
                                                                <Tippy content="Star">
                                                                    <button
                                                                        type="button"
                                                                        className={`flex items-center enabled:hover:text-warning disabled:opacity-60 ${mail.isStarred ? 'text-warning' : ''}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setStar(mail.id);
                                                                        }}
                                                                        disabled={selectedTab === 'trash'}
                                                                    >
                                                                        <svg
                                                                            className={mail.isStarred ? 'fill-warning' : ''}
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
                                                            </div>
                                                            <div className="ltr:mr-3 rtl:ml-3">
                                                                <Tippy content="Important">
                                                                    <button
                                                                        type="button"
                                                                        className={`flex items-center enabled:hover:text-primary disabled:opacity-60 ${mail.isImportant ? 'text-primary' : ''}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setImportant(mail.id);
                                                                        }}
                                                                        disabled={selectedTab === 'trash'}
                                                                    >
                                                                        <svg
                                                                            className={`rotate-90 ${mail.isImportant ? 'fill-primary' : ''}`}
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
                                                            </div>
                                                            <div className={`whitespace-nowrap font-semibold dark:text-gray-300 ${!mail.isUnread ? 'text-gray-500 dark:text-gray-500' : ''}`}>
                                                                {mail.firstName} {mail.lastName}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="min-w-[300px] overflow-hidden font-medium text-white-dark line-clamp-1">
                                                            <span className={`${mail.isUnread ? 'font-semibold text-gray-800 dark:text-gray-300' : ''}`}>
                                                                <span>{mail.title}</span> &minus;
                                                                <span className=''> {truncateText(mail.displayDescription, 100)}</span>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='group'>
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`h-2 w-2 rounded-full ${(mail.labelIds.includes('IMPORTANT') && 'bg-danger') ||
                                                                    (mail.labelIds.includes('INBOX') && 'bg-primary') ||
                                                                    (mail.labelIds.includes('CATEGORY_UPDATES') && 'bg-success') ||
                                                                    (mail.labelIds.includes('CATEGORY_FORUMS') && 'bg-warning')
                                                                    }`}
                                                            />
                                                            {mail.attachments.length > 0 && (
                                                                <div className="ltr:ml-4 rtl:mr-4">
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M7.9175 17.8068L15.8084 10.2535C16.7558 9.34668 16.7558 7.87637 15.8084 6.96951M3 10.0346L9.40419 3.90441C12.0569 1.3652 16.3578 1.3652 19.0105 3.90441"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                        />
                                                                        <path
                                                                            opacity="0.5"
                                                                            d="M19.0105 13.0996L19.5291 13.6414L19.0105 13.0996ZM11.0624 20.7076L10.5438 20.1658L11.0624 20.7076ZM4.54388 14.4679L5.0625 15.0097L4.54388 14.4679ZM12.3776 6.9694L11.859 6.4276L12.3776 6.9694ZM19.5291 3.3625C19.2299 3.07608 18.7551 3.08646 18.4687 3.38568C18.1823 3.68491 18.1927 4.15967 18.4919 4.44609L19.5291 3.3625ZM18.4919 12.5578L10.5438 20.1658L11.581 21.2494L19.5291 13.6414L18.4919 12.5578ZM5.0625 15.0097L12.8962 7.51119L11.859 6.4276L4.02527 13.9262L5.0625 15.0097ZM16.327 6.4276C15.0896 5.24313 13.0964 5.24313 11.859 6.4276L12.8962 7.51119C13.5536 6.88194 14.6324 6.88194 15.2898 7.51119L16.327 6.4276ZM5.0625 20.1658C3.57096 18.7381 3.57096 16.4375 5.0625 15.0097L4.02527 13.9262C1.91671 15.9445 1.91671 19.2311 4.02527 21.2494L5.0625 20.1658ZM10.5438 20.1658C9.03379 21.6112 6.57253 21.6112 5.0625 20.1658L4.02527 21.2494C6.11533 23.25 9.49098 23.25 11.581 21.2494L10.5438 20.1658ZM18.4919 4.44609C20.8361 6.68999 20.8361 10.3139 18.4919 12.5578L19.5291 13.6414C22.4903 10.8069 22.4903 6.19703 19.5291 3.3625L18.4919 4.44609Z"
                                                                            fill="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            <button
                                                                type='button'
                                                                onClick={(e) => handleAssignModal(e, mail)}
                                                                className='absolute right-0 opacity-0 group-hover:right-32 group-hover:opacity-100 transition-all duration-300'
                                                            >
                                                                <Tippy content='Assign it' >

                                                                    <svg width="25" height="25" className='hover:text-red-800' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M18.3569 1.61412C18.57 1.25893 19.0307 1.14376 19.3859 1.35687L19 1.99999C19.3859 1.35687 19.3855 1.35667 19.3859 1.35687L19.3873 1.35771L19.3888 1.35866L19.3925 1.36091L19.4021 1.36683C19.4095 1.3714 19.4187 1.37724 19.4297 1.38436C19.4517 1.39859 19.4808 1.41797 19.516 1.4426C19.5863 1.49182 19.6813 1.56232 19.7926 1.65508C20.0147 1.84016 20.3052 2.11666 20.5945 2.49271C21.1773 3.25044 21.75 4.40734 21.75 5.99999C21.75 7.59265 21.1773 8.74954 20.5945 9.50727C20.3052 9.88332 20.0147 10.1598 19.7926 10.3449C19.6813 10.4377 19.5863 10.5082 19.516 10.5574C19.4808 10.582 19.4517 10.6014 19.4297 10.6156C19.4187 10.6227 19.4095 10.6286 19.4021 10.6332L19.3925 10.6391L19.3888 10.6413L19.3873 10.6423C19.3869 10.6425 19.3859 10.6431 19 9.99999L19.3859 10.6431C19.0307 10.8562 18.57 10.741 18.3569 10.3859C18.1447 10.0322 18.258 9.57386 18.6097 9.35958L18.6152 9.35604C18.6225 9.35133 18.6363 9.34219 18.6558 9.32854C18.6949 9.30119 18.7562 9.25607 18.8324 9.19258C18.9853 9.06516 19.1948 8.86666 19.4055 8.59271C19.8227 8.05044 20.25 7.20734 20.25 5.99999C20.25 4.79264 19.8227 3.94954 19.4055 3.40727C19.1948 3.13332 18.9853 2.93482 18.8324 2.80741C18.7562 2.74391 18.6949 2.69879 18.6558 2.67145C18.6363 2.6578 18.6225 2.64866 18.6152 2.64394L18.6097 2.64041C18.258 2.42613 18.1447 1.96781 18.3569 1.61412Z" fill="currentColor" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 1.24999C7.37665 1.24999 5.25 3.37664 5.25 5.99999C5.25 8.62334 7.37665 10.75 10 10.75C12.6234 10.75 14.75 8.62334 14.75 5.99999C14.75 3.37664 12.6234 1.24999 10 1.24999ZM6.75 5.99999C6.75 4.20507 8.20507 2.74999 10 2.74999C11.7949 2.74999 13.25 4.20507 13.25 5.99999C13.25 7.79492 11.7949 9.24999 10 9.24999C8.20507 9.24999 6.75 7.79492 6.75 5.99999Z" fill="currentColor" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 12.25C7.96067 12.25 6.07752 12.7207 4.67815 13.5204C3.3 14.3079 2.25 15.5101 2.25 17C2.25 18.4899 3.3 19.6921 4.67815 20.4796C6.07752 21.2792 7.96067 21.75 10 21.75C12.0393 21.75 13.9225 21.2792 15.3219 20.4796C16.7 19.6921 17.75 18.4899 17.75 17C17.75 15.5101 16.7 14.3079 15.3219 13.5204C13.9225 12.7207 12.0393 12.25 10 12.25ZM3.75 17C3.75 16.2807 4.26701 15.4829 5.42236 14.8227C6.55649 14.1747 8.17334 13.75 10 13.75C11.8267 13.75 13.4435 14.1747 14.5776 14.8227C15.733 15.4829 16.25 16.2807 16.25 17C16.25 17.7193 15.733 18.517 14.5776 19.1772C13.4435 19.8253 11.8267 20.25 10 20.25C8.17334 20.25 6.55649 19.8253 5.42236 19.1772C4.26701 18.517 3.75 17.7193 3.75 17Z" fill="currentColor" />
                                                                        <path d="M17.3859 3.35687C17.0307 3.14376 16.57 3.25893 16.3569 3.61412L16.6051 4.63761L16.6129 4.64293C16.6246 4.65113 16.6468 4.66735 16.6761 4.69178C16.7353 4.74107 16.8198 4.82082 16.9055 4.93227C17.0727 5.14954 17.25 5.49264 17.25 5.99999C17.25 6.50734 17.0727 6.85044 16.9055 7.06771C16.8198 7.17916 16.7353 7.25891 16.6761 7.3082C16.6468 7.33263 16.6246 7.34885 16.6129 7.35705L16.6051 7.36237C16.257 7.57782 16.1456 8.0337 16.3569 8.38586C16.57 8.74105 17.0307 8.85622 17.3859 8.64311L17 7.99999C17.3859 8.64311 17.3855 8.64331 17.3859 8.64311L17.3872 8.6423L17.3887 8.64144L17.3918 8.63951L17.3993 8.63492L17.4185 8.6227C17.4332 8.61321 17.4515 8.60096 17.4731 8.5859C17.516 8.55582 17.572 8.51423 17.6364 8.46053C17.7647 8.35357 17.9302 8.19582 18.0945 7.98227C18.4273 7.54954 18.75 6.89264 18.75 5.99999C18.75 5.10734 18.4273 4.45044 18.0945 4.01771C17.9302 3.80416 17.7647 3.64641 17.6364 3.53945C17.572 3.48576 17.516 3.44416 17.4731 3.41408C17.4515 3.39902 17.4332 3.38678 17.4185 3.37728L17.3993 3.36507L17.3918 3.36047L17.3887 3.35855L17.3872 3.35768C17.3869 3.35748 17.3859 3.35687 17 3.99999L17.3859 3.35687Z" fill="currentColor" />
                                                                    </svg>

                                                                </Tippy>

                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap font-medium ltr:text-right rtl:text-left">{formatDate(mail.date)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )
                        : (
                            <div className="grid h-full min-h-[300px] place-content-center text-lg font-semibold">No data available</div >
                        )

            }

            {
                assignModal && <EmailtoTicketModal />
            }
        </>
    )
}