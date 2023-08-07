import { useContext } from 'react';
import UtilsContext from '@/context/utils-provider';
import Link from 'next/link'

interface ICard {
    id: number,
    title: string,
    description: string,
    image: string,
    link: string
}
export default function Card({ id, title, description, image, link }: ICard) {
    const {setAgentId} = useContext(UtilsContext);
    return (
        <>
            <Link  onClick={()=>{setAgentId(JSON.stringify(id))}} rel="noopener noreferrer" href={`profile/${id}`} className="flex gap-3 p-4 rounded-[15px] w-full h-[150px] bg-mv-gray-bg hover:cursor-pointer drop-shadow-md ">
                <div className="crad-image-wrapper h-full w-[10em] relative rounded-md overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover bg-center absolute rounded-md" />
                </div>
                <div className="w-full flex flex-col gap-2 box-border overflow-hidden py-1" >
                    <h2 className="font-epilogue font-[500] text-mv-black text-[16px] leading-[16.4px] tracking-[-3%]">
                        {title}
                    </h2>
                    <p className="font-epilogue font-[300] text-[12px] text-ellipsis ">
                        {description}
                    </p>
                </div>
            </Link>
        </>
    )
}