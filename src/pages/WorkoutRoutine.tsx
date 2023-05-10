/* eslint-disable jsx-a11y/no-redundant-roles */
import React,{useState} from 'react';
import '../styles/WorkoutRoutine.scss';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline,MdEdit } from 'react-icons/md';
import AddExecise from '../components/AddExecise';

const WorkoutRoutine = () => {
    const [day,setDay] = useState('monday');
    const [isShowen,setIsShowen] = useState(false)
    return (
        <section className='Wokout-routine'>
            <AddExecise isShowen={isShowen}  setIsShowen={setIsShowen}/>
            <div className='tabs'>
                <button onClick={()=>setDay('monday')} className={`${day === 'monday' && 'active'}`}>
                    Monday
                </button>
                <button onClick={()=>setDay('tuesday')} className={`${day === 'tuesday' && 'active'}`}>
                    Tuesday
                </button>
                <button onClick={()=>setDay('Wednesday')} className={`${day === 'Wednesday' && 'active'}`}>
                    Wednesday
                </button>
                <button onClick={()=>setDay('Thursday')} className={`${day === 'Thursday' && 'active'}`}>
                    Thursday
                </button>
                <button onClick={()=>setDay('Friday')} className={`${day === 'Friday' && 'active'}`}>
                    Friday
                </button>
                <button onClick={()=>setDay('Saturday')} className={`${day === 'Saturday' && 'active'}`}>
                    Saturday
                </button>
                <button onClick={()=>setDay('Sunday')} className={`${day === 'Sunday' && 'active'}`}>
                    Sunday
                </button>
            </div>
            <article className='targted-muscle-inputs'>
                <h2 className='targted-muscle-h2'>Targeted muscles </h2>
                <div className='input'>
                    <input type='checkbox' />
                    <label htmlFor="">Chest</label>
                </div>
                
            </article>
            <section className='today'>
                <div className='exercises-holder'>
                    <h2 className='targted-muscle'>exercises</h2>
                    <span className='add' onClick={()=>setIsShowen(true)}>{IoMdAdd({})}</span>
                    <article className='exercise'>
                        <span className='num'>
                            #1
                        </span>
                        <span className='delete'>
                            {MdDeleteOutline({})}
                        </span>
                        <span className='edit'>
                            {MdEdit({})}
                        </span>
                        <ul role='list'>
                            <li>
                                bench press
                            </li>
                            <li>
                                3 sets
                            </li>
                            <li>
                                8 to 10 reps
                            </li>
                            <li>
                                3mins rest
                            </li>
                        </ul>
                        <img src="" alt="" />
                    </article>
                </div>
            </section>
        </section>
    )
}

export default WorkoutRoutine