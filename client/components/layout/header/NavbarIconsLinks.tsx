import { CalenderIcon, ChatIcon, MailBox, TodoListIcon } from '@/icons'
import Link from 'next/link'
import { MdOutlineMarkEmailUnread } from "react-icons/md";
const NavbarIconsLinks = () => {
  return (
    <div className="hidden ltr:mr-2 rtl:ml-2 sm:block">
      <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
        <li>
          <Link href="/emails" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
            <MailBox />
          </Link>
        </li>
        <li>
          <Link href="/tickets" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
            <TodoListIcon />
          </Link>
        </li>
        <li>
          <Link href="/chats" className="block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60">
            <ChatIcon />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavbarIconsLinks