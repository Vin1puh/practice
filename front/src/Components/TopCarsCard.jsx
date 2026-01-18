import {Images} from "../../Images.js";
import {NavLink} from "react-router-dom";

export default  function TopCarsCard(props) {
    return (
        <NavLink to='/car_page' state={{carData: props}} className='relative bg-white w-full h-[380px] mb-[3rem]! flex flex-col justify-between items-center rounded-[1rem] overflow-hidden cursor-pointer duration-330 hover:translate-y-[-20px]'>
            <img src={props.image} alt="" className='w-full h-6/10 object-cover'/>
            <div className='flex flex-col justify-around items-center w-9/10 h-4/10'>
                <h3 className='w-full text-[2rem]'>{props.mark} {props.model}</h3>
                <div className='w-full flex items-center justify-between'>
                    <img src={Images.location} alt="" className='h-[30px]'/>
                    <p className='text-gray-500 text-[2rem]'>{props.country}</p>
                    <h2 className='text-[#009661] text-[3rem]'>{props.price}</h2>
                </div>
            </div>
        </NavLink>
    )
}