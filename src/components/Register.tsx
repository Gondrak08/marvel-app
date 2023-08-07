'use client'
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import SignIn from "./SignIn";
import PasswordRecover from "./PasswordRecover";

export default function Register() {
    const { data: session } = useSession()
    const [componentType, setComponentType] = useState<string>('login');
    
    return (
        <div className="responsive h-full w-full" >
            {
                componentType === "login" && (<SignIn setType={setComponentType} />)
            }
            {
                componentType === 'forggotpassword' && (<PasswordRecover setType={setComponentType} />)
            }
        </div>

    )
}