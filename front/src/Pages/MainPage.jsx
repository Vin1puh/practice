import {useEffect, useState} from "react";
import {Images} from "../../Images.js";
import InputForForm from "../Components/InputForForm.jsx";
import TopCarsCard from "../Components/TopCarsCard.jsx";
import {NavLink} from "react-router-dom";

export default function MainPage() {
    const buttons = [
        {id: 1, label: 'Транспорт'},
        {id: 2, label: 'Сельское хозяйство'},
        {id: 3, label: 'Строительство'},
        {id: 4, label: 'Погрузочное оборудование'},
    ]

    const [results, setResults] = useState(10);
    const [isActive, setIsActive] = useState(1);
    const [slice, setSlice] = useState(8);
    const [Card, setCard] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/cars')
            .then(res => res.json())
            .then(data => setCard(data))
    })

    const handleClick = ()  => {
        setSlice((prev) => prev + 8);
    }

    return (
        <main className=''>
            <div className='h-[50px]'></div>
            <section className='w-95/100 lg:w-7/10 flex flex-col items-center'>
                <section className='w-full flex flex-col md:flex-row justify-between items-start'>
                    <div className='flex flex-col items-center md:items-end justify-between h-[700px] w-full md:w-65/100'>
                        <div className='flex justify-around items-center w-full h-[100px] bg-white rounded-[1rem]'>
                            {buttons.map((item, index) => (
                                <button key={index}
                                        onClick={() => setIsActive(item.id)}
                                        className={`w-8/40 h-7/10 text-[2rem] rounded-[1rem] duration-330 
                                    ${isActive === item.id ? ' bg-[#009661] text-white' : ''}`}>
                                    {item.label}</button>
                            ))}
                        </div>
                        <form className='flex bg-white w-full justify-center items-center h-[500px] rounded-[1rem]'
                              action="">
                            <div className='w-9/10 h-95/100 flex flex-wrap justify-between'>
                                <InputForForm title='Грузовики' label='Категория'/>
                                <InputForForm title='Франция; Италия' label='Страна'/>
                                <InputForForm title='Renault ' label='Марка'/>
                                <InputForForm title='Premium 420HP' label='Модель'/>
                                <InputForForm title='2011' label='Год (начиная с)'/>
                                <InputForForm title='15000' label='Цена до (EUR)'/>
                                <InputForForm title='210000' label='Пробег до (km)'/>
                                <InputForForm title='8000' label='Вес до (kg)'/>
                            </div>
                        </form>
                        <NavLink to='/search'
                                 className='w-[300px] h-[60px] bg-[#009661] rounded-[1rem] text-white text-[2rem] flex items-center justify-center duration-330 hover:scale-[1.05]'>
                            Поиск ({results} Результатов)
                        </NavLink>
                    </div>
                    {Card.slice(0, 1).map((item, index) => (
                        <NavLink key={index} to='/car_page' state={{carData: item}}
                                 className='relative w-full md:w-3/10 h-[500px] md:h-[450px] xl:h-[500px] 2xl:h-[600px] bg-white rounded-[1rem] flex justify-center items-center'>
                            <div className='w-95/100 md:w-9/10 h-95/100 flex flex-col justify-between items-center'>
                                <img src={Images.daily} alt="" className='absolute left-77/100 md:left-1/2 xl:left-57/100 top-7/100'/>
                                <img src={item.image} alt="" className='rounded-[1rem] w-full h-6/10 md:max-h-55/100 object-cover'/>
                                <h2 className='text-[2.2rem] w-full'>{item.mark} {item.model}</h2>
                                <p className='text-[2rem] text-gray-500 text-start w-full'>{item.stat}</p>
                                <div
                                    className='w-full h-[70px] flex items-center justify-around bg-[#F9F9F9] rounded-[1rem]'>
                                    <img src={Images.location} alt="" className='h-1/2'/>
                                    <h3 className='text-gray-500 text-[2rem] w-5/10'>{item.location} {item.country}</h3>
                                    <h1 className='text-[3rem] text-[#009661]'>{item.price}</h1>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </section>
                <div className='h-[100px]'></div>
                <section className='w-full flex justify-between items-start flex-col'>
                    <h1 className='text-[5rem]'>Топ объявления</h1>
                    <div className='h-[50px]'></div>
                    <div className='grid grid-cols-3 lg:grid-cols-4 w-full gap-x-10'>
                        {Card.slice(0, slice).map((item, index) => (
                            <TopCarsCard key={index} {...item}/>
                        ))}
                    </div>
                    <div className='w-full flex justify-center items-center h-[60px]'>
                        <button onClick={handleClick}
                                className='w-[222px] h-full bg-[#009661] text-white text-[2rem] rounded-[1rem]'>Больше
                            объявлений
                        </button>
                    </div>
                </section>
            </section>
            <div className='h-[100px]'></div>
            <section className='w-95/100 h-[450px] lg:h-[550px] flex justify-center items-center bg-white'>
                <div className='w-9/10 lg:w-737/1000 h-1/2 flex justify-between items-center'>
                    <div className='w-4/10 h-full flex items-start justify-between flex-col'>
                        <h1 className='text-[4rem]'>Наши продавцы</h1>
                        <p className='text-[2rem] text-gray-500'>Мы работаем только с лучшимы игроками на рынке.
                            Безопасность сделки обеспечена</p>
                        <button
                            className='bg-[#009661] text-white w-[200px] h-[60px] text-[2rem] rounded-[1rem]'>показать
                            всех
                        </button>
                    </div>
                    <div className='w-55/100 h-full grid grid-cols-2 border-[5px] border-gray-200 items-center gap-5'>
                        <img className='justify-self-center cursor-pointer' src={Images.partner1} alt=""/>
                        <img className='justify-self-center cursor-pointer' src={Images.partner2} alt=""/>
                        <img className='justify-self-center cursor-pointer' src={Images.partner3} alt=""/>
                        <img className='justify-self-center cursor-pointer' src={Images.partner4} alt=""/>
                    </div>
                </div>
            </section>
        </main>
    )
}