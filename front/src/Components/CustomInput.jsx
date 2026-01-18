import {useState} from "react";

export default function CustomInput({border = 'gray', bg = 'gray', checked ='gray', onChange}) {
    const [Checked, setChecked] = useState(false);

    const variable = {
        red: {
            border: 'border-[#EB5757]',
            bg: 'bg-[#EB5757]',
        },
        green: {
            border: 'border-[#009661]',
            bg: 'bg-[#009661]',
        },
        gray: {
            border: 'border-gray-200',
            bg: 'bg-gray-200',
        },
    }

    const handleClick = () => {
        const newValue = !Checked
        setChecked(newValue);
        onChange?.(newValue)
    }
    return (
        <div onClick={handleClick}
             className={`
                            w-[20px]
                            h-[20px]
                            border-[2px]
                            rounded-[0.5rem]
                            flex 
                            items-center 
                            justify-center
                            text-[1.5rem]
                            duration-330
                            text-white
                            cursor-pointer
                            font-bold
                            duration-330
                            ${Checked ? `${variable[bg].bg}` : 'bg-transparent'}
                            ${Checked ? `${variable[checked].border}` : `${variable[border].border}`}`}
        >{Checked && '✓'}</div>
    )
}