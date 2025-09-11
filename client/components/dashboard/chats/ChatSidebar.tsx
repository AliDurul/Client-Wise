import Dropdown from '@/components/layout/Dropdown';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AllChatsIcon, ContactIcon, GroupChatIcon, HelpIcon, SettingIcon, SingleChatIcon } from '@/icons/chat';
import { selectIsShowChatMenu, selectIsShowUserChat } from '@/lib/features/chat/chatSlice';
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
import { FaWhatsapp } from "react-icons/fa";

const Tabs = [
    { name: 'All', icon: <AllChatsIcon /> },
    { name: 'Chats', icon: <SingleChatIcon /> },
    { name: 'WhatsApp', icon: <FaWhatsapp className='size-5 mx-auto mb-1' /> },
    { name: 'Groups', icon: <GroupChatIcon /> },
    { name: 'Contacts', icon: <ContactIcon /> },
]

export default function ChatSidebar() {

    // hooks
    const { userInfo } = useCurrentUser();
    const isShowChatMenu = useAppSelector(selectIsShowChatMenu);
    const isShowUserChat = useAppSelector(selectIsShowUserChat);

    const [selectedTab, setSelectedTab] = useState('All')
    const selectedIndex = Tabs.findIndex(tab => tab.name === selectedTab);
    const [searchUser, setSearchUser] = useState('');
    const [filteredItems, setFilteredItems] = useState<Chat[]>([]);

    // api
    const { data: chats, isLoading } = useSWR('chats', () => getAllData({ url: 'chats/', customQuery: { limit: 100 } }), {
        onSuccess: (data) => {
            setFilteredItems(data?.result);
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
                if(selectedTab === 'WhatsApp' && c.source !== 'whatsapp') return false;

                // Search filtering
                if (c.is_group) {
                    return c.chat_name?.toLowerCase().includes(searchUser.toLowerCase());
                } else if (c.source === 'whatsapp' && c.customer) {
                    // WhatsApp chat: search by customer name or phone
                    return (
                        c.customer.full_name?.toLowerCase().includes(searchUser.toLowerCase()) ||
                        c.customer.phone_number?.includes(searchUser)
                    );
                } else {
                    // Internal chat: search by other user's name
                    const otherUser = c.users.find((u: PersonInfo) => u._id !== userInfo?.id);
                    return otherUser?.full_name.toLowerCase().includes(searchUser.toLowerCase());
                }
            });
        });
    }, [searchUser, chats, selectedTab]);

    return (
        <aside className={`panel rounded-l-none  absolute h-full z-10 hidden w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block xl:h-full ${isShowChatMenu ? '!block' : ''}`}>
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


            <TabGroup className="h-[calc(100vh_-_335px)]" selectedIndex={selectedIndex} onChange={i => setSelectedTab(Tabs[i].name)}>
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
                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />

                <TabPanels className="flex-1 h-full">
                    <TabPanel className="h-full flex-1">
                        {
                            isLoading ? <ChatSidebarListSkeleton /> : <ChatSidebarList filteredItems={filteredItems} showGroupBtn={true} />
                        }
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarList filteredItems={filteredItems} />
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarList filteredItems={filteredItems} />
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarList filteredItems={filteredItems} showGroupBtn={true} />
                    </TabPanel>
                    <TabPanel>
                        <ChatSidebarContactList chats={chats?.result} setTabAll={() => setSelectedTab('All')} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>



        </aside>
    )
}
