import Filter from "../Components/Filter.jsx";
import StarsCarsCard from "../Components/StarsCarsCard.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ErrorPage from "./404.jsx";

export default function SearchPage() {
    const location = useLocation();
    const [slice, setSlice] = useState(6);
    const [carData, setCarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filtredData = location.state?.carData;
    const searchQuery = location.state?.searchQuery;

    useEffect(() => {
        try{
            if(filtredData) {
                setCarData(filtredData);
            }else if(searchQuery){
                performSearch(searchQuery);
            }else{
                fetch(`http://localhost:3000/cars`)
                    .then(res => res.json())
                    .then(data => setCarData(data))
            }
            setIsLoading(true)
        }catch(err) {
            setIsLoading(false);
        }

    }, [])

    const performSearch = async (query) => {
        try {
            const response = await fetch('http://localhost:3000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            const data = await response.json();
            setCarData(data);
        } catch (error) {
            console.error('Ошибка поиска:', error);
        }
    };

    const handleClick = () => {
        setSlice((prev) => prev + 6);
    }

    return (
        <>
            {isLoading ? (
                <main>
                    <div className='h-[50px]'></div>
                    <div className='w-95/100 lg:w-7/10 flex flex-col md:flex-row justify-between items-start'>
                        <Filter />
                        <div className='flex flex-col justify-between items-start w-95/100 md:w-7/10'>
                            <div className='flex w-full flex-wrap h-[50px]'>

                            </div>
                            <div className='w-full grid grid-cols-2 gap-x-4'>
                                {carData.slice(0, slice).map((item, index) => (
                                    <StarsCarsCard key={index} {...item}/>
                                ))}
                            </div>
                            <div className='w-full h-[60px] flex justify-center'>
                                <button onClick={handleClick} className='h-full w-[185px] bg-[#009661] text-white text-[2rem] rounded-2xl'>Загрузить ещё</button>
                            </div>
                        </div>
                    </div>
                    <div className='h-[50px]'></div>
                </main>
            ) : (
                <ErrorPage />
            )}
        </>
    )
}