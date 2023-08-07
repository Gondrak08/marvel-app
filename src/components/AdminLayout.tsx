'use client'
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import { useState } from "react";

export default function AdminProvider({ children }: any) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    return (
        <div className="flex w-full">
            <SideBar 
            sideBarExpand={isClicked} 
            openSidebar={()=>setIsClicked(!isClicked)}  
            />
            <div className="relative w-full h-full">
                <Navbar  openSidebar={()=>setIsClicked(!isClicked)} />
                {children}
            </div>
        </div>
    )
}