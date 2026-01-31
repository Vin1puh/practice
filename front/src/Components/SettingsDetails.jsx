import {Images} from "../../Images.js";
import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function SettingsDetails(props){
    const [open, setOpen] = useState(false);
    const [newEmail, setNewEmail] = useState("");

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleUpdateEmail = async () => {
        if(newEmail === props.email){
            alert('вы уже используете указанный email')
        }
        else{
            try{
                const res = await fetch(`http://localhost:3000/api/user/${props.email}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newEmail })
                });

                const data = await res.json();

                if(data.success){
                    setNewEmail('')
                    const User = localStorage.getItem('user')
                    if(User){
                        try{
                            const user = JSON.parse(User);
                            user.email = newEmail;
                            localStorage.setItem('user', JSON.stringify(user));
                        }
                        catch (err){
                            console.error(err);
                        }
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div className='w-95/100 lg:w-7/10 rounded-2xl bg-white flex flex-col items-center overflow-hidden'>
            <div onClick={handleOpen} className='w-95/100 h-[80px] flex justify-between items-center cursor-pointer'>
                <h2 className='text-[3rem]'>{props.title}</h2>
                <img src={Images.greenArrow} alt="" className={`duration-330 ${open ? 'rotate-180' : ''}`}/>
            </div>
            {!props.isConfig && open && (
                <div className='h-[360px] w-full bg-white border-t-[1px] border-gray-200 flex justify-center items-center'>
                    <div className='w-95/100 h-8/10 flex flex-col justify-between items-start'>
                        <div>
                            <p className='text-gray-500 text-[2rem]'>Ваш E-mail адрес:</p>
                            <span className='text-[2rem] text-[#009661]'>{props.email}</span>
                        </div>
                        <div className='w-full h-[210px] flex items-center justify-between'>
                            <div className='flex flex-col items-start justify-between w-5/10 h-full'>
                                <div className='w-8/10 h-[130px] flex flex-col items-start justify-between'>
                                    <h2 className='text-[2rem]'>Изменить E-mail адрес</h2>
                                    <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Введите новый E-mail
                                        адрес</label>
                                    <input type="email"
                                           value={newEmail}
                                           onChange={(e) => setNewEmail(e.target.value)}
                                           className='border-gray-200 border-2 w-full h-[60px] outline-0 text-[2rem] pl-8!'/>
                                </div>
                                <button
                                    onClick={handleUpdateEmail}
                                    className='w-[160px] h-[60px] bg-[#009661] rounded-[1rem] text-white text-[2rem]'>Сохранить
                                </button>
                            </div>
                            <div className='flex flex-col items-start justify-between w-5/10 h-full'>
                                <div className='w-8/10 h-[130px] flex flex-col items-start justify-between'>
                                    <h2 className='text-[2rem]'>Изменить пароль</h2>
                                    <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Введите новый пароль</label>
                                    <input type="email"
                                           className='border-gray-200 border-2 w-full h-[60px] outline-0 text-[2rem] pl-8!'/>
                                </div>
                                <div className='w-[360px] h-[60px] flex items-center justify-between'>
                                    <button className='w-[160px] h-[60px] bg-[#009661] rounded-[1rem] text-white text-[2rem]'>Сохранить</button>
                                    <NavLink to='/' className='w-[160px] h-[60px] rounded-[1rem] text-[#009661] text-[2rem] flex items-center justify-center'>Забыли пароль?</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {props.isConfig && open && (
                <div className='h-[300px] w-full bg-white border-t-[1px] border-gray-200 flex justify-center items-center'>
                    <div className='w-95/100 h-8/10 flex flex-col justify-between items-start'>
                        <p className='text-[2rem] w-full md:w-1/2 lg:w-4/10'>Тут вы можете поменять информацию про компанию, которую видят ваши клиенты </p>
                        <div className='w-full h-[210px] flex items-start justify-between flex-col'>
                            <div className='flex flex-col items-start justify-between w-full h-full'>
                                <div className='w-75/100 h-[100px] flex items-center justify-between'>
                                    <div className='w-45/100'>
                                        <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Имя</label>
                                        <input type="email"
                                               className='border-gray-200 border-2 w-full h-[60px] outline-0 text-[2rem] pl-8!'/>
                                    </div>
                                    <div className='w-45/100'>
                                        <label htmlFor="" className='text-gray-500 text-[1.6rem]'>Фамилия</label>
                                        <input type="email"
                                               className='border-gray-200 border-2 w-full h-[60px] outline-0 text-[2rem] pl-8!'/>
                                    </div>
                                </div>
                                <button className='w-[250px] h-[60px]! bg-[#009661] rounded-[1rem] text-white text-[2rem]'>Сохранить изменения</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}