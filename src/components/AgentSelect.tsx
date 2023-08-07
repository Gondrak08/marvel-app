import React, { useState, useEffect, useContext } from 'react';
import { redirect, useRouter } from 'next/navigation';
import  getCharacters  from '../services/getCharacters';
import Select, { components, OptionProps } from 'react-select';
import UtilsContext from '../context/utils-provider';
import Loading from './Loading';
import { useSession } from 'next-auth/react';

const titleStyle = 'font-epilogue font-[700] text-[28px] md:text-[36px] text-mv-blue-600 leading-[36.9px] tracking-[-6.5%]'
const subtextStyle = 'font-epilogue font-[400] text-[16px] text-mv-gray-500 leading-[20.32px] tracking-[-6.5%]';

const Placeholder = (props: any) => {
    return <components.Placeholder {...props}>
        <div className='flex w-full items-center gap-2'>
            <img src="/user.svg" />
            {props?.selectProps?.placeholder}
        </div>
    </components.Placeholder>
};

const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <img src="/chevron-down.svg" />
        </components.DropdownIndicator>
    )
};

const Option = (props: OptionProps<any, false>) => {
    const { innerProps, data } = props;
    const isSelected = props.data === props.getValue()[0]
    return (
        <div {...innerProps} className="flex items-center  w-full gap-2 font-inter text-[16px] leading-[24px] p-2">
            <div className='w-full flex gap-2 items-center'>
                <div className="relative rounded-full  h-[24px] w-[24px] ">
                    <img className="absolute w-full rounded-full h-full object-cover bg-center"
                        src={`${data?.thumbnail.path}/portrait_small.${data?.thumbnail.extension}`} />
                </div>
                {data.name}
            </div>

            {isSelected && <img src="/check.svg" className='w-fit h-fit' />}
        </div>

    )
};

const SingleValue = (props: any) => {
    const { data, selectProps } = props;

    return (
        <div {...props} className="flex absolute top-0 left-0 bottom-0 right-0 items-center w-full gap-2 p-2 font-inter text-[16px] leading-[24px]">
            <div className="relative rounded-full h-[24px] w-[24px] ">
                <img
                    className="absolute w-full rounded-full h-full object-cover bg-center"
                    src={`${data?.thumbnail.path}/portrait_small.${data?.thumbnail.extension}`}
                />
            </div>
            {data.name}
        </div>
    );
};

const SelectAgent = () => {
    const {data:session} = useSession()
    if(session === null){redirect('/')};
    
    const { push } = useRouter()
    const { agentId, setAgentId } = useContext(UtilsContext);
    const [agents, setAgents] = useState<[]>([]);
    const [selectAgent, setSelectAget] = useState<any>([]);
    const [isPushed, setIsPusehd] = useState<boolean>(false);
    
    

    useEffect(() => {
        if (agents !== undefined && agents.length === 0) {
            getAvatars();
        }

    }, [agents]);

    async function getAvatars() {
        const res: any = await getCharacters();
        setAgents(res.data.results)
    };

    const handleSelectAvatar = (selectedAgent: any) => {
        const id: string = JSON.stringify(selectedAgent?.id);
        setSelectAget(selectedAgent);
        setAgentId(id);
    };

    const onSubmit = (e: any) => {
        e.preventDefault;
        setIsPusehd(true);
        push(`profile/${agentId}`)
    };
   
    return (
        <div className='max-w-[405px] w-full h-fit self-end bg-mv-white rounded-[28px] px-[1.8em] py-[2.5em]  flex flex-col gap-2 box-border'>
            {
                !isPushed && (
                    <>
                        <div className='w-full  flex flex-col gap-5'>
                            <h1 className={titleStyle} >Selecione o seu agente mais legal<span className='text-mv-orange-500'>.</span></h1>

                            <span className={subtextStyle} >
                                Tenha a visão completa do seu agente.
                            </span>
                        </div>

                        <div className='flex flex-col gap-3' >

                            <div className='flex flex-col gap-4' >

                                <div className='w-full relative'>

                                    <Select
                                        id={agentId}
                                        components={{ Placeholder, DropdownIndicator, Option, SingleValue }}
                                        closeMenuOnSelect={false}
                                        placeholder={'selecione agente'}
                                        onChange={handleSelectAvatar}
                                        defaultValue={selectAgent}
                                        options={agents}
                                        getOptionValue={(option) => option.code}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.hasValue ? '#213770' : '',
                                                boxShadow: state.hasValue
                                                    ? '0px 1px 2px rgba(33, 55, 112, 0.1)'
                                                    : '',
                                            }),
                                            option: (baseStyles, state) => ({
                                                ...baseStyles,
                                                backgroundColor: 'white',
                                                color: 'black',
                                                boxShadow: '0px 4px 6px -2px #10182808',
                                                '&:hover': {
                                                    backgroundColor: '#F9FAFB'
                                                }
                                            }),
                                            indicatorSeparator: () => ({ display: "none" }),
                                            singleValue: (baseStyles) => ({
                                                ...baseStyles,
                                                width: '100%',
                                                height: '100%' 
                                            }),
                                        }}
                                    />

                                </div>


                            </div>
                            <button disabled={agentId.length <= 0 ? true : false}
                                onClick={(e: any) => { onSubmit(e) }}
                                className={`w-[88px] self-end rounded-md py-[12px] px-[20px] flex items-center justify-center gap-2  font-inter font-[600] text-[16px] leading-[24px]  text-mv-white  hover:opacity-[.9] ${agentId.length <= 0 ? 'bg-mv-gray-400 cursor-not-allowed' : 'bg-mv-blue-600'} `} >
                                entrar
                            </button>
                        </div>
                    </>
                )
            }


            {isPushed && (
                <div className="w-full  flex flex-col gap-5">
                    <h1 className={titleStyle} >Bem Vindo</h1>

                    <span className={subtextStyle} >
                        Entrando.... Apenas levará um minuto. 
                    </span>
                    <Loading/>
                </div>

            )}

        </div>
    );
};

export default SelectAgent;