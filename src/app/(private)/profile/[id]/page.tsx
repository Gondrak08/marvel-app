'use client'
import { getCharacter } from '@/services/getCharacter';
import { useState, useEffect } from 'react';

export default function ProfilePage({ params }: { params: any }) {
    const id: number = params.id;
    const [hero, setHero] = useState<any[]>([]);
  
    const [type, setType] = useState<string>('general');

    const fetchCharacter = async () => {
        const data = await getCharacter(id);
        setHero(data.data.results);
    };

    useEffect(() => {
        if (hero.length === 0) {
            fetchCharacter();
        }

    }, []);


    if (hero.length === 0) {
        return null
    };
    const heroKeys = Object.keys(hero[0]);
    console.log('hero', heroKeys)

    const SwitchTabeComponents = ({ type }: { type: string }) => {
        switch (type) {
            case 'general':
                const { name, description } = hero[0];
                return (
                    <section className='rounded-lg drop-shadow-xl flex flex-wrap md:flex-nowrap gap-4 p-8 box-border bg-mv-white w-full max-w-[1116px] lg:h-[226px]' >
                        <div className='image-wrapper relative w-[5.5em] h-[5em]  rounded-full'>
                            <img src={`${hero[0]?.thumbnail.path}/portrait_medium.${hero[0]?.thumbnail.extension}`} alt={name} className="w-full h-full object-cover bg-center absolute rounded-full" />
                        </div>
                        <div className='flex flex-col gap-2 w-full' >
                            <h2 className='font-epilogue font-[700] text-mv-blue-600 text-[24px] leading-[24.6px] tracking-[-3%]'>
                                {name}
                            </h2>
                            <p className='font-epilogue font-[600] text-[16px] text-[#717171] leading-[24.56px] tracking-[-3%]' >{description}</p>
                        </div>
                    </section>
                );
                break;
            case 'teams':
                const groupAffiliation = hero[0].comics.items
                // const groupAffiliation = heroCharacteristics[0]?.connections['group-affiliation'].split(';');
                console.log(groupAffiliation)
                return (
                    <section className='  flex gap-4 p-8 box-border bg-mv-white max-w-[1116px] w-full h-full'>
                        <ul className='flex flex-col gap-1 list-disc font-inter font-[600] text-[16px] text-mv-gray-500 leading-[24px] capitalize ' >
                            {groupAffiliation?.map((title: any, index: number) => (
                                <li key={index} className='hover:cursor-pointer'>
                                    {title?.name}
                                </li>
                            ))}
                        </ul>

                    </section>
                );
                break;
            case 'powers':
                // const powers = heroCharacteristics?.[0]?.powerstats;
                // const powerKeys = powers ? Object.keys(powers) : [];
                const series = hero[0].series.items;
                console.log(series)
                return (
                    <section className='  flex gap-4 p-8 box-border bg-mv-white max-w-[1116px] w-full h-full'>
                        <ul className='flex flex-col gap-1 list-disc font-inter font-[600] text-[16px] text-mv-gray-500 leading-[24px] capitalize ' >
                            {series?.map((series: any, index: number) => (
                                <li key={index} className='hover:cursor-pointer'>
                                    {series.name}
                                </li>
                            ))}
                        </ul>

                    </section>
                );
                break;
            case 'species':
                const species = hero[0].stories.items
                // const specie = heroCharacteristics[0]?.appearance.race.split(';');
                console.log(species)
                return (
                    <section className='  flex gap-4 p-8 box-border bg-mv-white max-w-[1116px] w-full h-full'>
                         <ul className='flex flex-col gap-1 list-disc font-inter font-[600] text-[16px] text-mv-gray-500 leading-[24px] capitalize ' >
                            {species?.map((specie: any, index: number) => (
                                <li key={index} className='hover:cursor-pointer'>
                                    {specie.name}
                                </li>
                            ))}
                        </ul>

                    </section>
                )
                break;
            case 'authors':
                const authors = hero[0].events.items;
                console.log(authors)
                return (
                    <section className='  flex gap-4 p-8 box-border bg-mv-white max-w-[1116px] w-full h-full'>
                        <ul className='flex flex-col gap-1 list-disc font-inter font-[600] text-[16px] text-mv-gray-500 leading-[24px] capitalize ' >
                            {['stan lee', 'steve ditko'].map((title: string, index: number) => (
                                <li key={index} className='hover:cursor-pointer'>
                                    {title}
                                </li>
                            ))}
                        </ul>

                    </section>
                )
                break;
        }
    };

    const { name } = hero[0];
    const regex = /\s*\(.*?\)$/;
    const titleName = name.replace(regex, '');

    return (
        <section className="w-full h-full p-5 box-border flex flex-col gap-8">
            <div className='flex gap-1  items-center text-[24px] leading-[24.6px] tracking-[-3%]'>
                <h1 className='m-0 font-epilogue font-[700] text-mv-blue-600'>Perfil</h1>
                <span className='text-mv-orange-500 font-[700]'>/</span>
                <h2 className='font-[300] text-mv-gray-500 ' >{titleName}</h2>
            </div>

            <div className='flex flex-col gap-5' >
                <div className='tabs-container'>
                    <ul className='flex flex-wrap md:flex-nowrap gap-5 border border-transparent border-b-mv-divider py-5  '>
                        {['general', 'teams', 'powers', 'species', 'authors'].map((title: string, index: number) => (
                            <li key={index} className={`font-epilogue font-[500] text-[14px] leading-[20px] capitalize hover:cursor-pointer ${type === title ? 'text-mv-blue-600 underline underline-mv-orange-600 underline-offset-[25px] stroke-current ' : 'text-mv-gray-500 '} `}
                                onClick={(e: any) => { setType(title) }}
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>
                <SwitchTabeComponents type={type} />
            </div>
        </section>
    );
}