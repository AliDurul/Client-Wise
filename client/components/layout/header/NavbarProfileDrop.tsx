'use client'
import React from "react";
import Dropdown from "../Dropdown";
import Image from "next/image";
import Link from "next/link";
import {
  ProfileLockScreen,
  ProfileMailBoxIcon,
  ProfileSigninIcon,
  UserProfileIcon,
} from "@/icons";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { truncateText } from "@/lib/utility/functions";


const NavbarProfileDrop = () => {
  const { userInfo, isLoading } = useCurrentUser();

  return (
    <div className="dropdown flex shrink-0">
      {
        isLoading ? (
          <div className="size-8 animate-pulse bg-gray-300 rounded-full" />
        ) : (
          <Dropdown
            offset={[0, 8]}
            placement="bottom-end"
            btnClassName="relative group block"
            button={
              <Image
                width={32}
                height={32}
                className="rounded-full object-cover saturate-50 group-hover:saturate-100"
                src={userInfo?.profile_pic ? `${userInfo?.profile_pic}` : '/assets/images/profile-pic.png'}
                alt="userProfile"
              />
            }
          >
            <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
              <li>
                <div className="flex items-center px-4 py-4">
                  <Image
                    width={40}
                    height={40}
                    className=" rounded-md object-cover"
                    src={userInfo?.profile_pic ? `${userInfo?.profile_pic}` : '/assets/images/profile-pic.png'}
                    alt="userProfile"
                  />
                  <div className="ltr:pl-4 rtl:pr-4">
                    <h4 className="text-base">
                      {userInfo?.first_name}{" "}{userInfo?.last_name}
                      {/* <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                    Admin
                  </span> */}
                    </h4>
                    <button
                      type="button"
                      className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                    >
                      {truncateText(userInfo?.email || '', 15)}
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/#" className="flex items-center gap-2 px-4 py-3 rounded hover:bg-slate-700 dark:hover:bg-slate-700 dark:hover:text-white">
                  <UserProfileIcon />
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/#" className="flex items-center gap-2 px-4 py-3 rounded hover:bg-slate-700 dark:hover:bg-slate-700 dark:hover:text-white">
                  <ProfileMailBoxIcon />
                  Mailbox
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="flex items-center gap-2 px-4 py-3 rounded hover:bg-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <ProfileLockScreen />
                  Lock Screen
                </Link>
              </li>
              <li className="border-t border-white-light dark:border-white-light/10">
                <button className="w-full text-left !py-3 !pl-4 text-danger flex items-center gap-2 hover:bg-slate-700 dark:hover:bg-slate-700"
                  onClick={() => signOut()}
                >
                  <ProfileSigninIcon />
                  Sign Out
                </button>
              </li>
            </ul>
          </Dropdown>
        )
      }
    </div>
  );
};

export default NavbarProfileDrop;
