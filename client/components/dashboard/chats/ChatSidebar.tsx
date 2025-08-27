import Dropdown from '@/components/layout/Dropdown';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AllChatsIcon, ContactIcon, GroupChatIcon, HelpIcon, SettingIcon, SingleChatIcon } from '@/icons/chat';
import { selectIsShowChatMenu, selectIsShowUserChat, selectSelectedChat, setIsShowChatMenu, setIsShowUserChat, setSelectedChat } from '@/lib/features/chat/chatSlice';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Chat, PersonInfo } from '@/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import ChatSidebarList from './ChatSidebarList';
import ChatSidebarListSkeleton from './ChatSidebarListSkeleton';
import ChatSidebarContactList from './ChatSidebarContactList';
import Image from 'next/image';

const Tabs = [
    { name: 'All', icon: <AllChatsIcon /> },
    { name: 'Chats', icon: <SingleChatIcon /> },
    { name: 'Groups', icon: <GroupChatIcon /> },
    { name: 'Contacts', icon: <ContactIcon /> },
]

export default function ChatSidebar() {

    // hooks
    const dispatch = useAppDispatch();
    const { userInfo } = useCurrentUser();
    const isShowChatMenu = useAppSelector(selectIsShowChatMenu);
    const isShowUserChat = useAppSelector(selectIsShowUserChat);

    const [selectedTab, setSelectedTab] = useState('All')
    const [searchUser, setSearchUser] = useState('');
    const [filteredItems, setFilteredItems] = useState<Chat[]>([]);

    // api
    const { data: chats, isLoading } = useSWR('chats', () => getAllData({ url: 'chats/', customQuery: { limit: 100 } }), {
        onSuccess: (data) => {
            setFilteredItems(data.result);
        }
    });


    // functions
    useEffect(() => {
        if (!chats?.result) return;

        setFilteredItems(() => {
            return chats.result.filter((c: Chat) => {
                // Tab filtering
                if (selectedTab === 'Chats' && c.is_group) return false;
                if (selectedTab === 'Groups' && !c.is_group) return false;
                // Search filtering
                if (c.is_group) {
                    return c.chat_name?.toLowerCase().includes(searchUser.toLowerCase());
                } else {
                    const otherUser = c.users.find((u: PersonInfo) => u._id !== userInfo?.id);
                    return otherUser?.full_name.toLowerCase().includes(searchUser.toLowerCase());
                }
            });
        });
    }, [searchUser, chats, selectedTab]);

    const scrollToBottom = () => {
        if (isShowUserChat) {
            setTimeout(() => {
                const element: any = document.querySelector('.chat-conversation-box');
                element.behavior = 'smooth';
                element.scrollTop = element.scrollHeight;
            });
        }
    };

    const selectUser = (chat: Chat) => {
        dispatch(setSelectedChat(chat));
        dispatch(setIsShowUserChat(true));
        scrollToBottom();
        dispatch(setIsShowChatMenu(false));
    };

    return (
        <aside className={`panel absolute z-10 hidden w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block xl:h-full ${isShowChatMenu ? '!block' : ''}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-none">
                        <Image src={userInfo?.profile_pic || '/assets/images/profile-pic.jpeg'} width={48} height={48} className="h-12 w-12 rounded-full object-cover" alt="" />
                    </div>
                    <div className="mx-3">
                        <p className="mb-1 font-semibold">{userInfo?.first_name} {userInfo?.last_name}</p>
                        <p className="text-xs text-white-dark">{userInfo?.email}</p>
                    </div>
                </div>
                <div className="dropdown">
                    <Dropdown
                        offset={[0, 5]}
                        placement='bottom-end'
                        btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center hover:text-primary"
                        button={
                            <svg className="opacity-70" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        }
                    >
                        <ul className="whitespace-nowrap">
                            <li>
                                <button type="button">
                                    <SettingIcon />
                                    Settings
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <HelpIcon />
                                    Help & feedback
                                </button>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </div>

            {
                selectedTab !== 'Contacts' && (
                    <div className="relative">
                        <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                        <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </div>
                    </div>
                )
            }

            <TabGroup>
                <TabList className="flex items-center justify-between text-xs mb-4">
                    {Tabs.map((tab, i) => (
                        <Tab key={i}>
                            {({ selected }) => (
                                <button onClick={() => { setSelectedTab(tab.name) }} type="button" className={`${selected ? 'text-primary' : 'hover:text-primary'}`}>
                                    {tab.icon}
                                    {tab.name}
                                </button>
                            )}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {
                            isLoading ? <ChatSidebarListSkeleton /> : <ChatSidebarList selectUser={selectUser} filteredItems={filteredItems} showGroupBtn={true} />
                        }
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarList selectUser={selectUser} filteredItems={filteredItems} />
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarList selectUser={selectUser} filteredItems={filteredItems} showGroupBtn={true} />
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarContactList />
                    </TabPanel>
                </TabPanels>
            </TabGroup>

            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />


        </aside>
    )
}
