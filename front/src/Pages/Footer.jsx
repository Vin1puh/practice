import {Images} from "../../Images.js";
import {NavLink} from "react-router-dom";

export default function Footer() {
    return(
        <footer className="h-[320px] bg-[#212026] flex justify-center items-center">
            <div className='w-95/100 lg:w-7/10 h-7/10 flex flex-col items-center justify-between'>
                <div className='flex items-center justify-between w-full h-[120px]'>
                    <div className='h-full w-3/10 flex flex-col items-start justify-between'>
                        <img src={Images.FooterLogo} alt=""/>
                        <p className='text-gray-500 text-[1.8rem]'>Маркетплейс коммерчиского транспорта и тяжелой техники</p>
                    </div>
                    <div className='h-2/3 w-4/10 md:w-3/10 flex flex-col items-start justify-between'>
                        <p className='text-gray-500 text-[1.8rem]'>Покупателю</p>
                        <div className='w-full h-1/2 flex items-center justify-between'>
                            <NavLink to='/' className='text-[2rem] text-white'>Служба поддержки</NavLink>
                            <NavLink to='/' className='text-[2rem] text-white'>Стать продавцом</NavLink>
                        </div>
                    </div>
                    <div className='h-2/3 w-18/100 md:w-11/100 flex flex-col items-center justify-between'>
                        <p className='text-gray-500 text-[1.8rem] w-full'>Следите за нами</p>
                        <div className='w-full h-1/2 flex items-center justify-between'>
                            <img className='cursor-pointer' src={Images.facebook} alt=""/>
                            <img className='cursor-pointer' src={Images.instagram} alt=""/>
                            <img className='cursor-pointer' src={Images.youtube} alt=""/>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[60px] border-[2px] border-gray-700 flex justify-center items-center'>
                    <p className='text-gray-500 text-[1.8rem]'>© 2019–2020 Группа компаний «NOVO»</p>
                </div>
            </div>
        </footer>
    )
}