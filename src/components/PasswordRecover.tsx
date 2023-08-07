
'use client'
import React, { useState, useEffect } from "react";
import {fetchRecoverPassword} from '@/services/fetchPasswordRecover';
import { MdAlternateEmail } from 'react-icons/md'

const titleStyle = 'font-epilogue font-[700] text-[28px] md:text-[36px] text-mv-blue-600 leading-[36.9px] tracking-[-6.5%] '
const subtextStyle = 'font-epilogue font-[400] text-[16px] text-mv-gray-500 leading-[20.32px] tracking-[-6.5%]';
const inputStyles = ' w-full font-epilogue font-[700] placeholder-mv-gray-400 text-[16px] text-mv-blue-500 leading-[16.4px] tracking-[-6.5%] py-[20px] px-[15px] border-[1px] border-mv-gray-400 rounded-md focus:outline-none focus:border-mv-blue-500 focus:ring-1 focus:ring-mv-blue-500 autofill:text-mv-blue-500'

type SetTypeFunction = React.Dispatch<React.SetStateAction<string>>;
type SendTypeEmail = React.Dispatch<React.SetStateAction<Boolean>>;

const SendEmail: React.FC<{ sendEmail: SendTypeEmail }> = ({ sendEmail }) => {
    const [email, setEmail] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string, value: string } = e.target;
        setEmail(value);
    };

    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response =  await fetchRecoverPassword(email);
        if(response?.status === 200) { return sendEmail(true)}
        if(response?.status === 404) { return setIsError(true)}
    };

    const UserErrorMessage = () => {
        return (
            <div className='absolute w-full bottom-[-2em] bg-mv-orange-500 text-white text-[12px] p-2 rounded-md rounded-tl-none rounded-tr-none z-50'>
                <h1>Usuário invalido. Tente outro</h1>
            </div>
        )
    }

    useEffect(()=>{
        if(isError){
            setTimeout(()=>{setIsError(false)},1400)
        }
     
    },[isError,])

    return (
        <>
            <div className='w-full  flex flex-col gap-5'>
                <h1 className={titleStyle} >Recuperar senha<span className='text-mv-orange-500'>.</span></h1>

                <span className={subtextStyle} >
                    Informe o e-mail do seu cadastro. Nós estaremos realizando o envio de um link com as instruções para você redefinir a sua senha.
                </span>
            </div>

            <div className='flex flex-col gap-3' >

                <div className='flex flex-col gap-4' >
                    <div className='w-full relative'>
                        <input name='email' type='email' placeholder='Email' value={email}
                            className={`${inputStyles} ${isError && 'border-mv-orange-500'} `}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                        <label className={`
                        ${ email.length > 0 ? 'text-mv-blue-500' : 'text-mv-gray-400'}
                        ${isError && 'text-[#f21a05!important]'} 
                         focus:text-mv-blue-500 absolute right-5 top-5 bottom-0`} 
                         >
                            <MdAlternateEmail color='inherit' />
                        </label>
                        {isError && <UserErrorMessage/>}
                    </div>
                </div>
                <button onClick={(e: any) => onSubmit(e)}
                    disabled={email.length > 0 ? false : true}
                    className={`
                ${email.length > 0 ? 'bg-mv-blue-600' : 'cursor-not-allowed bg-gray-200'}
                w-full rounded-md py-[16px] flex items-center justify-center gap-2  font-epilogue text-[20px] md:text-[24px] leading-[24.6px] tracking-[-6.5%] text-mv-gray-150 font-[700] hover:opacity-[.9] 
                `}>
                    enviar link
                </button>
            </div>
        </>
    )
}

const ReturnLogin: React.FC<{ setType: SetTypeFunction }> = ({ setType }) => {

    return (
        <div className='flex flex-col gap-5'>
           
                <h1 className={titleStyle} >Tudo certo <span className='text-mv-orange-500'>;)</span></h1>

                <span className={subtextStyle} >
                    Foi enviado um e-mail para você com instruções de como redefinir a sua senha.
                </span>
            
                <button onClick={(e: any) => { setType('login') }}
                    className='bg-mv-blue-600 w-full rounded-md py-[16px] flex items-center justify-center gap-2  font-epilogue text-[20px] md:text-[24px] leading-[24.6px] tracking-[-6.5%] text-mv-gray-150 font-[700] hover:opacity-[.9] 
                '>
                    volte para o login
                </button>
            
        </div>
    )
}
const PasswordRecover: React.FC<{ setType: SetTypeFunction }> = ({ setType }) => {
    const [isEmailSent, setIsEmailSent] = useState<Boolean>(false)
    console.log('isEmailSent-->', isEmailSent);
    return (
        <div className='max-w-[390px] h-full self-end bg-mv-white rounded-[28px] px-2 md:px-[1.8em] py-[2.5em] w-full  flex flex-col gap-2 box-border'>
            {!isEmailSent ?
                <SendEmail sendEmail={setIsEmailSent} /> :
                <ReturnLogin setType={setType} />
            }
        </div>
    )
}

export default PasswordRecover;
