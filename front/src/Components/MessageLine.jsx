import CustomInput from "./CustomInput.jsx";

export default function MessageLine(props) {
    return (
        <div className={`w-95/100 h-[70px] flex justify-between items-center cursor-pointer ${props.index % 9 === 0 && props.index !== 0 ? '' : 'border-b-[1px] border-gray-200'}`}>
            <CustomInput bg='red' border='red' checked='red'/>
            <div className='w-15/100 h-full flex items-center justify-start'>
                <h2 className={`text-[2rem] ${props.isNew ? 'text-[#009661]' : ''}`}>{props.user}</h2>
            </div>
            <div className='w-5/10 h-full flex items-center justify-start'>
                <h2 className={`text-[2rem] w-full text-ellipsis whitespace-nowrap overflow-x-hidden ${props.isNew ? 'text-[#009661]' : ''}`}>{props.name}</h2>
            </div>
            <div className='w-1/10 h-full flex items-center justify-center'>
                {props.count > 0 && (
                    <div className='text-white text-[1.6rem] px-4! rounded-[0.25rem] h-1/3 bg-[#009661] flex items-center'>{props.count} новых</div>
                )}
            </div>
            <div className='w-1/10 h-full flex items-center justify-end'>
                <p className='text-gray-500 text-[1.6rem]'>{props.time}</p>
            </div>
        </div>
    )
}