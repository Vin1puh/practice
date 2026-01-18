import {Images} from "../../Images.js";
import Filter from "../Components/Filter.jsx";
import StarsCarsCard from "../Components/StarsCarsCard.jsx";
import {useState} from "react";

export default function SearchPage(props) {
    const [slice, setSlice] = useState(6);

    const handleClick = () => {
        setSlice((prev) => prev + 6);
    }

    return (
        <main>
            <div className='h-[50px]'></div>
            <div className='w-7/10 flex justify-between items-start'>
                <Filter />
                <div className='flex flex-col justify-between items-start w-7/10'>
                    <div className='flex w-full flex-wrap h-[50px]'>

                    </div>
                    <div className='w-full grid grid-cols-2 gap-x-4'>
                        {[...Array(12)].slice(0, slice).map((_, index) => (
                            <StarsCarsCard key={index} photo={Images.Car} location='Garage van NieropNetherlands'
                                           price='1000$' name='Opel COMBO Airco Elct Ramen Stuurbediening'
                                           way='Закрытые грузопассажирские автомобили' year='2015' weight='2 000 kg'
                                           runed='490 574 km'/>
                        ))}
                    </div>
                    <div className='w-full h-[60px] flex justify-center'>
                        <button onClick={handleClick} className='h-full w-[185px] bg-[#009661] text-white text-[2rem] rounded-2xl'>Загрузить ещё</button>
                    </div>
                </div>
            </div>
            <div className='h-[50px]'></div>
        </main>
    )
}