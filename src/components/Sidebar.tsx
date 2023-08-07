'use client'
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsArrow90DegLeft, BsArrowsAngleContract } from 'react-icons/bs';
import UtilsContext from '../context/utils-provider';
import { signOut } from 'next-auth/react'
import {useRouter, usePathname} from 'next/navigation'

interface ISideBar{
    sideBarExpand:boolean,
    openSidebar: () => void
}

const Sidebar = ({ sideBarExpand, openSidebar }:ISideBar) => {

    const pathName = usePathname();
    const regex = /^\/(home|profile)/;
    const path:any = pathName.match(regex);
   console.log( path[1])

    const { agentId } = useContext(UtilsContext);
    return (
        <aside className={`${sideBarExpand ? 'visible w-[65%]  z-50' : ' w-[0] invisible'} 
        absolute md:visible transition-all transform ease-in-out bg-mv-white md:w-[256px] h-screen  md:static top-0 left-0 z-0 font-epilogue font-[500] text-[13px] drop-shadow-md`}>
            <div className="logo-wrapper  w-full p-4 flex justify-between items-center" >
                <Image src="/logo_pontua_black.svg" alt="pontua-logo" width={"100"} height={"100"} />
                <BsArrowsAngleContract className="h-fit w-fit visible md:invisible"
                    onClick={() => {
                        openSidebar();
                        console.log('clicked');
                    }}
                />
            </div>
            <ul className={`${sideBarExpand ? 'visible' : 'invisible'}  md:visible h-fit flex flex-col gap-4 p-4 border border-transparent border-t-mv-divider border-b-mv-divider`} >

                <li className={` ${path[1] == 'home' ? ' text-mv-orange-700': '' } w-full`}>
                    <Link
                        href="/home"
                        className={`capitalize flex items-center rounded-md gap-3  border border-transparent hover:bg-mv-gray-bg p-1`}
                    >
                        <LuLayoutDashboard className="w-[20px] h-[20px]" />
                        Home
                    </Link>
                </li>
                <li className={` ${path[1] == 'profile' ? ' text-mv-orange-700': '' } w-full`}>
                    <Link
                        href={`/profile/${agentId}`}
                        className='capitalize flex items-center rounded-md gap-3  border border-transparent hover:bg-mv-gray-bg p-1'
                    >
                        <Image src="/perfil.svg" alt="perfil-logo" width={"100"} height={"100"} className='w-[20px] h-[20px]' />
                        Perfil
                    </Link>
                </li>
            </ul>
            <div className={`${sideBarExpand ? 'visible' : 'invisible'} md:visible w-full p-4 font-epilogue`} >
                <button className='w-full capitalize flex items-center rounded-md gap-3  border border-transparent hover:bg-mv-gray-bg p-1 '
                    onClick={() => {
                        signOut()
                    }}

                >
                    <BsArrow90DegLeft className="w-[20px] h-[20px]" />
                    Sair
                </button>
            </div>
        </aside>
    )
};

export default Sidebar;