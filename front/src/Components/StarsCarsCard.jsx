import {Images} from "../../Images.js";
import {NavLink} from "react-router-dom";

export default  function StarsCarsCard(props) {
    return (
        <NavLink to='/car_page' state={{carData: props}} className='bg-white w-full h-[500px] mb-[3rem]! flex justify-center items-center rounded-[1rem] cursor-pointer'>
            <div className='flex items-center justify-between flex-col w-9/10 h-95/100'>
                <img src={props.image} alt="" className='w-full h-5/10 object-cover rounded-[1rem]'/>
                <div className='flex flex-col justify-around items-center w-full h-5/10'>
                    <p className='text-gray-500 w-full text-[1.6rem]'>{props.stat}</p>
                    <h3 className='w-full text-[2rem]'>{props.mark} {props.model}</h3>
                    <div className='w-full flex items-center h-[30px]'>
                        <div className='px-4! mr-4! h-full bg-gray-100 rounded-xl flex items-center justify-center'>
                            <p className='text-[1.6rem]'>{props.year}</p>
                        </div>
                        <div className='px-4! mr-4! h-full bg-gray-100 rounded-xl flex items-center justify-center'>
                            <p className='text-[1.6rem]'>{props.weight}</p>
                        </div>
                        <div className='px-4! mr-4! h-full bg-gray-100 rounded-xl flex items-center justify-center'>
                            <p className='text-[1.6rem]'>{props.runned}</p>
                        </div>
                    </div>
                    <div className='w-full h-[60px] flex items-center justify-between border-t-[1px] border-gray-200'>
                        <img src={Images.location} alt="" className='h-[40px] mr-4!'/>
                        <p className='text-gray-500 text-[2rem]'>{props.location} {props.country}</p>
                        <h2 className='text-[#009661] text-[3rem] w-4/10 text-end'>{props.price}</h2>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}