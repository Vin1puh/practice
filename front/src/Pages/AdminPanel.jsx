import {useState} from "react";

export default function AdminPanel(){
    const [setMark, setSetMark] = useState("")
    const [setModel, setSetModel] = useState("")
    const [setImage, setSetImage] = useState("")
    const [setSeller, setSetSeller] = useState("")
    const [setCategory, setSetCategory] = useState("")
    const [setYear, setSetYear] = useState("")
    const [setRunned, setSetRunned] = useState("")
    const [setCountry, setSetCountry] = useState("")
    const [setWeight, setSetWeight] = useState("")
    const [setPrice, setSetPrice] = useState("")
    const [setBrutto, setSetBrutto] = useState("")
    const [setRewiew, setSetRewiew] = useState("")
    const [setStat, setSetStat] = useState("")
    const [setLocation, setSetLocation] = useState("")
    const [setHead, setSetHead] = useState("")

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mark: setMark,
                    model: setModel,
                    image: `http://localhost:5173/src/assets/${setImage}`,
                    seller: setSeller,
                    category: setCategory,
                    year: setYear,
                    runned: setRunned,
                    country: setCountry,
                    weight: setWeight,
                    price: setPrice,
                    brutto_price: setBrutto,
                    rewiew: setRewiew,
                    stat: setStat,
                    location: setLocation,
                    head_stat: setHead,
                })
            });

            const data = await response.json();

            if (data.success) {
                setSetMark("");
                setSetModel("");
                setSetImage("");
                setSetSeller("");
                setSetCategory("");
                setSetYear("");
                setSetRunned("");
                setSetCountry("");
                setSetWeight("");
                setSetPrice("");
                setSetBrutto("");
                setSetRewiew("");
                setSetStat("");
                setSetLocation("");
                setSetHead("");
            } else {
                console.log(data.success);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <div className='h-[50px]'></div>
            <section className='w-7/10 flex items-center justify-center'>
                <form action="" className='w-full h-[900px] rounded-2xl bg-white flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center justify-between w-95/100 h-9/10'>
                        <h1 className='text-[4rem]'>Создание карточек</h1>
                        <div className='w-full grid grid-cols-2 gap-8'>
                            <input type="text"
                                   value={setMark}
                                   onChange={(e) => setSetMark(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Марка'/>
                            <input type="text"
                                   value={setModel}
                                   onChange={(e) => setSetModel(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Модель'/>
                            <input type="text"
                                   value={setImage}
                                   onChange={(e) => setSetImage(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Картика из файлов (Car.png)'/>
                            <input type="text"
                                   value={setSeller}
                                   onChange={(e) => setSetSeller(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Продавец'/>
                            <input type="text"
                                   value={setCategory}
                                   onChange={(e) => setSetCategory(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Категория'/>
                            <input type="text"
                                   value={setYear}
                                   onChange={(e) => setSetYear(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Год'/>
                            <input type="text"
                                   value={setRunned}
                                   onChange={(e) => setSetRunned(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Пробег'/>
                            <input type="text"
                                   value={setCountry}
                                   onChange={(e) => setSetCountry(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Страна'/>
                            <input type="text"
                                   value={setWeight}
                                   onChange={(e) => setSetWeight(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Вес'/>
                            <input type="text"
                                   value={setPrice}
                                   onChange={(e) => setSetPrice(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Цена'/>
                            <input type="text"
                                   value={setBrutto}
                                   onChange={(e) => setSetBrutto(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Цена с налогами'/>
                            <input type="text"
                                   value={setRewiew}
                                   onChange={(e) => setSetRewiew(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Описание'/>
                            <input type="text"
                                   value={setStat}
                                   onChange={(e) => setSetStat(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Зона применения'/>
                            <input type="text"
                                   value={setLocation}
                                   onChange={(e) => setSetLocation(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Конкретная геолокация'/>
                            <input type="text"
                                   value={setHead}
                                   onChange={(e) => setSetHead(e.target.value)}
                                   className='w-full h-[60px] border-[1px] border-gray-200 text-[2rem] outline-0 pl-8!'
                                   placeholder='Заголовок описания'/>
                        </div>
                        <button className='px-8! h-[60px] bg-[#009661] rounded-2xl text-[2rem] text-white'
                                onClick={handleCreate}>
                            Создать карточку
                        </button>
                    </div>
                </form>
            </section>
            <div className='h-[50px]'></div>
        </main>
    )
}