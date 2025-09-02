import { MessageNoDataAvaibleIcon, MessagesCloseIcon, MessagesIcon, NotificationCongratulationsIcon, NotificationInfo, NotificationSomeThingWrong, NotificationWarning, ViewAllActivityIcon } from '@/icons';
import React, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown';
import socket from '@/lib/sockets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MessageNotification {
  sender: {
    _id: string;
    profile_pic: string;
    full_name: string;
  };
  content: string;
  chat: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  is_group: boolean;
  chat_name: string | null;
  chat_pic: string | null;
  group_admin: string | null;
  users: string[];
}

const NavbarMessagesDrop = () => {

  // hooks
  const [messages, setMessages] = useState<MessageNotification[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log('burasi calisti');
    socket?.on('newMsgNotification', (msgNotification: MessageNotification) => {
      console.log('Notification received:', msgNotification);
      // dispatch(setMessagesState(notification))
      setMessages(prevMessages => [msgNotification, ...prevMessages]);
    })
    return () => {
      if (socket) {
        socket.off('newMsgNotification')
      }
    }

  }, [socket]);

  const removeMessage = (value: string) => {
    setMessages(messages?.filter((message) => message._id !== value));
  };
  return (
    <div className="dropdown shrink-0">
      <Dropdown
        offset={[0, 8]}
        placement='bottom-end'
        btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
        button={
          <>
          <MessagesIcon />
            {
              messages.length > 0 && (
                <span className="badge absolute ltr:right-0 rtl:left-0 -top-3 bg-primary text-[10px] p-0.5 px-1.5 rounded-full">{messages.length}</span>
              )
           }
          </>
          
        }
      >
        <ul className="w-[300px] !py-0 text-xs text-dark dark:text-white-dark sm:w-[375px]">
          <li className="mb-3" onClick={(e) => e.stopPropagation()}>
            <div className="relative !h-[68px] w-full overflow-hidden rounded-t-md p-5 text-white hover:!bg-transparent">
              <div className="bg- absolute inset-0 h-full w-full bg-[url(/assets/images/menu-heade.jpg)] bg-cover bg-center bg-no-repeat"></div>
              <h4 className="relative z-10 text-lg font-semibold">Messages</h4>
            </div>
          </li>
          {messages.length > 0 ? (
            <>
              <li onClick={(e) => e.stopPropagation()}>
                {messages?.map((message) => {

                  let displayPic = message.is_group ? message.chat_pic : message.sender.profile_pic;
                  let displayName = message.is_group ? message.chat_name : message.sender.full_name;

                  return (
                    <div key={message._id} className="flex items-center py-3 px-5">
                      <Image
                        src={displayPic || ''}
                        alt={displayName || ''}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className="px-3 dark:text-gray-500">
                        <div className="text-sm font-semibold dark:text-white-light/90">{displayName}</div>
                        <div className='line-clamp-2'>{message.content}</div>
                      </span>
                      <span className="whitespace-pre rounded bg-white-dark/20 px-1 font-semibold text-dark/60 ltr:ml-auto ltr:mr-2 rtl:mr-auto rtl:ml-2 dark:text-white-dark">
                        {message.createdAt.slice(11, 16)}
                      </span>
                      <button type="button" className="text-neutral-300 hover:text-danger" onClick={() => removeMessage(message._id)}>
                        <MessagesCloseIcon />
                      </button>
                    </div>
                  );
                })}
              </li>
              <li className="mt-5 border-t border-white-light text-center dark:border-white/10">
                <button onClick={() => router.push(`/chats`) } type="button" className="group !h-[48px] justify-center !py-4 font-semibold text-primary dark:text-gray-400">
                  <span className="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW CHATS APP</span>
                  <ViewAllActivityIcon />
                </button>
              </li>
            </>
          ) : (
            <li className="mb-5" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
                <div className="mx-auto mb-4 rounded-full text-white ring-4 ring-primary/30">
                  <MessageNoDataAvaibleIcon />
                </div>
                No data available.
              </button>
            </li>
          )}
        </ul>
      </Dropdown>
    </div>
  )
}

export default NavbarMessagesDrop