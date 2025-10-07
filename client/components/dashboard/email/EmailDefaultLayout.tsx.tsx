'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react'
import EmailSidebar from './EmailSidebar'
import { selectEmail, selectEmailIds, selectFilteredEmails, selectIsEdit, selectIsShowMailMenu, setEdit, setEmail, setEmailIds, setFilteredEmails, setShowMailMenu } from '@/lib/features/email/emailSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import EmailHeader from './EmailHeader';
import EmailSubHeader from './EmailSubHeader';
import { usePathname } from 'next/navigation';

import { Email, Pagination } from '@/types';
import { getAllData } from '@/lib/features/shared/actionUtils';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useUrlParams } from '@/hooks/useUrlParams';

// interface EmailsResponse {
//     result: Email[];
//     success: boolean;
//     pagination: {
//         currentPage: number;
//         totalPages: number;
//         totalItems: number;
//         itemsPerPage: number;
//         hasNextPage: boolean;
//         hasPrevPage: boolean;
//         nextPageToken: string | null;
//     };
// }
export default function EmailDefaultLayout({ children }: PropsWithChildren) {

    const pathname = usePathname();
    const dispatch = useAppDispatch()
    const isShowMailMenu = useAppSelector(selectIsShowMailMenu);
    const filteredEmails = useAppSelector(selectFilteredEmails);
    const emailIds = useAppSelector(selectEmailIds);

    const { updateUrlParams, getParam, hasParam } = useUrlParams()
    const selectedTab = getParam('tab', 'INBOX');
    const page = getParam('page', '1');



    // Fetch emails
    const { data: emails, mutate } = useSWR<Pagination<Email>>(
        [selectedTab ? `emails/${selectedTab}` : null, page],
        () => getAllData({
            url: 'emails',
            customQuery: {
                labelIds: selectedTab
                    ? selectedTab === 'UPDATES'
                        ? 'CATEGORY_UPDATES'
                        : selectedTab === 'FORUMS'
                            ? 'CATEGORY_FORUMS'
                            : selectedTab
                    : 'INBOX',
                page: page ?? '1',

            }
        }),
        {
            onError: (err) => {
                console.error('Error fetching emails:', err);
                toast.error(err?.message ?? 'Error fetching emails', { duration: 3000 });
            },
            onSuccess: (data) => {
                // Sync to Redux for local filtering/sorting
                console.log('data fetched', data);
                dispatch(setFilteredEmails(data?.result || []));
            },
            revalidateOnFocus: false,
            dedupingInterval: 2000,
        }
    );

    // -----------------------



    // const [pager] = useState<any>({
    //     currentPage: 1,
    //     totalPages: 0,
    //     pageSize: 10,
    //     startIndex: 0,
    //     endIndex: 0,
    // });

    const refreshMails = async () => {
        // setSearchText('');
        // searchMails(false);
        await mutate();
    };



    const tabChanged = (tabType: string) => {
        updateUrlParams({ tab: tabType })
        // dispatch(setSelectedTab(tabType));
        dispatch(setEdit(false))
        dispatch(setShowMailMenu(false))
        dispatch(setEmail(null));
    };

    // -------------------------------
    // const [searchText, setSearchText] = useState<any>('');


    // useEffect(() => {
    //     searchMails();
    // }, [selectedTab, searchText, emails]);


    const searchMails = (isResetPage = true) => {
        // if (isResetPage) {
        //     pager.currentPage = 1;
        // }
        let res;
        // if (selectedTab === 'IMPORTANT') {
        //     res = emails?.result.filter((d) => d.labelIds?.includes('IMPORTANT'));
        // } else if (selectedTab === 'STARRED') {
        //     res = emails?.result.filter((d) => d.labelIds?.includes('STARRED'));
        // } else if (selectedTab === 'UPDATES') {
        //     res = emails?.result.filter((d) => d.labelIds?.includes('CATEGORY_UPDATES'));
        // } else if (selectedTab === 'FORUMS') {
        //     res = emails?.result.filter((d) => d.labelIds?.includes('CATEGORY_FORUMS'));
        // } else if (selectedTab === 'INBOX') {
        //     res = emails?.result.filter((d) => d.labelIds?.includes('INBOX'));
        // }

        // let filteredRes = res?.filter(
        //     (d) =>
        //         (d.title && d.title.toLowerCase().includes(searchText)) ||
        //         (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
        //         (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
        //         (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
        // );

        // dispatch(setFilteredEmails([
        //     ...(res ?? []).filter(
        //         (d: any) =>
        //             (d.title && d.title.toLowerCase().includes(searchText)) ||
        //             (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
        //             (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
        //             (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
        //     ),
        // ]));

        // if (filteredRes?.length) {
        //     pager.totalPages = pager.pageSize < 1 ? 1 : Math.ceil(filteredRes.length / pager.pageSize);
        //     if (pager.currentPage > pager.totalPages) {
        //         pager.currentPage = 1;
        //     }
        //     pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
        //     pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, filteredRes.length - 1);

        // } else {

        //     pager.startIndex = -1;
        //     pager.endIndex = -1;
        // }
        clearSelection();
    };

    const setArchive = () => {
        // if (ids.length) {
        //     let items = filteredMailList.filter((d: any) => ids.includes(d.id));
        //     for (let item of items) {
        //         item.type = item.type === 'archive' ? 'inbox' : 'archive';
        //     }
        //     if (selectedTab === 'archive') {
        //         showMessage(ids.length + ' Mail has been removed from Archive.');
        //     } else {
        //         showMessage(ids.length + ' Mail has been added to Archive.');
        //     }
        //     searchMails(false);
        // }
    };

    const setSpam = () => {
        // if (ids.length) {
        //     let items = filteredMailList.filter((d: any) => ids.includes(d.id));
        //     for (let item of items) {
        //         item.type = item.type === 'spam' ? 'inbox' : 'spam';
        //     }
        //     if (selectedTab === 'spam') {
        //         showMessage(ids.length + ' Mail has been removed from Spam.');
        //     } else {
        //         showMessage(ids.length + ' Mail has been added to Spam.');
        //     }
        //     searchMails(false);
        // }
    };

    const setGroup = (group: any) => {
        // if (ids.length) {
        //     let items = mailList?.result.filter((d: any) => ids.includes(d.id));
        //     for (let item of items) {
        //         item.group = group;
        //     }

        //     showMessage(ids.length + ' Mail has been grouped as ' + group.toUpperCase());
        //     clearSelection();
        //     setTimeout(() => {
        //         searchMails(false);
        //     });
        // }
    };

    const setAction = (type: any) => {
        // if (ids.length) {
        //     const totalSelected = ids.length;
        //     let items = filteredMailList.filter((d: any) => ids.includes(d.id));
        //     for (let item of items) {
        //         if (type === 'trash') {
        //             item.type = 'trash';
        //             item.group = '';
        //             item.isStar = false;
        //             item.isImportant = false;
        //             showMessage(totalSelected + ' Mail has been deleted.');
        //             searchMails(false);
        //         } else if (type === 'read') {
        //             item.isUnread = false;
        //             showMessage(totalSelected + ' Mail has been marked as Read.');
        //         } else if (type === 'unread') {
        //             item.isUnread = true;
        //             showMessage(totalSelected + ' Mail has been marked as UnRead.');
        //         } else if (type === 'important') {
        //             item.isImportant = true;
        //             showMessage(totalSelected + ' Mail has been marked as Important.');
        //         } else if (type === 'unimportant') {
        //             item.isImportant = false;
        //             showMessage(totalSelected + ' Mail has been marked as UnImportant.');
        //         } else if (type === 'star') {
        //             item.isStar = true;
        //             showMessage(totalSelected + ' Mail has been marked as Star.');
        //         }
        //         //restore & permanent delete
        //         else if (type === 'restore') {
        //             item.type = 'inbox';
        //             showMessage(totalSelected + ' Mail Restored.');
        //             searchMails(false);
        //         } else if (type === 'delete') {
        //             // setMailList(mailList?.result.filter((d: any) => d.id != item.id));
        //             showMessage(totalSelected + ' Mail Permanently Deleted.');
        //             searchMails(false);
        //         }
        //     }
        //     clearSelection();
        // }
    };

    // const selectMail = (item: any) => {
    //     if (item) {
    //         if (item.type !== 'draft') {
    //             if (item && item.isUnread) {
    //                 item.isUnread = false;
    //             }
    //             dispatch(setEmail(item));
    //         } else {
    //             // openMail('draft', item);
    //         }
    //     } else {
    //         dispatch(setEmail(null));
    //     }
    // };

    const showTime = (item: any) => {
        const displayDt: any = new Date(item.date);
        const cDt: any = new Date();
        if (displayDt.toDateString() === cDt.toDateString()) {
            return item.time;
        } else {
            if (displayDt.getFullYear() === cDt.getFullYear()) {
                var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return monthNames[displayDt.getMonth()] + ' ' + String(displayDt.getDate()).padStart(2, '0');
            } else {
                return String(displayDt.getMonth() + 1).padStart(2, '0') + '/' + String(displayDt.getDate()).padStart(2, '0') + '/' + displayDt.getFullYear();
            }
        }
    };




    // const saveMail = (type: any, id: any) => {
    //     if (!params.to) {
    //         showMessage('To email address is required.', 'error');
    //         return false;
    //     }
    //     if (!params.title) {
    //         showMessage('Title of email is required.', 'error');
    //         return false;
    //     }

    //     let maxId = 0;
    //     if (!params.id) {
    //         // maxId = mailList?.result.length ? mailList?.result.reduce((max, character) => (character.id > max ? character.id : max), mailList?.result[0].id) : 0;
    //     }
    //     let cDt = new Date();

    //     let obj: any = {
    //         id: maxId + 1,
    //         path: '',
    //         firstName: '',
    //         lastName: '',
    //         email: params.to,
    //         date: cDt.getMonth() + 1 + '/' + cDt.getDate() + '/' + cDt.getFullYear(),
    //         time: cDt.toLocaleTimeString(),
    //         title: params.title,
    //         displayDescription: params.displayDescription,
    //         type: 'draft',
    //         isImportant: false,
    //         group: '',
    //         isUnread: false,
    //         description: params.description,
    //         attachments: null,
    //     };
    //     if (params.file && params.file.length) {
    //         obj.attachments = [];
    //         for (let file of params.file) {
    //             let flObj = {
    //                 name: file.name,
    //                 size: getFileSize(file.size),
    //                 type: getFileType(file.type),
    //             };
    //             obj.attachments.push(flObj);
    //         }
    //     }
    //     if (type === 'save' || type === 'save_reply' || type === 'save_forward') {
    //         //saved to draft
    //         obj.type = 'draft';
    //         emails.splice(0, 0, obj);
    //         searchMails();
    //         showMessage('Mail has been saved successfully to draft.');
    //     } else if (type === 'send' || type === 'reply' || type === 'forward') {
    //         //saved to sent mail
    //         obj.type = 'sent_mail';
    //         emails.splice(0, 0, obj);
    //         searchMails();
    //         showMessage('Mail has been sent successfully.');
    //     }

    //     dispatch(setEmail(null));
    //     dispatch(setEdit(false))
    // };

    const getFileSize = (file_type: any) => {
        let type = 'file';
        if (file_type.includes('image/')) {
            type = 'image';
        } else if (file_type.includes('application/x-zip')) {
            type = 'zip';
        }
        return type;
    };

    const getFileType = (total_bytes: number) => {
        let size = '';
        if (total_bytes < 1000000) {
            size = Math.floor(total_bytes / 1000) + 'KB';
        } else {
            size = Math.floor(total_bytes / 1000000) + 'MB';
        }
        return size;
    };

    const clearSelection = () => {
        dispatch(setEmailIds([]))
    };


    // const changeValue = (e: any) => {
    //     const { value, id } = e.target;
    //     setParams({ ...params, [id]: value });
    // };

    const handleCheckboxChange = (id: any) => {
        if (emailIds.includes(id)) {
            dispatch(setEmailIds(emailIds.filter((d: string) => d !== id)))

            // setIds((value: any) => value.filter((d: any) => d !== id));
        } else {
            dispatch(setEmailIds([...emailIds, id]));
        }
    };

    const checkAllCheckbox = () => {
        if (filteredEmails.length && emailIds.length === filteredEmails.length) {
            return true;
        } else {
            return false;
        }
    };

    const closeMsgPopUp = () => {
        dispatch(setEdit(false))

        // dispatch(setSelectedTab('inbox'));

        searchMails();
    };


    // const openMail = (type: string, item: any) => {
    //     if (type === 'add') {
    //         dispatch(setShowMailMenu(false))

    //         setParams(JSON.parse(JSON.stringify(defaultParams)));
    //     } else if (type === 'draft') {
    //         let data = JSON.parse(JSON.stringify(item));
    //         setParams({
    //             ...data,
    //             from: defaultParams.from,
    //             to: data.email,
    //             displayDescription: data.email,
    //         });
    //     } else if (type === 'reply') {
    //         let data = JSON.parse(JSON.stringify(item));
    //         setParams({
    //             ...data,
    //             from: defaultParams.from,
    //             to: data.email,
    //             title: 'Re: ' + data.title,
    //             displayDescription: 'Re: ' + data.title,
    //         });
    //     } else if (type === 'forward') {
    //         let data = JSON.parse(JSON.stringify(item));
    //         setParams({
    //             ...data,
    //             from: defaultParams.from,
    //             to: data.email,
    //             title: 'Fwd: ' + data.title,
    //             displayDescription: 'Fwd: ' + data.title,
    //         });
    //     }
    //     dispatch(setEdit(true))
    // };


    return (
        <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_165px)] mt-5">
            <div
                className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowMailMenu ? '!block xl:!hidden' : ''}`}
                onClick={() => dispatch(setShowMailMenu(!isShowMailMenu))}
            />

            {/* Sidebar */}
            <EmailSidebar
                tabChanged={tabChanged}
            />

            {/* Right box */}
            <div className="panel h-full flex-1 overflow-x-hidden p-0">

                {/* Right box header */}
                {pathname === '/emails' && (
                    <div className="flex flex-col">

                        {/* Header */}
                        <EmailHeader
                            checkAllCheckbox={checkAllCheckbox}
                            ids={emailIds}
                            filteredMailList={emails}
                            selectedTab={selectedTab || 'INBOX'}
                            refreshMails={refreshMails}
                            setArchive={setArchive}
                            setSpam={setSpam}
                            setAction={setAction}
                            isShowMailMenu={isShowMailMenu}
                        />

                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]" />

                        {/* Sub Header */}
                        <EmailSubHeader
                            tabChanged={tabChanged}
                            pager={emails?.details}
                            searchMails={searchMails}
                            filteredMailList={emails?.result || []}
                        />

                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

                    </div>
                )}

                {children}

            </div>


        </div>
    )
}
