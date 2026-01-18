import {Images} from "../../Images.js";
import Filter from "../Components/Filter.jsx";
import StarsCarsCard from "../Components/StarsCarsCard.jsx";
import {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";

export default function SellerPage() {
    const location = useLocation();
    const [slice, setSlice] = useState(6);
    const [carData, setCarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dataFromState = location.state?.carData

    useEffect(() => {
        if (dataFromState) {
            fetch(`http://localhost:3000/cars/seller/${dataFromState.seller}`)
                .then(res => res.json())
                .then(data => setCarData(data))
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }

    }, [location]);

    const handleClick = () => {
        setSlice((prev) => prev + 6);
    }

    return (
        <main>
            {isLoading ? (
                <div className="flex justify-center items-center h-[586px] text-[#009661] text-[6rem]">Error 404</div>
            ) : (
                <>
                    <div className='w-full bg-white h-[280px] flex justify-center items-center'>
                        <div className='w-7/10 h-8/10 flex flex-col items-start justify-between'>
                            <div className='h-[50px]'>

                            </div>
                            <h1 className='text-[5rem] font-bold'>Продавец {dataFromState.seller}</h1>
                            <div className='h-[60px] flex items-center justify-between'>
                                <button
                                    className='h-full px-8! rounded-2xl bg-[#009661] text-white text-[2rem] uppercase'>написать
                                    продавцу
                                </button>
                                <NavLink to='/'
                                         className='ml-8! h-full flex justify-center items-center text-[2rem] text-[#009661]'>Про
                                    компанию</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='h-[50px]'></div>
                    <div className='w-7/10 flex justify-between items-start'>
                        <Filter/>
                        <div className='flex flex-col justify-between items-start w-7/10'>
                            <div className='flex w-full flex-wrap h-[50px]'>

                            </div>
                            <div className='w-full grid grid-cols-2 gap-x-4'>
                                {carData.slice(0, slice).map((item, index) => (
                                    <StarsCarsCard key={index} {...item}/>
                                ))}
                            </div>
                            <div className='w-full h-[60px] flex justify-center'>
                                <button onClick={handleClick}
                                        className='h-full w-[185px] bg-[#009661] text-white text-[2rem] rounded-2xl'>Загрузить
                                    ещё
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='h-[50px]'></div>
                    <div className='w-full bg-white h-[500px] flex justify-center items-center'>
                        <div className='w-7/10 h-8/10 flex flex-col items-start justify-between'>
                            <h1 className='text-[3rem]'>Продавец {dataFromState.seller}</h1>
                            <div className='w-8/10 flex flex-col items-start justify-between'>
                                <h2 className='text-[2rem] mb-4!'>Кто таки ОТП Лизинг?</h2>
                                <p className='text-[1.6rem] text-gray-500'>«ОТП Лізинг» – універсальна лізингова
                                    компанія, входить до складу
                                    європейської фінансової групи OTP Group, яка протягом десятиліть має надійну
                                    репутацію в усій Европі.
                                    Компанія «ОТП Лізинг» була заснована в червні 2008 року як дочірнє підприємство АТ
                                    «ОТП Банк». ОТП Лізинг –
                                    єдина лізингова компанія на українському ринку, що належить міжнародній банківській
                                    групі, акції якої
                                    котируються на Лондонській фондовій біржі. Портфель компанії на вересень 2019 року
                                    становить 8,2 млрд. грн</p>
                            </div>
                            <div className='w-8/10 flex flex-col items-start justify-between'>
                                <h2 className='text-[2rem] mb-4!'>Ну и еще пример текста</h2>
                                <p className='text-[1.6rem] text-gray-500'>Предварительные выводы неутешительны:
                                    перспективное планирование в
                                    значительной степени обусловливает важность укрепления моральных ценностей.</p>
                            </div>
                        </div>
                    </div>
                    <div className='relative w-full h-[620px] flex items-center'>
                        <div
                            className='left-15/100 absolute w-1/5 h-8/10 rounded-2xl bg-white flex justify-center items-center'>
                            <div className='w-8/10 h-9/10 flex flex-col items-start justify-between'>
                                <h2 className='text-[3rem] text-[#009661]'>Контакты</h2>
                                <div className='w-full flex items-center'>
                                    <img className='mr-4! h-[24px]' src={Images.location} alt=""/>
                                    <p className='text-[1.6rem]'>Київська обл., с. Петропавлівська Борщагівка, вул.
                                        Озерна 5</p>
                                </div>
                                <div className='w-full flex items-center'>
                                    <img className='mr-4! h-[24px]' src={Images.phone} alt=""/>
                                    <p className='text-[1.6rem]'>+380 (44) 500 1000</p>
                                </div>
                                <div className='w-full flex items-center'>
                                    <img className='mr-4! h-[24px]' src={Images.fax} alt=""/>
                                    <p className='text-[1.6rem]'>fax@otpleasing.com.ua</p>
                                </div>
                                <div className='w-full flex items-center'>
                                    <img className='mr-4! h-[24px]' src={Images.clock} alt=""/>
                                    <p className='text-[1.6rem]'>пн-пт 9:00 – 18:00</p>
                                </div>
                                <div className='w-full flex items-center'>
                                    <img className='mr-4! h-[24px]' src={Images.clock} alt=""/>
                                    <p className='text-[1.6rem]'>сб-нд вихідний</p>
                                </div>
                                <button
                                    className='w-full h-[60px] bg-[#009661] text-[2rem] text-white rounded-2xl uppercase'>Написать
                                    продавцу
                                </button>
                            </div>
                        </div>
                        <iframe
                            className='w-full h-full'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36885.152724473715!2d20.44443372863658!3d54.7039570146446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e33e00340bcaed%3A0x884fb8f41d3d61b8!2z0JHQuNC30L3QtdGBLdC60L7Qu9C70LXQtNC2!5e0!3m2!1sru!2sru!4v1768583219914!5m2!1sru!2sru"
                            allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </>
            )}
        </main>
    )
}