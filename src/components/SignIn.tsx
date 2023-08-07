'use client'
import React, { useState, useEffect } from 'react';
import { MdAlternateEmail } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { signIn } from 'next-auth/react';
import Image from "next/image";
import SelectAgent from './AgentSelect';

type SetTypeFunction = React.Dispatch<React.SetStateAction<string>>;

const titleStyle = 'font-epilogue font-[700] text-[28px] md:text-[36px] text-mv-blue-600 leading-[36.9px] tracking-[-6.5%]'
const subtextStyle = 'font-epilogue font-[400] text-[16px] text-mv-gray-500 leading-[20.32px] tracking-[-6.5%]';
const inputStyles = ' w-full font-epilogue font-[700] placeholder-mv-gray-400 text-[16px] text-mv-blue-500 leading-[16.4px] tracking-[-6.5%] py-[20px] px-[15px] border-[1px] border-mv-gray-400 rounded-md focus:outline-none focus:border-mv-blue-500 focus:ring-1 focus:ring-mv-blue-500 autofill:text-mv-blue-500'


const SignIn: React.FC<{ setType: SetTypeFunction }> = ({ setType }) => {

    const [formValues, setFormValues] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isPassInvalid, seIsPassInvalid] = useState<boolean>(false);
    const [invalidUser, setInvalidUser] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value }: { name: string, value: string } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email: formValues.email,
                password: formValues.password,
                redirect: false,
            });
            
            if (res?.error === 'Invalid password') {
                seIsPassInvalid(true);
            } else if (res?.error === 'Invalid user') {
                setInvalidUser(true)
            } else if (res?.error === null && res?.status === 200) {
                setIsLogged(true);
            }
    
        } catch(error){
            console.log('signIn had an error', error)
        }
    }


    useEffect(()=>{
        if(isPassInvalid){
            setTimeout(()=>{seIsPassInvalid(false)},1400)
        }
        if(invalidUser) {
            setTimeout(()=>{setInvalidUser(false)},1400)
        }
    },[isPassInvalid,invalidUser])

    return (
        <>
            {!isLogged && (
                <div className='w-full max-w-[405px] h-full self-end bg-mv-white rounded-[28px] px-2 md:px-[1.8em] py-[2.5em] flex flex-col gap-2 box-border'>
                    <div className='w-full  flex flex-col gap-5'>
                        <h1 className={titleStyle} >Bem-vindo<span className='text-mv-orange-500'>.</span></h1>

                        <span className={subtextStyle} >
                            informe as suas credenciais de acesso ao portal
                        </span>
                    </div>

                    <div className='flex flex-col gap-3' >

                        <div className='flex flex-col gap-4' >
                            <div className='w-full relative'>
                                <input name='email' type='email' placeholder='Email' value=
                                    {formValues.email}
                                    className={`${inputStyles} ${invalidUser && 'border-orange-600'} `}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                                <label className={`${formValues.email.length > 0 ? 'text-mv-blue-500' : 'text-mv-gray-400'}
                                 ${invalidUser && 'text-[#f21a05!important]'}  
                                 focus:text-mv-blue-500 absolute right-5 top-5 bottom-0`}>
                                    <MdAlternateEmail color='inherit' />
                                </label>
                                {invalidUser && <UserErrorMessage/>}
                            </div>
                            <div className='w-full relative'>
                                <input name='password' type='password' placeholder='Password'
                                    value={formValues.password}
                                    className={`${inputStyles} ${isPassInvalid && 'border-orange-600'} `}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />

                                <label className={`${formValues.password.length > 0 ? 'text-mv-blue-500' : 'text-mv-gray-400'} 
                                 ${isPassInvalid && 'text-[#f21a05!important]'} focus:text-mv-blue-500 absolute right-5 top-5 bottom-0`}>
                                    <AiOutlineEye color='inherit' />
                                </label>
                                {isPassInvalid && (<PasswordErrorMessage/>)}
                            </div>


                        </div>
                        <button onClick={(e: any) => onSubmit(e)} className='w-full rounded-md py-[16px] px-[70px] md:px-[107px] flex items-center justify-center gap-2 bg-mv-blue-600 font-epilogue text-[20px] md:text-[24px] leading-[24.6px] tracking-[-6.5%] text-mv-gray-150 font-[700] hover:opacity-[.9] ' >entrar <Image src="/enter.svg" alt="enter-logo" className="w-3 h-3 " width={'100'} height={'100'} /> </button>
                    </div>

                    <div className='h-full flex justify-end item-center'>
                        <span onClick={(e: any) => setType('forggotpassword')} className="flex gap-2 items-center font-epilogue font-[400] text-[11px] text-mv-orange-700 cursor-pointer">
                            <Image src="/shield.svg" alt="shield logo" className="text-inherit w-[14px] h-[14px] " width={'100'} height={'100'} />
                            Esqueceu a senha?
                        </span>
                    </div>
                </div>
            )}
            {isLogged && <SelectAgent/>}
        </>
    )
};

export default SignIn;


const PasswordErrorMessage = () => {
    return (
        <div className='absolute w-full bottom-[-2em] bg-mv-orange-500 text-white text-[12px] p-2 rounded-md rounded-tl-none rounded-tr-none z-50'>
            <h1>Senha incorreta. Tente novamente</h1>
        </div>
    )
}

const UserErrorMessage = () => {
    return (
        <div className='absolute w-full bottom-[-2em] bg-mv-orange-500 text-white text-[12px] p-2 rounded-md rounded-tl-none rounded-tr-none z-50'>
            <h1>Usuário invalido. Tente outro</h1>
        </div>
    )
}