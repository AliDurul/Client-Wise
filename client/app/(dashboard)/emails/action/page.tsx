'use client';
import InputBox from '@/components/shared/InputBox';
import { sendEmail } from '@/lib/features/email/emailActions';
import { selectIsShowMailMenu, setShowMailMenu } from '@/lib/features/email/emailSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useActionState, useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new//dist/quill.snow.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function page() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const isShowMailMenu = useAppSelector(selectIsShowMailMenu);
    const [state, action, isPending] = useActionState(sendEmail, null);


    const [initialState, setInitialState] = useState({
        to: '',
        cc: '',
        from: 'alidrl26@mail.com',
        subject: '',
        body: '',
        description: '',
        displayDescription: '',
    })

    useEffect(() => {
        if (!state) return;

        if (state?.success) {
            toast.success(state?.message || 'Operation completed successfully');
            router.replace('/emails');
        } else {
            toast.error(state?.message || 'Operation failed');
        }
    }, [state]);

    return (
        <div className="relative">
            <div className="flex items-center py-4 px-6">
                <button
                    type="button"
                    className="block hover:text-primary ltr:mr-3 rtl:ml-3 xl:hidden"
                    onClick={() => dispatch(setShowMailMenu(!isShowMailMenu))}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">Message</h4>
            </div>
            <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black to-indigo-900/20 opacity-[0.1] dark:via-white" />
            <form className="grid gap-6 p-6" action={action}>

                <InputBox
                    type='text'
                    id='to'
                    name='to'
                    className="form-input"
                    placeholder="Enter To"
                    value={state?.inputs?.to}
                    errors={state?.errors?.to}
                />

                <InputBox
                    type='text'
                    id='cc'
                    name='cc'
                    className="form-input"
                    placeholder="Enter Cc"
                    value={state?.inputs?.cc}
                    errors={state?.errors?.cc}
                />

                <InputBox
                    type='text'
                    id='subject'
                    name='subject'
                    className="form-input"
                    placeholder="Enter Subject"
                    value={state?.inputs?.subject}
                    errors={state?.errors?.subject}
                />

                <div className="h-fit">
                    <ReactQuill
                        theme="snow"
                        value={initialState.description || ''}
                        defaultValue={initialState.description || ''}
                        onChange={(content, delta, source, editor) => {
                            setInitialState((prev) => ({ ...prev, description: content, displayDescription: editor.getText() }));
                        }}
                        style={{ minHeight: '200px' }}
                    />
                    <input
                        type="hidden"
                        name="htmlBody"
                        value={initialState.description || ''}
                    />
                    <input
                        type="hidden"
                        name="textBody"
                        value={initialState.displayDescription || ''}
                    />
                </div>

                <div>
                    {/* <input
                                name='attachments'
                                type="file"
                                className="form-input p-0 file:border-0 file:bg-primary/90 file:py-2 file:px-4 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5 rtl:file:ml-5"
                                multiple
                                accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                                required
                            /> */}
                </div>
                <div className="mt-8 flex items-center ltr:ml-auto rtl:mr-auto">
                    {/* <button type="button" className="btn btn-outline-danger ltr:mr-3 rtl:ml-3" onClick={closeMsgPopUp}>
                                Close
                            </button>
                            <button type="button" className="btn btn-success ltr:mr-3 rtl:ml-3" onClick={() => saveMail('save', null)}>
                                Save
                            </button> */}
                    <button type="submit" className="btn btn-primary" disabled={isPending} >
                        {isPending ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    )
}
