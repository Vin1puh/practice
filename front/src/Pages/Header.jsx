import {NavLink, useNavigate} from "react-router-dom";
import {Images} from '../../Images.js'
import {useEffect, useState} from "react";

export default function Header({count}) {
    const [isHover, setHover] = useState(false);
    const [isNewMessage, setNewMessage] = useState(false);
    const [isSearch, setSearch] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    count = 4

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setNewMessage(true);
    }, []);

    useEffect(() => {
        if (user !== null && user.name === 'admin' && user.email === 'boris.lshchenko228@gmail.com' && user.id === 2) {
            setIsAdmin(true);
        }
    }, [user])

    const handleHover = () => {
        setHover(true);
    }
    const handleLeave = () => {
        setHover(false);
    }
    const handleSearch = () => {
        setSearch(!isSearch)
        if (!isSearch) {
            setSearchQuery('');
        }
    }

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            localStorage.setItem('searchQuery', searchQuery);
            setSearch(false);
            navigate('/search');
        }
    }

    const handleNavigate = () => {
        if (searchQuery.trim() !== '') {
            setSearch(false);
            navigate('/search', {
                state: {
                    searchQuery: searchQuery
                }
            });
        } else {
            setSearch(false);
            navigate('/search');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
        window.location.reload();
    }

    return (
        <header className='w-full h-[88px] flex justify-center items-center fixed z-1000 bg-white border-b-[#eee] border-b-[1px]'>
            {isSearch ? (
                <div className='w-95/100 lg:w-7/10 h-2/3 flex justify-between items-center'>
                    <img src={Images.graySearch} alt=""/>
                    <input onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNavigate()} type="text" className='w-95/100 h-1/2 outline-0 text-[1.6rem] placeholder-gray-500' placeholder='Введите ваш запрос'/>
                    <img onClick={handleSearch} src={Images.plus} className='rotate-45 h-[20px] cursor-pointer' alt=""/>
                </div>
            ) : (
                <div className='w-95/100 lg:w-7/10 h-2/3 flex justify-between items-center'>
                    <div className='flex items-center justify-between w-4/10 md:w-3/10'>
                        <NavLink to='/'><img src={Images.Logo} alt=""/></NavLink>
                        <details className='text-[1.6rem] cursor-pointer'>
                            <summary>Русский</summary>
                        </details>
                        <details className='text-[1.6rem] cursor-pointer'>
                            <summary>Евро</summary>
                        </details>
                        <p onClick={handleSearch} className='text-[1.6rem] cursor-pointer'>Поиск</p>
                    </div>
                    <div className='flex items-center justify-between w-4/10 md:w-3/10 2xl:w-25/100 h-full'>
                        <div onMouseEnter={handleHover} onMouseLeave={handleLeave}
                             className='w-[120px] h-full relative flex flex-col items-center justify-between'>
                            {user ? (
                                <>
                                    <NavLink to='/profile/stars'
                                             className='text-[#009661] text-[1.6rem] w-full h-full flex justify-center items-center'>
                                        {user.name.split(' ')[0]}
                                    </NavLink>

                                    {isHover && (
                                        <div
                                            className='absolute top-full bg-white w-[240px] max-h-[200px] rounded-[1rem] flex flex-col overflow-hidden shadow-lg'>
                                            <NavLink to='/profile/stars'
                                                     className='w-full h-[50px] text-gray-500 text-[1.6rem] flex items-center justify-center hover:bg-gray-100'>Избранное</NavLink>
                                            <NavLink to='/profile/messages'
                                                     className='bg-[#8B959E]/[0.2] w-full h-[50px] text-black text-[1.6rem] flex items-center justify-center hover:bg-gray-100'>Сообщения
                                                {isNewMessage && (
                                                    <span className='text-[#009661]'>⠀({count} новых)</span>)}
                                            </NavLink>
                                            {isAdmin && (
                                                <NavLink to='/AdminPanel'
                                                         className='w-full h-[50px] text-gray-500 text-[1.6rem] flex items-center justify-center hover:bg-gray-100'>Админка</NavLink>
                                            )}
                                            <button onClick={handleLogout}
                                                    className='w-full h-[50px] text-red-500 text-[1.6rem] flex items-center justify-center hover:bg-gray-100'>
                                                Выйти
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NavLink to='/profile/enter'
                                         className='text-[#009661] text-[1.6rem] w-full h-full flex justify-center items-center'>Войти</NavLink>
                            )}
                        </div>
                        <button
                            className='px-[2rem]! h-full bg-[#4689660F] rounded-[1rem] text-[#009661] text-[1.6rem]'>СТАТЬ
                            ПРОДАВЦОМ
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}