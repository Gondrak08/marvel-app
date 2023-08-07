'use client'
import React, { useContext } from 'react';
import { usePathname } from 'next/navigation'
import { CiSearch } from 'react-icons/ci';
import UtilsContext from '../context/utils-provider';
import {RxHamburgerMenu} from 'react-icons/rx'


export default function Navbar({ openSidebar }: { openSidebar: () => void }) {
    const pathName = usePathname()
    const { setSearch } = useContext(UtilsContext);
    return (
        <section className='w-full h-[58px] border border-transparent border-b-mv-divider '>
            <nav className='w-full h-full flex justify-between md:justify-normal items-center px-10'>
                <RxHamburgerMenu className='visible md:invisible w-7 h-7 md:w-0 md:h-0 p-0 rounded text-black focus:ring-4  transform active:scale-75 transition-transform'
                    onClick={() => {
                        openSidebar();
                    }}
                    
                    />
                {
                    pathName === '/home' && (
                        <div className='flex items-center gap-2 w-fit h-full '>
                            <CiSearch className='w-[15px] h-[15px] text-mv-blue-200 ' />
                            <input name='search-bar' type='search' placeholder='Busque um agente' className='placeholder-mv-blue-200 border-none rounded-md p-2 focus:border-transparent active:border-transparent font-epilogue font-500 text-[12px] '
                                onChange={(e: any) => { setSearch(e.target.value) }}
                            />
                        </div>
                    )
                }
            </nav>
        </section>
    )
};

