export default function CarReview(props) {
    return (
        <div className={`w-full h-[60px] flex items-center justify-center rounded-2xl ${props.index % 2 === 0 ? 'bg-gray-200' : ''}`}>
            <div className='w-9/10 h-1/2 flex items-center justify-between'>
                <p className='text-gray-500 text-[1.6rem] w-1/2'>{props.statsName}</p>
                <h3 className='text-[1.8rem] w-1/2'>{props.stats}</h3>
            </div>
        </div>
    )
}