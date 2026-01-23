import {Images} from "../../Images.js";
import {useState} from "react";

export default function InputForForm({title, label, items = [], onSelect, value}) {
    const [isClicked, setIsClicked] = useState(false);

    const handleItemClick = (item) => {
        if (onSelect) {
            onSelect(item);
        }
        setIsClicked(false);
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <div className='w-45/100 h-1/5 flex justify-between items-start flex-col relative'>
            <label htmlFor="" className='text-[1.7rem] text-gray-500'>{label}</label>
            <div onClick={handleClick}
                 className='flex items-center justify-center w-full h-6/10 border-[1px] border-gray-300 cursor-pointer'>
                <div className='flex items-center justify-between w-9/10 '>
                    <h3 className='text-[2rem] '>{value || title}</h3>
                    <img className={`duration-330 ${isClicked ? 'rotate-180' : ''}`} src={Images.input_arrow} alt=""/>
                </div>
            </div>
            {isClicked && (
                <div
                    className='absolute w-full flex flex-col justify-center items-center bg-white top-full rounded-[1rem] z-10 shadow-lg'>
                    <div className={`w-full max-h-[200px] overflow-y-auto`}>
                        <div
                            key="clear"
                            onClick={() => handleItemClick('')}
                            className='flex items-center justify-center w-full cursor-pointer h-[50px] hover:bg-gray-200 duration-330 border-y-[1px] border-y-gray-200'
                        >
                            <h3 className='text-[2rem] w-9/10 text-gray-400'>
                                Не выбрано
                            </h3>
                        </div>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className='flex items-center justify-center w-full cursor-pointer h-[50px] hover:bg-gray-200 duration-330 border-y-[1px] border-y-gray-200'
                            >
                                <h3 className='text-[2rem] w-9/10 truncate'>{item}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}