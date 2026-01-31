export default function ErrorPage() {
    return (
        <div className="w-screen h-screen absolute z-1000 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                <h1 className='text-[24rem] text-[#009661]'>404</h1>
                <p className='text-[5rem]'>Страница не найдена</p>
            </div>
        </div>
    )
}