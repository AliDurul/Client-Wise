'use client';

import ReactQuill from 'react-quill-new';
import 'react-quill-new//dist/quill.snow.css';


interface EmailEditProps {
    params: any;
    setParams: (params: any) => void;
    setIsShowMailMenu: (isShow: boolean) => void;
    isShowMailMenu: boolean;
    closeMsgPopUp: () => void;
    saveMail: (action: string, id: string | null) => void;
    changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailEdit({ params, setIsShowMailMenu, isShowMailMenu, closeMsgPopUp, saveMail, changeValue, setParams }: EmailEditProps) {


    return (
        <div className="relative">
            <div className="flex items-center py-4 px-6">
                <button type="button" className="block hover:text-primary ltr:mr-3 rtl:ml-3 xl:hidden" onClick={() => setIsShowMailMenu(!isShowMailMenu)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">Message</h4>
            </div>
            <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black to-indigo-900/20 opacity-[0.1] dark:via-white" />
            <form className="grid gap-6 p-6">
                <div>
                    <input
                        id="to"
                        type="text"
                        className="form-input"
                        placeholder="Enter To"
                        defaultValue={params.to}
                        onChange={(e) => {
                            changeValue(e);
                        }}
                    />
                </div>

                <div>
                    <input id="cc" type="text" className="form-input" placeholder="Enter Cc" defaultValue={params.cc} onChange={(e) => changeValue(e)} />
                </div>

                <div>
                    <input id="title" type="text" className="form-input" placeholder="Enter Subject" defaultValue={params.title} onChange={(e) => changeValue(e)} />
                </div>

                <div className="h-fit">
                    <ReactQuill
                        theme="snow"
                        value={params.description || ''}
                        defaultValue={params.description || ''}
                        onChange={(content, delta, source, editor) => {
                            params.description = content;
                            params.displayDescription = editor.getText();
                            setParams({
                                ...params,
                            });
                        }}
                        style={{ minHeight: '200px' }}
                    />
                </div>

                <div>
                    <input
                        type="file"
                        className="form-input p-0 file:border-0 file:bg-primary/90 file:py-2 file:px-4 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5 rtl:file:ml-5"
                        multiple
                        accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                        required
                    />
                </div>
                <div className="mt-8 flex items-center ltr:ml-auto rtl:mr-auto">
                    <button type="button" className="btn btn-outline-danger ltr:mr-3 rtl:ml-3" onClick={closeMsgPopUp}>
                        Close
                    </button>
                    <button type="button" className="btn btn-success ltr:mr-3 rtl:ml-3" onClick={() => saveMail('save', null)}>
                        Save
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => saveMail('send', params.id)}>
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}
