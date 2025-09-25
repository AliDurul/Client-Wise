'use client';
import React, { useEffect, useState } from 'react'
import EmailSidebar from '@/components/dashboard/email/EmailSidebar';
import EmailHeader from '@/components/dashboard/email/EmailHeader';
import EmailSubHeader from '@/components/dashboard/email/EmailSubHeader';
import useSWR from 'swr';
import { getAllData } from '@/lib/features/shared/actionUtils';
import toast from 'react-hot-toast';
// import EmailEdit from '@/components/dashboard/email/EmailEdit';
import EmailRead from '@/components/dashboard/email/EmailRead';
import { Email } from '@/types';
import EmailList from '@/components/dashboard/email/EmailList';
import { EmailListSkeleton } from '@/components/dashboard/email/EmailSkeletons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectedEmailTab, selectEmail, setEmail, setSelectedTab } from '@/lib/features/email/emailSlice';
import dynamic from 'next/dynamic';
const EmailEdit = dynamic(() => import('@/components/dashboard/email/EmailEdit'), { 
    ssr: false 
});

export default function page() {

    // api
    const { data: mailList, isLoading } = useSWR<{ result: Email[], success: boolean }>('emails', () => getAllData({ url: 'emails', }), {
        onError: (err) => {
            console.log('err', err);
            toast.error(err?.message ?? 'Error fetching emails', { duration: 3000 });
        },
        onSuccess: (data) => {
            setFilteredMailList(data?.result?.filter((d) => d.labelIds?.includes('INBOX')) || []);
        }
    });

    const defaultParams = {
        id: null,
        from: 'alidrl26@mail.com',
        to: '',
        cc: '',
        title: '',
        file: null,
        description: '',
        displayDescription: '',
    };

    const selectedTab = useAppSelector(selectedEmailTab);
    const selectedEmail = useAppSelector(selectEmail);
    const dispatch = useAppDispatch();


    const [isShowMailMenu, setIsShowMailMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [filteredMailList, setFilteredMailList] = useState<Email[]>([]);
    const [ids, setIds] = useState<any>([]);
    const [searchText, setSearchText] = useState<any>('');
    // const [selectedMail, setSelectedMail] = useState<Email | null>(null);
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [pagedMails, setPagedMails] = useState<any>([]);

    const isRtl = false;

    const [pager] = useState<any>({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    useEffect(() => {
        searchMails();
    }, [selectedTab, searchText, mailList?.result]);

    const refreshMails = () => {
        setSearchText('');
        searchMails(false);
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

    const selectMail = (item: any) => {
        if (item) {
            if (item.type !== 'draft') {
                if (item && item.isUnread) {
                    item.isUnread = false;
                }
                dispatch(setEmail(item));
            } else {
                openMail('draft', item);
            }
        } else {
            dispatch(setEmail(null));
        }
    };

    const setStar = (mailId: number) => {
        // if (mailId) {
        //     let item = filteredMailList.find((d: any) => d.id === mailId);
        //     item.isStar = !item.isStar;
        //     setTimeout(() => {
        //         searchMails(false);
        //     });
        // }
    };

    const setImportant = (mailId: number) => {
        // if (mailId) {
        //     let item = filteredMailList.find((d: any) => d.id === mailId);
        //     item.isImportant = !item.isImportant;
        //     setTimeout(() => {
        //         searchMails(false);
        //     });
        // }
    };

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



    const searchMails = (isResetPage = true) => {
        if (isResetPage) {
            pager.currentPage = 1;
        }
        let res;
        if (selectedTab === 'important') {
            res = mailList?.result.filter((d) => d.labelIds?.includes('IMPORTANT'));
        } else if (selectedTab === 'star') {
            res = mailList?.result.filter((d) => d.labelIds?.includes('STAR'));
        } else if (selectedTab === 'updates') {
            res = mailList?.result.filter((d) => d.labelIds?.includes('CATEGORY_UPDATES'));
        } else if (selectedTab === 'forums') {
            res = mailList?.result.filter((d) => d.labelIds?.includes('CATEGORY_FORUMS'));
        } else if (selectedTab === 'inbox') {
            res = mailList?.result.filter((d) => d.labelIds?.includes('INBOX'));
        }

        let filteredRes = res?.filter(
            (d) =>
                (d.title && d.title.toLowerCase().includes(searchText)) ||
                (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
                (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
                (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
        );

        setFilteredMailList([
            ...(res ?? []).filter(
                (d) =>
                    (d.title && d.title.toLowerCase().includes(searchText)) ||
                    (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
                    (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
                    (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText))
            ),
        ]);

        if (filteredRes?.length) {
            pager.totalPages = pager.pageSize < 1 ? 1 : Math.ceil(filteredRes.length / pager.pageSize);
            if (pager.currentPage > pager.totalPages) {
                pager.currentPage = 1;
            }
            pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
            pager.endIndex = Math.min(pager.startIndex + pager.pageSize - 1, filteredRes.length - 1);
            setPagedMails([...filteredRes.slice(pager.startIndex, pager.endIndex + 1)]);
        } else {
            setPagedMails([]);
            pager.startIndex = -1;
            pager.endIndex = -1;
        }
        clearSelection();
    };

    const saveMail = (type: any, id: any) => {
        if (!params.to) {
            showMessage('To email address is required.', 'error');
            return false;
        }
        if (!params.title) {
            showMessage('Title of email is required.', 'error');
            return false;
        }

        let maxId = 0;
        if (!params.id) {
            // maxId = mailList?.result.length ? mailList?.result.reduce((max, character) => (character.id > max ? character.id : max), mailList?.result[0].id) : 0;
        }
        let cDt = new Date();

        let obj: any = {
            id: maxId + 1,
            path: '',
            firstName: '',
            lastName: '',
            email: params.to,
            date: cDt.getMonth() + 1 + '/' + cDt.getDate() + '/' + cDt.getFullYear(),
            time: cDt.toLocaleTimeString(),
            title: params.title,
            displayDescription: params.displayDescription,
            type: 'draft',
            isImportant: false,
            group: '',
            isUnread: false,
            description: params.description,
            attachments: null,
        };
        if (params.file && params.file.length) {
            obj.attachments = [];
            for (let file of params.file) {
                let flObj = {
                    name: file.name,
                    size: getFileSize(file.size),
                    type: getFileType(file.type),
                };
                obj.attachments.push(flObj);
            }
        }
        if (type === 'save' || type === 'save_reply' || type === 'save_forward') {
            //saved to draft
            obj.type = 'draft';
            mailList?.result.splice(0, 0, obj);
            searchMails();
            showMessage('Mail has been saved successfully to draft.');
        } else if (type === 'send' || type === 'reply' || type === 'forward') {
            //saved to sent mail
            obj.type = 'sent_mail';
            mailList?.result.splice(0, 0, obj);
            searchMails();
            showMessage('Mail has been sent successfully.');
        }

        dispatch(setEmail(null));

        setIsEdit(false);
    };

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
        setIds([]);
    };

    const tabChanged = (tabType: any) => {
        setIsEdit(false);
        setIsShowMailMenu(false);
        dispatch(setEmail(null));
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const handleCheckboxChange = (id: any) => {
        if (ids.includes(id)) {
            setIds((value: any) => value.filter((d: any) => d !== id));
        } else {
            setIds([...ids, id]);
        }
    };

    const checkAllCheckbox = () => {
        if (filteredMailList.length && ids.length === filteredMailList.length) {
            return true;
        } else {
            return false;
        }
    };

    const closeMsgPopUp = () => {
        setIsEdit(false);
        dispatch(setSelectedTab('inbox'));

        searchMails();
    };

    const showMessage = (msg = '', type = 'success') => {

        // toast
    };

    // console.log('orgi mails', mailList?.result);

    // --------------------------------------

    const openMail = (type: string, item: any) => {
        if (type === 'add') {
            setIsShowMailMenu(false);
            setParams(JSON.parse(JSON.stringify(defaultParams)));
        } else if (type === 'draft') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                displayDescription: data.email,
            });
        } else if (type === 'reply') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                title: 'Re: ' + data.title,
                displayDescription: 'Re: ' + data.title,
            });
        } else if (type === 'forward') {
            let data = JSON.parse(JSON.stringify(item));
            setParams({
                ...data,
                from: defaultParams.from,
                to: data.email,
                title: 'Fwd: ' + data.title,
                displayDescription: 'Fwd: ' + data.title,
            });
        }
        setIsEdit(true);
    };

    function decodeBase64Url(data: any) {
        const b64 = data.replace(/-/g, '+').replace(/_/g, '/');
        return decodeURIComponent(escape(window.atob(b64)));
    }

    function getMessageBody(payload: any) {
        if (payload.parts && payload.parts.length) {
            const htmlPart = payload.parts.find(
                (part: any) => part.mimeType === "text/html"
            );
            if (htmlPart && htmlPart.body && htmlPart.body.data) {
                return decodeBase64Url(htmlPart.body.data);
            }
            const textPart = payload.parts.find(
                (part: any) => part.mimeType === "text/plain"
            );
            if (textPart && textPart.body && textPart.body.data) {
                return decodeBase64Url(textPart.body.data);
            }
        }
        if (payload.body && payload.body.data) {
            return decodeBase64Url(payload.body.data);
        }
        return "";
    }

    return (
        <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">

            <div className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowMailMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowMailMenu(!isShowMailMenu)} />

            {/* Sidebar */}
            <EmailSidebar
                isShowMailMenu={isShowMailMenu}
                setIsShowMailMenu={setIsShowMailMenu}
                tabChanged={tabChanged}
                openMail={openMail}
            />

            <div className="panel h-full flex-1 overflow-x-hidden p-0">
                {!selectedEmail && !isEdit && (
                    <div className="flex h-full flex-col">

                        {/* Header */}
                        <EmailHeader
                            checkAllCheckbox={checkAllCheckbox}
                            ids={ids}
                            setIds={setIds}
                            filteredMailList={filteredMailList}
                            refreshMails={refreshMails}
                            setArchive={setArchive}
                            setSpam={setSpam}
                            setAction={setAction}
                            setIsShowMailMenu={setIsShowMailMenu}
                            isShowMailMenu={isShowMailMenu}
                        />

                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]" />

                        {/* Sub Header */}
                        <EmailSubHeader
                            tabChanged={tabChanged}
                            pager={pager}
                            searchMails={searchMails}
                            filteredMailList={filteredMailList}
                        />

                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

                        {
                            isLoading ? <EmailListSkeleton /> : <EmailList
                                pagedMails={filteredMailList}
                                ids={ids}
                                selectMail={selectMail}
                                handleCheckboxChange={handleCheckboxChange}
                                setStar={setStar}
                                setImportant={setImportant}
                                showTime={showTime}
                            />
                        }

                    </div>
                )}

                {selectedEmail && !isEdit && (
                    <EmailRead
                        setStar={setStar}
                        setImportant={setImportant}
                        openMail={openMail}
                        getMessageBody={getMessageBody}
                    />
                )}

                {isEdit && (
                    <EmailEdit
                        params={params}
                        setParams={setParams}
                        setIsShowMailMenu={setIsShowMailMenu}
                        isShowMailMenu={isShowMailMenu}
                        closeMsgPopUp={closeMsgPopUp}
                        saveMail={saveMail}
                        changeValue={changeValue}
                    />
                )}
            </div>
        </div>
    )
}
