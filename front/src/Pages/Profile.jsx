import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {Images} from "../../Images.js";
import StarsCarsCard from "../Components/StarsCarsCard.jsx";
import SettingsDetails from "../Components/SettingsDetails.jsx";
import CustomInput from "../Components/CustomInput.jsx";
import MessageLine from "../Components/MessageLine.jsx";

export default function Profile({count}) {
    const [slice, setSlice] = useState(9);
    const [oldMessageSlice, setOldMessageSlice] = useState(0);
    const [messageSlice, setMessageSlice] = useState(10);
    const [isNewMessage, setNewMessage] = useState(false);
    const [cardData, setCardData] = useState([]);
    const location = useLocation();

    count = 4

    useEffect(() => {
        fetch('http://localhost:3000/cars/stars')
            .then(res => res.json())
            .then(data => setCardData(data))
    }, [cardData, setCardData]);

    const handleClick = () => {
        setSlice((prev) => prev + 9)
    }
    const handleLeft = () => {
        if(messageSlice > 10){
            console.log(oldMessageSlice)
            setOldMessageSlice((prev) => prev - 10)
            console.log(oldMessageSlice)
            setMessageSlice((prev) => prev - 10);
        }
    }
    const handleRight = () => {
        if(messageSlice < 20){
            console.log(oldMessageSlice)
            setOldMessageSlice((prev) => prev + 10)
            console.log(oldMessageSlice)
            setMessageSlice((prev) => prev + 10);
        }
    }

    useEffect(() => {
        setNewMessage(true);
    }, [isNewMessage, setNewMessage]);

    return(
        <main>
            {location.pathname === "/profile/enter" ? (
                <div className='w=1/2 md:w-3/10 h-[650px] my-32! flex flex-col items-center justify-between'>
                    <div className='bg-white rounded-2xl w-full h-9/10 flex items-center justify-center'>
                        <div className='flex flex-col items-center justify-between w-8/10 h-8/10'>
                            <h1 className='text-[5rem] font-bold'>Вход в акаунт</h1>
                            <div className='w-full flex flex-col items-start justify-between w-full h-1/2'>
                                <label htmlFor="" className='text-gray-500 text-[1.6rem]'>E-mail</label>
                                <input type="email"
                                       className='w-full h-[60px] border-2 border-gray-200 px-8! outline-0 text-[2rem]'/>
                                <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Пароль</label>
                                <input type="password"
                                       className='w-full h-[60px] border-2 border-gray-200 px-8! outline-0 text-[2rem]'/>
                            </div>
                            <button className='px-12! h-[60px] bg-[#009661] text-[2rem] text-white rounded-2xl uppercase'>Продолжить</button>
                        </div>
                    </div>
                    <h2 className='text-[2rem]'>Нет аккаунта? <NavLink to='/profile/register' className='text-[#009661] uppercase'>Рeгистрация</NavLink></h2>
                </div>
            ) : location.pathname === "/profile/register" ? (
                <div className='w-1/2 md:w-3/10 h-[900px] my-32! flex flex-col items-center justify-between'>
                    <div className='bg-white rounded-2xl w-full h-95/100 flex items-center justify-center'>
                        <div className='flex flex-col items-center justify-between w-8/10 h-9/10'>
                            <h1 className='text-[5rem] font-bold'>Регистрация</h1>
                            <p className='text-gray-500 text-[2rem] text-center w-2/3 h-[60px]'>Заполните указаные поля, чтобы создать акаунт</p>
                            <div className='w-full flex flex-col items-start justify-between w-full h-6/10'>
                                <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Имя</label>
                                <input type="text"
                                       className='w-full h-[60px] border-2 border-gray-200 px-8! outline-0 text-[2rem]'/>
                                <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Фамилия</label>
                                <input type="text"
                                       className='w-full h-[60px] border-2 border-gray-200 px-8! outline-0 text-[2rem]'/>
                                <label htmlFor="" className='text-gray-500 text-[1.6rem]'>E-mail</label>
                                <input type="email"
                                       className='w-full h-[60px] border-2 border-gray-200 px-8! outline-0 text-[2rem]'/>
                                <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Придумайте пароль</label>
                                <input type="password"
                                       className='w-full h-[60px] border-2 border-gray-200 px-8! outline-0 text-[2rem]'/>
                            </div>
                            <div className='flex justify-between'>
                                <CustomInput border='gray' bg='green' checked='green' />
                                <p className='text-gray-500 text-[1.6rem] w-95/100'>Авторизуясь, Вы принимаете
                                    <NavLink to='/' className='text-[#009661]'> Условия использования</NavLink> и
                                    <NavLink to='/' className='text-[#009661]'> Заявлением о конфиденциальности</NavLink> NOVO</p>
                            </div>
                            <button
                                className='px-12! h-[60px] bg-[#009661] text-[2rem] text-white rounded-2xl uppercase'>Продолжить
                            </button>
                        </div>
                    </div>
                    <h2 className='text-[2rem]'>Уже есть акаунт? <NavLink to='/profile/enter'
                                                                          className='text-[#009661] uppercase'>Войти</NavLink>
                    </h2>
                </div>
            ) : (
                <>
                    <div className='w-full h-[230px] flex justify-center items-center bg-white'>
                        <div className='w-95/100 lg:w-7/10 h-full flex justify-between items-start flex-col'>
                            <div className='h-[50px]'>

                            </div>
                            {location.pathname === '/profile/stars' && (
                                <h1 className='text-[5rem] font-bold'>Избранное</h1>
                            )}
                            {location.pathname === '/profile/messages' && (
                                <h1 className='text-[5rem] font-bold'>Сообщения</h1>
                            )}
                            {location.pathname === '/profile/settings' && (
                                <h1 className='text-[5rem] font-bold'>Настройки профиля</h1>
                            )}
                            <div className='flex items-center justify-between w-[500px] lg:w-[640px] h-[50px]'>
                                <NavLink to='stars' className={`h-full text-[2rem] font-bold flex items-center
                        ${location.pathname === '/profile/stars' ? 'border-b-4 border-[#009661]': ''}`}
                                >Избранное</NavLink>
                                <NavLink to='messages' className={`h-full text-[2rem] font-bold flex items-center 
                        ${location.pathname === '/profile/messages' ? 'border-b-4 border-[#009661]': ''}`}
                                >Сообщения {isNewMessage && (<span className='text-[#009661]'>⠀({count} новых)</span>)}</NavLink>
                                <NavLink to='settings' className={`h-full text-[2rem] font-bold flex items-center
                        ${location.pathname === '/profile/settings' ? 'border-b-4 border-[#009661]': ''}`}
                                ><img className='h-1/2 mr-[1rem]!' src={Images.settings} alt=""/> Настройки профиля</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='h-[50px]'></div>
                    {location.pathname === '/profile/stars' && (
                        <>
                            <div className='w-95/100 lg:w-7/10 h-[75px] flex items-center justify-center bg-white rounded-[1rem]'>
                                <div className='w-9/10 h-full flex justify-between items-center'>
                                    <img src={Images.search} alt="" className='h-1/2'/>
                                    <input type="text" placeholder='Поиск по объявлениям'
                                           className='w-95/100 h-1/2 outline-0 text-[2rem]'/>
                                </div>
                            </div>
                            <div className='h-[20px]'></div>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-x-12 w-95/100 lg:w-7/10'>
                                {cardData.slice(0, slice).map((item, index) => (
                                    <StarsCarsCard key={index} {...item}/>
                                ))}
                            </div>
                            <div className='h-[50px]'></div>
                            <button className='bg-[#009661] w-[190px] h-[60px] text-[2rem] text-white rounded-2xl'
                                    onClick={handleClick}
                            >Загрузить ещё</button>
                            <div className='h-[50px]'></div>
                        </>
                    )}
                    {location.pathname === '/profile/messages' && (
                        <>
                            <div className='w-95/100 lg:w-7/10 h-[75px] rounded-2xl flex items-center justify-center bg-white'>
                                <div className='w-95/100 h-1/2 flex justify-between items-center'>
                                    <CustomInput bg='red' border='red' checked='red'/>
                                    <div className='w-15/100 h-full flex items-center justify-start'>
                                        <p className='text-gray-500 text-[1.6rem]'>Пользователь</p>
                                    </div>
                                    <div className='w-5/10 h-full flex items-center justify-start'>
                                        <p className='text-gray-500 text-[1.6rem]'>Объявления</p>
                                    </div>
                                    <div className='w-1/10 h-full flex items-center justify-center'>
                                        <p className='text-gray-500 text-[1.6rem]'>Сообщений</p>
                                    </div>
                                    <div className='w-1/10 h-full flex items-center justify-end'>
                                        <p className='text-gray-500 text-[1.6rem]'>Отправлено</p>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[50px]'></div>
                            <div className='w-95/100 lg:w-7/10 max-h-[700px] bg-white rounded-2xl flex flex-col items-center'>
                                {[...Array(17)].slice(oldMessageSlice, messageSlice).map((_, index) => (
                                    <MessageLine key={index} user='Игорь Игорьевич' name='SCHWARZMUELLER 3Achs Stahl path SCHWARZMUELLER 3Achs Stahl' count={count} index={index} time='19:56'/>
                                ))}
                            </div>
                            <div className='h-[50px]'></div>
                            <div className='w-95/100 lg:w-7/10 h-[50px] flex items-center justify-between'>
                                <button className='w-[160px] h-full rounded-2xl bg-[#EB5757]/[0.2] text-[#EB5757] text-[2rem] flex justify-evenly items-center'><img className='h-1/2' src={Images.garbage} alt=""/> Удалить</button>
                                <div className='w-[230px] h-full flex items-center justify-between'>
                                    <button
                                        onClick={handleLeft}
                                        className='h-full w-[50px] bg-[#009661]/[0.2] rounded-2xl flex items-center justify-center'>
                                        <img src={Images.greenArrow} className='rotate-90 h-1/4' alt=""/></button>
                                    <h2 className='text-[2rem]'>{Math.floor(messageSlice/10)} страница</h2>
                                    <button
                                        onClick={handleRight}
                                        className='h-full w-[50px] bg-[#009661]/[0.2] rounded-2xl flex items-center justify-center'>
                                        <img src={Images.greenArrow} className='rotate-270 h-1/4' alt=""/></button>
                                </div>
                            </div>
                            <div className='h-[50px]'></div>
                        </>
                    )}
                    {location.pathname === '/profile/settings' && (
                        <>
                            <div className='w-95/100 lg:w-7/10 h-[70px] flex flex-col justify-between items-start'>
                                <h2 className='text-[3rem]'>Профиль mail@gmail.com</h2>
                                <NavLink to='/profile/enter' className='text-[2rem] text-[#009661]'>Выйти из аккаунта</NavLink>
                            </div>
                            <div className='h-[100px]'></div>
                            <SettingsDetails title='Настройки акаунта' mail='email@gmail.com'/>
                            <div className='h-[50px]'></div>
                            <SettingsDetails isConfig={true} title='Изменить контактную информацию'/>
                            <div className='h-[100px]'></div>
                        </>
                    )}
                </>
            )}
        </main>
    )
}