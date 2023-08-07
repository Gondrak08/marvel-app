'use client'
import { useState, useEffect, useContext } from 'react';
import { getCharacters } from '@/services/getCharacters';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import UtilsContext from '@/context/utils-provider';


export default function HomePage() {
    const { search } = useContext(UtilsContext);
    const [heroes, setHeroes] = useState<any[]>([]);
    const [heroSelectedByName, setHeroSelectedByName] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        if (heroes !== undefined && heroes.length === 0) {
            fetchHeroes()
        }
    }, []);

    useEffect(() => {
        const filteredHeroesList = heroes.filter((hero) =>
            hero.name.toLowerCase().includes(search.toLowerCase())
        )
        setHeroSelectedByName(filteredHeroesList)
    }, [search])

    if (heroes.length === 0) return <Loading />

    async function fetchHeroes() {
        const res = await getCharacters();
        setHeroes(res?.data?.results);
    }


    const HeroesList = () => {
        const handlePageChange = (pageNumber: number) => {
            setCurrentPage(pageNumber)
        };
        const itemsPerPage: number = 10;
        const paginatedItems: any[] = [];

        for (let i = 0; i < heroes.length; i += itemsPerPage) {
            paginatedItems.push(heroes.slice(i, i + itemsPerPage));
        };

        const itemsToDisplay = paginatedItems[currentPage]?.slice(0, 8);
        const extraItems = paginatedItems[currentPage]?.slice(8);

        return (
            <>
                <div className="display-cards flex flex-col gap-5">
                    <div className="mx-auto  h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {Array.isArray(itemsToDisplay) && itemsToDisplay.map((hero: any, index: number) => (
                            <Card
                                key={index}
                                id={hero.id}
                                title={hero.name}
                                description={hero.description}
                                image={`${hero?.thumbnail.path}/portrait_medium.${hero?.thumbnail.extension}`}
                                link={''}
                            />
                        ))}
                    </div>
                    <div className="mx-auto w-full h-full flex flex-wrap md:flex-nowrap gap-5">
                        {Array.isArray(extraItems) && extraItems.map((hero: any, index: number) => (
                            <Card
                                key={index}
                                id={hero.id}
                                title={hero.name}
                                description={hero.description}
                                image={`${hero?.thumbnail.path}/portrait_medium.${hero?.thumbnail.extension}`}
                                link={''}
                            />
                        ))}
                    </div>
                </div >
                <div className='w-full py-5  border border-transparent border-t-mv-gray-200'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={paginatedItems.length}
                        onPageChange={handlePageChange}
                    />
                </div>
            </>
        )
    }

    const SearchList = () => {
        const handlePageChange = (pageNumber: number) => {
            setCurrentPage(pageNumber)
        };
        const itemsPerPage: number = 10;
        const paginatedItems: any[] = [];

        for (let i = 0; i < heroSelectedByName.length; i += itemsPerPage) {
            paginatedItems.push(heroSelectedByName.slice(i, i + itemsPerPage));
        };

        const itemsToDisplay = paginatedItems[currentPage]?.slice(0, 8);
        const extraItems = paginatedItems[currentPage]?.slice(8);

        return (
            <div className="mx-auto  h-full grid  md:grid-cols-3 grid-cols-4 gap-5">
                {Array.isArray(heroSelectedByName) && heroSelectedByName.map((hero: any, index: number) => (
                    <Card
                        key={index}
                        id={hero.id}
                        title={hero.name}
                        description={hero.description}
                        image={`${hero?.thumbnail.path}/portrait_medium.${hero?.thumbnail.extension}`}
                        link={''}
                    />
                ))}
            </div>
        )
    }

    return (
        <section className="w-full h-full p-5 box-border flex flex-col gap-8" >
            {
                search.length > 0 ? 
                <SearchList/>
                    : 
                <HeroesList/>
                    
            }
        </section >
    )
};
