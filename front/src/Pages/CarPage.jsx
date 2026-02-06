import {Images} from "../../Images.js";
import {NavLink, useLocation} from "react-router-dom";
import CarReview from "../Components/CarReview.jsx";
import {useEffect, useState} from "react";
import TopCarsCard from "../Components/TopCarsCard.jsx";
import ErrorPage from "./404.jsx";

export default function CarPage() {
    const location = useLocation();
    const [isClicked, setClicked] = useState(false);
    const [carData, setCarData] = useState();
    const [likeACar, setLikeACar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [write, setWrite] = useState(false);
    const [user, setUser] = useState('');
    const [sellerData, setSellerData] = useState([]);
    const [messageFromSeller, setMessageFromSeller] = useState('');

    const dataFromState = location.state?.carData
    const localUser = localStorage.getItem("user");

    useEffect(() => {
        fetch(`http://localhost:3000/cars`)
            .then(res => res.json())
            .then(data => setLikeACar(data))
        if (dataFromState) {
            setCarData(dataFromState);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
        setUser(JSON.parse(localUser))
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [location]);

    const handleClick = () => {
        setClicked(!isClicked);
    }

    const handleWrite = () => {
        setWrite(!write);
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            const seller = await fetch(`http://localhost:3000/api/get_userByName/${carData.seller}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const sellerdata = await seller.json();
            setSellerData(sellerdata.user)
            const result = await fetch('http://localhost:3000/api/create_messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender_name: user.name,
                    message: messageFromSeller,
                    user_id: sellerData.id,
                    sender_id: user.id,
                })
            })
            const data = await result.json();
            if (data.success) {
                setMessageFromSeller('')
            } else {
                console.log(data.success)
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <main>
            {isLoading ? (
                <ErrorPage/>
            ) : (
                <>
                    <div className='h-[50px]'></div>
                    <div className='w-95/100 lg:w-7/10 flex justify-between items-start relative'>
                        <div className='flex flex-col items-start justify-between w-full md:w-55/100'>
                            <div className='flex flex-col justify-between items-center w-full h-[600px]'>
                                <img className='w-full h-3/4 rounded-2xl object-cover' src={carData.image} alt=""/>
                                <div className='flex justify-between items-center w-full h-1/5'>
                                    <img className='h-full max-w-10/45 rounded-2xl object-cover' src={carData.image}
                                         alt=""/>
                                    <img className='h-full max-w-10/45 rounded-2xl object-cover' src={carData.image}
                                         alt=""/>
                                    <img className='h-full max-w-10/45 rounded-2xl object-cover' src={carData.image}
                                         alt=""/>
                                    <img className='h-full max-w-10/45 rounded-2xl object-cover' src={carData.image}
                                         alt=""/>
                                </div>
                            </div>
                            <div className='h-[50px]'></div>
                            {isMobile && (
                                <>
                                    <div
                                        className='w-full flex flex-col justify-between items-center top-[138px]'>
                                        <div
                                            className='flex justify-center items-center w-full h-[330px] bg-white rounded-[1rem]'>
                                            <div className='w-95/100 h-9/10 flex flex-col items-start justify-between'>
                                                <div className='flex justify-between items-center w-full'>
                                                    <h1 className='text-[3rem] w-9/10'>{carData.mark} {carData.model}</h1>
                                                </div>
                                                <p className='text-gray-500 text-[1.6rem]'>{carData.stat}</p>
                                                <div
                                                    className='w-full h-1/3 flex items-center justify-center border-y-[1px] border-gray-200'>
                                                    <div className='w-full h-1/2 flex items-center justify-between'>
                                                        <div
                                                            className='flex flex-col justify-between items-start w-1/3 h-full'>
                                                            <p className='text-gray-500 text-[1.6rem]'>Год выпуска</p>
                                                            <h3 className='text-[1.8rem]'>{carData.year}</h3>
                                                        </div>
                                                        <div
                                                            className='flex flex-col justify-between items-start w-1/3 h-full'>
                                                            <p className='text-gray-500 text-[1.6rem]'>Пробег</p>
                                                            <h3 className='text-[1.8rem]'>{carData.runned}</h3>
                                                        </div>
                                                        <div
                                                            className='flex flex-col justify-between items-start w-1/3 h-full'>
                                                            <p className='text-gray-500 text-[1.6rem]'>Цена брутто</p>
                                                            <h3 className='text-[1.8rem]'>{carData.brutto_price}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <NavLink to='/seller_page' state={{carData: carData}}
                                                         className='text-[1.8rem] text-[#009661]'>Смотреть все
                                                    позиции продавца {carData.seller}</NavLink>
                                            </div>
                                        </div>
                                        <div
                                            className='w-full fixed bottom-0 h-[105px] z-11 flex items-center justify-center bg-white rounded-[1rem]'>
                                            <div className='w-9/10 h-7/10 flex items-center justify-between'>
                                                <h3 className='text-[4rem] text-[#009661]'>{carData.price}</h3>
                                                <div className='w-10/25 flex h-full justify-between items-center'>
                                                    <img className='h-1/2 cursor-pointer' src={Images.fullHeart}
                                                         alt=""/>
                                                    <button
                                                        className='h-full px-12! bg-[#009661] text-white rounded-2xl text-[1.8rem] uppercase'>Написать
                                                        продавцу
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='h-[50px]'></div>
                                </>
                            )}
                            <div className='w-full flex flex-col items-start justify-between'>
                                <h1 className='text-[3rem]'>Обзор транспортного средства</h1>
                                <div className='h-[30px]'></div>
                                <div className='w-full flex flex-col items-center justify-between'>
                                    <CarReview index={0} statsName='Категория' stats={carData.category}/>
                                    <CarReview index={1} statsName='Марка' stats={carData.mark}/>
                                    <CarReview index={2} statsName='Модель' stats={carData.model}/>
                                    <CarReview index={3} statsName='Год (начиная с)' stats={carData.year}/>
                                    <CarReview index={4} statsName='Пробег' stats={carData.runned}/>
                                    <CarReview index={5} statsName='Страна' stats={carData.country}/>
                                    <CarReview index={6} statsName='Вес' stats={carData.weight}/>
                                </div>
                            </div>
                            <div className='h-[80px]'></div>
                            <div className='w-full flex flex-col items-start justify-between'>
                                <h1 className='text-[3rem] mb-12! '>Описание</h1>
                                <div className='w-full flex flex-col items-start justify-between'>
                                    <h2 className='text-[2rem] mb-4!'>{carData.head_stat}</h2>
                                    <p className='text-gray-500 text-[1.6rem] mb-8!'>{carData.rewiew}</p>
                                </div>
                                {isClicked && (
                                    <>
                                        <div className='w-full flex flex-col items-start justify-between'>
                                            <h2 className='text-[2rem] mb-4!'>{carData.head_stat}</h2>
                                            <p className='text-gray-500 text-[1.6rem] mb-8!'>{carData.rewiew}</p>
                                        </div>
                                        <div className='w-full flex flex-col items-start justify-between'>
                                            <h2 className='text-[2rem] mb-4!'>Ну и еще пример текста</h2>
                                            <p className='text-gray-500 text-[1.6rem] mb-8!'>Предварительные выводы
                                                неутешительны: перспективное планирование
                                                в значительной степени обусловливает важность укрепления моральных
                                                ценностей.</p>
                                        </div>
                                    </>
                                )}
                                <button onClick={handleClick}
                                        className='text-[2rem] text-[#009661]'>{isClicked ? 'Скрыть' : 'Показать больше'}</button>
                            </div>
                        </div>
                        {!isMobile && (
                            <div className='w-43/100 flex flex-col justify-between items-center sticky top-[138px]'>
                                <div
                                    className='flex justify-center items-center w-full h-[330px] bg-white rounded-[1rem]'>
                                    <div className='w-95/100 h-9/10 flex flex-col items-start justify-between'>
                                        <div className='flex justify-between items-center w-full'>
                                            <h1 className='text-[3rem] w-9/10'>{carData.mark} {carData.model}</h1>
                                            <img className='h-1/2 cursor-pointer' src={Images.fullHeart} alt=""/>
                                        </div>
                                        <p className='text-gray-500 text-[1.6rem]'>{carData.stat}</p>
                                        <div
                                            className='w-full h-1/3 flex items-center justify-center border-y-[1px] border-gray-200'>
                                            <div className='w-full h-1/2 flex items-center justify-between'>
                                                <div className='flex flex-col justify-between items-start w-1/3 h-full'>
                                                    <p className='text-gray-500 text-[1.6rem]'>Год выпуска</p>
                                                    <h3 className='text-[1.8rem]'>{carData.year}</h3>
                                                </div>
                                                <div className='flex flex-col justify-between items-start w-1/3 h-full'>
                                                    <p className='text-gray-500 text-[1.6rem]'>Пробег</p>
                                                    <h3 className='text-[1.8rem]'>{carData.runned}</h3>
                                                </div>
                                                <div className='flex flex-col justify-between items-start w-1/3 h-full'>
                                                    <p className='text-gray-500 text-[1.6rem]'>Цена брутто</p>
                                                    <h3 className='text-[1.8rem]'>{carData.brutto_price}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <NavLink to='/seller_page' state={{carData: carData}}
                                                 className='text-[1.8rem] text-[#009661]'>Смотреть все
                                            позиции продавца {carData.seller}</NavLink>
                                    </div>
                                </div>
                                <div className='h-[20px]'></div>
                                <div
                                    className='w-full h-[105px] flex items-center justify-center bg-white rounded-[1rem]'>
                                    <div className='w-9/10 h-7/10 flex items-center justify-between'>
                                        <h3 className='text-[4rem] text-[#009661]'>{carData.price}</h3>
                                        <button
                                            onClick={handleWrite}
                                            className='h-full w-1/2 bg-[#009661] text-white rounded-2xl text-[1.8rem] uppercase'>Написать
                                            продавцу
                                        </button>
                                        {write && (
                                            <div
                                                className='w-4/10 h-[100px] fixed z-9 flex flex-col items-center justify-around bg-white rounded-2xl left-1/3'>
                                                <div
                                                    className='h-1/4 w-9/10 flex items-center justify-end text-[1.5rem] cursor-pointer'
                                                    onClick={handleWrite}>close
                                                </div>
                                                <div
                                                    className='w-9/10 h-1/2 border-[1px] text-[2rem] border-gray-500 flex items-center justify-around'>
                                                    <input value={messageFromSeller}
                                                           onChange={(e) => setMessageFromSeller(e.target.value)}
                                                           className='w-7/10 h-2/3 outline-0'
                                                           type="text" placeholder='задайте свой вопрос продавцу'/>
                                                    <button onClick={handleUpload}
                                                            className='w-2/10 h-3/4 uppercase bg-[#009661] text-white rounded-2xl'>отправить
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='h-[50px]'></div>
                    <div className='h-[2px] w-7/10 bg-gray-200'></div>
                    <div className='h-[100px]'></div>
                    <div className='w-95/100 lg:w-7/10 flex-col flex items-start justify-between'>
                        <h1 className='text-[3rem]'>Похожие объявления</h1>
                        <div className='h-[50px]'></div>
                        <div className='w-full grid grid-cols-3 lg:grid-cols-4 gap-x-8'>
                            {likeACar.map((item, index) => (
                                <TopCarsCard key={index} {...item}/>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}