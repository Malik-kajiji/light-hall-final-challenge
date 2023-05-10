import React from 'react'

type props = {
    isShowen: boolean,
    setIsShowen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddExecise = ({isShowen,setIsShowen}:props) => {


    function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        setIsShowen(false);
    }
    return (
        <article className={`add-exercise ${isShowen && 'active'}`}>
            <form action="">
                <select name="" id="">
                    <option value="">exercise</option>
                </select>
                <img src="" alt="" />
                <select name="" id="">
                    <option value="">Sets</option>
                </select>
                <select name="" id="">
                    <option value="">Rep Range</option>
                </select>
                <select name="" id="">
                    <option value="">Rest</option>
                </select>
                <button className='P-BTN' onClick={(e)=>handleClick(e)}>
                    save
                </button>
            </form>
        </article>
    )
}

export default AddExecise