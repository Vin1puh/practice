import {Images} from "../../Images.js";
import {useEffect, useState} from "react";
import CustomInput from "./CustomInput.jsx";

export default function Filter({host}) {
    const [lowPrice, setLowPrice] = useState(0);
    const [highPrice, setHighPrice] = useState(10000);
    const [isTypeOpen, setTypeOpen] = useState({typeL: false, countryL: false});
    const [checkedItems, setCheckedItems] = useState({});
    const [items, setItems] = useState({});
    const [isOpen, setIsOpen] = useState({
        price: false,
        type: false,
        maker: false,
        country: false,
        KPP: false,
        alertType: false
    });

    useEffect(() => {
        fetch(`http://localhost:5432/${host}`)
            .then(res => res.json())
            .then(data => setItems(data))
    })

    const handleClick = (e) => {
        setIsOpen((prev) => ({...prev, [e]: !prev[e]}));
    }

    const handleTypeOpen = (e) => {
        setTypeOpen((prev) => ({...prev, [e]: !prev[e]}));
    }

    const testItems = [
        "Грузовики",
        "Легковые автомобили",
        "Автобусы",
        "Спецтехника",
        "Мотоциклы",
        "Прицепы",
        "Сельхозтехника",
        "Водный транспорт"
    ];

    const displayItems = items.length > 0 ? items : testItems;
    const hasScroll = displayItems.length > 4;

    const maxLimit = 20000;

    const handleMinChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= highPrice) {
            setLowPrice(value);
        }
    };

    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= lowPrice) {
            setHighPrice(value);
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ru-RU');
    };

    const handleCheckChange = (index, isChecked) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: isChecked
        }));
    };

    return (
        <div className='w-25/100 flex items-center justify-center bg-white rounded-2xl'>
            <div className='flex flex-col items-start justify-between w-9/10 py-8!'>
                <div className='flex flex-col items-start justify-between w-full'>
                    <h2 onClick={() => handleClick('price')}
                        className='text-[2rem] h-[50px] flex items-center w-full cursor-pointer'>
                        <img className='mr-4! w-[16px]' src={`${isOpen.price ? Images.minus : Images.plus}`}
                             alt=""/> Цена, €</h2>
                    {isOpen.price && (
                        <div className='flex flex-col items-center justify-evenly w-full w-full h-[112px]'>
                            <form action="" className='w-full h-[50px] flex border-2 border-gray-200'>
                                <div
                                    className='w-1/2 h-full border-r-2 border-gray-200 flex items-center justify-center'>
                                    <div className='flex items-center w-9/10 h-1/2'>
                                        <p className='text-gray-500 text-[1.6rem] mr-4!'>От</p>
                                        <input type='money' min="1000" max="200000"
                                               className='text-[2rem] text-[#009661] outline-0 w-3/4'
                                               value={`${formatPrice(lowPrice)} €`}/>
                                    </div>
                                </div>
                                <div className='w-1/2 h-full flex items-center justify-center'>
                                    <div className='flex items-center w-9/10 h-1/2'>
                                        <p className='text-gray-500 text-[1.6rem] mr-4!'>До</p>
                                        <input type='money' min="1000" max="200000"
                                               className='text-[2rem] text-[#009661] outline-0 w-3/4'
                                               value={`${formatPrice(highPrice)} €`}/>
                                    </div>
                                </div>
                            </form>
                            <div className='w-full relative flex items-center justify-between'>
                                <input
                                    className='w-1/2'
                                    type="range"
                                    min="0"
                                    max={maxLimit}
                                    value={lowPrice}
                                    onChange={handleMinChange}
                                />
                                <input
                                    className='w-1/2'
                                    type="range"
                                    min="0"
                                    max={maxLimit}
                                    value={highPrice}
                                    onChange={handleMaxChange}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-gray-200'></div>
                <div className='w-full flex flex-col items-start justify-between'>
                    <h2 onClick={() => handleClick('type')}
                        className='text-[2rem] h-[50px] flex items-center w-full cursor-pointer'>
                        <img className='mr-4! w-[16px]' src={`${isOpen.type ? Images.minus : Images.plus}`}
                             alt=""/>Тип Транспорта</h2>
                    {isOpen.type && (
                        <div className='relative flex items-center justify-center w-full h-[50px] mb-8! border-2 border-gray-200 cursor-pointer'>
                            <div className=' flex items-center justify-between w-9/10 h-full' onClick={() => handleTypeOpen('typeL')}>
                                <p className='text-gray-500 text-[1.6rem]'>Грузовики</p>
                                <img src={Images.greenArrow}
                                     className={`${isTypeOpen.typeL ? 'rotate-180' : ''} duration-330`} alt=""/>
                            </div>
                            {isTypeOpen.typeL && (
                                <div
                                    className={`absolute z-10 top-104/100 w-full max-h-[200px] bg-white rounded-2xl ${hasScroll ? 'overflow-y-auto' : ''}`}>
                                    {displayItems.map((item, index) => (
                                        <div key={index}
                                             className='w-full flex justify-center h-[50px] border-b-[1px] border-gray-200'>
                                            <p className='w-9/10 text-gray-500 text-[1.6rem] h-full flex items-center'>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-gray-200'></div>
                <div className='w-full flex flex-col items-start justify-between'>
                    <h2 onClick={() => handleClick('maker')}
                        className='text-[2rem] h-[50px] flex items-center w-full cursor-pointer'>
                        <img className='mr-4! w-[16px]' src={`${isOpen.maker ? Images.minus : Images.plus}`}
                             alt=""/>Производитель</h2>
                    {isOpen.maker && (
                        <div className='w-full max-h-[175px] overflow-y-auto mb-8!'>
                            {[...Array(9)].map((_, index) => (
                                <div key={index} className='h-[25px] flex items-center'>
                                    <CustomInput bg='green' border='gray' checked='green'
                                                 onChange={(isChecked) => handleCheckChange(index, isChecked)}/>
                                    <p className={`text-[1.6rem] ml-4! duration-330 ${checkedItems[index] ? 'text-[#009661]' : 'text-gray-500'}`}>Volkswagen</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-gray-200'></div>
                <div className='w-full flex flex-col items-start justify-between'>
                    <h2 onClick={() => handleClick('country')}
                        className='text-[2rem] h-[50px] flex items-center w-full cursor-pointer'>
                        <img className='mr-4! w-[16px]' src={`${isOpen.country ? Images.minus : Images.plus}`}
                             alt=""/>Страна местонахождения</h2>
                    {isOpen.country && (
                        <div className='relative flex items-center justify-center w-full h-[50px] mb-8! border-2 border-gray-200 cursor-pointer'>
                            <div className=' flex items-center justify-between w-9/10 h-full' onClick={() => handleTypeOpen('countryL')}>
                                <p className='text-gray-500 text-[1.6rem]'>Франция; Италия</p>
                                <img src={Images.greenArrow}
                                     className={`${isTypeOpen.countryL ? 'rotate-180' : ''} duration-330`} alt=""/>
                            </div>
                            {isTypeOpen.countryL && (
                                <div className={`absolute z-9 top-104/100 w-full max-h-[200px] bg-white rounded-2xl ${hasScroll ? 'overflow-y-auto' : ''}`}>
                                    {displayItems.map((item, index) => (
                                        <div key={index}
                                             className='w-full flex justify-center h-[50px] border-b-[1px] border-gray-200'>
                                            <p className='w-9/10 text-gray-500 text-[1.6rem] h-full flex items-center'>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-gray-200'></div>
                <div className='w-full flex flex-col items-start justify-between'>
                    <h2 onClick={() => handleClick('KPP')}
                        className='text-[2rem] h-[50px] flex items-center w-full cursor-pointer'>
                        <img className='mr-4! w-[16px]' src={`${isOpen.KPP ? Images.minus : Images.plus}`}
                             alt=""/>Коробка передач</h2>
                    {isOpen.KPP && (
                        <div className='w-full max-h-[175px] overflow-y-auto mb-8!'>
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className='h-[25px] flex items-center'>
                                    <CustomInput bg='green' border='gray' checked='green'
                                                 onChange={(isChecked) => handleCheckChange(index, isChecked)}/>
                                    <p className={`text-[1.6rem] ml-4! duration-330 ${checkedItems[index] ? 'text-[#009661]' : 'text-gray-500'}`}>Механика</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-gray-200'></div>
                <div className='w-full flex flex-col items-start justify-between'>
                    <h2 onClick={() => handleClick('alertType')}
                        className='text-[2rem] h-[50px] flex items-center w-full cursor-pointer'>
                        <img className='mr-4! w-[16px]' src={`${isOpen.alertType ? Images.minus : Images.plus}`}
                             alt=""/>Тип объявления</h2>
                    {isOpen.alertType && (
                        <div className='w-full max-h-[175px] overflow-y-auto mb-8!'>
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className='h-[25px] flex items-center'>
                                    <CustomInput bg='green' border='gray' checked='green'
                                                 onChange={(isChecked) => handleCheckChange(index, isChecked)}/>
                                    <p className={`text-[1.6rem] ml-4! duration-330 ${checkedItems[index] ? 'text-[#009661]' : 'text-gray-500'}`}>Продажа</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    className='w-full h-[60px] bg-[#009661] text-white rounded-2xl text-[2rem] uppercase mt-4!'>применить
                </button>
            </div>
        </div>
    )
}