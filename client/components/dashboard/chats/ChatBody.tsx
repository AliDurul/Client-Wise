import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatBodyHeader from './ChatBodyHeader';
import ChatBodyFooter from './ChatBodyFooter';
import { selectSelectedChat } from '@/lib/features/chat/chatSlice';



const loginUser = {
    id: 0,
    name: 'Alon Smith',
    path: 'profile-34.jpeg',
    designation: 'Software Developer',
};


export default function ChatBody() {

    // hooks
    const selectedChat = useAppSelector(selectSelectedChat);

    // api
    console.log('api called');

    return (
        <div className="relative h-full">

            <ChatBodyHeader />

            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />

            <PerfectScrollbar className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]">
                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                    <div className="m-6 mt-0 block">
                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                            <span className="relative top-2 bg-white px-3 dark:bg-black">{'Today, ' + selectedChat.time}</span>
                        </h4>
                    </div>
                    {selectedChat.messages && selectedChat.messages.length ? (
                        <>
                            {selectedChat.messages.map((message: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <div className={`flex items-start gap-3 ${selectedChat.userId === message.fromUserId ? 'justify-end' : ''}`}>
                                            <div className={`flex-none ${selectedChat.userId === message.fromUserId ? 'order-2' : ''}`}>
                                                {selectedChat.userId === message.fromUserId ? (
                                                    <img src={`/assets/images/${loginUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                                ) : (
                                                    ''
                                                )}
                                                {selectedChat.userId !== message.fromUserId ? (
                                                    <img src={`/assets/images/${selectedChat.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${message.fromUserId === selectedChat.userId
                                                            ? '!bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none'
                                                            : 'ltr:rounded-bl-none rtl:rounded-br-none'
                                                            }`}
                                                    >
                                                        {message.text}
                                                    </div>
                                                    <div className={`${selectedChat.userId === message.fromUserId ? 'hidden' : ''}`}>
                                                        <svg
                                                            className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                            <path
                                                                d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                                                                fill="currentColor"
                                                            />
                                                            <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className={`text-xs text-white-dark ${selectedChat.userId === message.fromUserId ? 'ltr:text-right rtl:text-left' : ''}`}>
                                                    {message.time ? message.time : '5h ago'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </PerfectScrollbar>

            <ChatBodyFooter />

        </div>
    )
}
