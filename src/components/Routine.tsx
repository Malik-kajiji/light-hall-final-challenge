/* eslint-disable jsx-a11y/no-redundant-roles */
import React,{useState,useEffect} from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline,MdEdit } from 'react-icons/md';
import AddExecise from '../components/AddExecise';
import { useDispatch } from 'react-redux';
import { alertActions } from '../redux/AlertController';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

type propsType = {
    day:string,
    routine:any
}

const Routine = ({day,routine}:propsType) => {
    const [RestDay,setRestDay] = useState(false);
    const [muscles,setMuscles] = useState<string[]>([]);
    const [allExercises,setAllExercises] = useState<any>([])
    const [isShowen,setIsShowen] = useState(false);
    const dispatch = useDispatch()


    function handleMuscles(e:React.ChangeEvent<HTMLInputElement>){
        setMuscles((prev: string[]) => {
            let newArr = [];
            if(prev.includes(e.target.name)){
                newArr = prev.filter(musucle => musucle !== e.target.name)
            }else {
                newArr = [...prev,e.target.name]
            }
            return newArr
        })
    }

    function handleSave(){
        if(auth.currentUser){
            const ref = doc(db,'workoutRoutines',auth.currentUser.uid);
            const newData = {
                isRoutineCreated:true,
                routine:{...routine,[day]:{
                    exercises:allExercises,
                    isRestDay:RestDay,
                    targetedMuscles:muscles
                }}}

            setDoc(ref,newData)
            .then(()=>{
                dispatch(alertActions.showAlert({msg:'changes saved successfully',type:'success'}))
            })
            .catch(err => {
                dispatch(alertActions.showAlert({msg:err.msg,type:'error'}))
            })
        }
    }

    function handleAdd(){
        if(muscles.length > 0){
            setIsShowen(true)
        }else {
            dispatch(alertActions.showAlert({msg:'choose at least one muscle',type:'warrning'}))
        }
    }

    function handleDelete(index:number){
        setAllExercises((prev: any[]) => prev.filter((e,i)=> i !== index));
    }

    useEffect(()=>{
        const { isRestDay , exercises , targetedMuscles } = routine[day];
        setRestDay(isRestDay)
        setMuscles(targetedMuscles)
        setAllExercises(exercises)
    },[day])

    return (
        <>
            <AddExecise muscles={muscles} isShowen={isShowen}  setIsShowen={setIsShowen} setAllExercises={setAllExercises}/>
            <div className='rest-day'>
                <h2>
                    is it a rest day?
                </h2>
                <p>
                    {RestDay? 'yes' : 'no'}
                </p>
                <button className={RestDay ? 'yes' : ''} onClick={()=>setRestDay((prev: any) => !prev)}>
                    <span></span>
                </button>
            </div>
            {!RestDay &&
                <>
                    <article className='targted-muscle-inputs'>
                        <h2 className='targted-muscle-h2'>Targeted muscles </h2>
                        <div className='input'>
                            <input 
                                type='checkbox' 
                                checked={muscles.includes('chest')}
                                onChange={(e)=>handleMuscles(e)}
                                name='chest'
                                />
                            <label htmlFor="">chest</label>
                        </div>
                        <div className='input'>
                            <input 
                                type='checkbox' 
                                checked={muscles.includes('back')}
                                onChange={(e)=>handleMuscles(e)}
                                name='back'
                            />
                            <label htmlFor="">back</label>
                        </div>
                        <div className='input'>
                            <input 
                                type='checkbox' 
                                checked={muscles.includes('legs')}
                                onChange={(e)=>handleMuscles(e)}
                                name='legs'
                                />
                            <label htmlFor="">legs</label>
                        </div>
                        <div className='input'>
                            <input 
                            type='checkbox' 
                            checked={muscles.includes('shoulders')}
                            onChange={(e)=>handleMuscles(e)}
                            name='shoulders'
                            />
                            <label htmlFor="">shoulders</label>
                        </div>
                        <div className='input'>
                            <input 
                            type='checkbox' 
                            checked={muscles.includes('biceps')}
                            onChange={(e)=>handleMuscles(e)}
                            name='biceps'
                            />
                            <label htmlFor="">biceps</label>
                        </div>
                        <div className='input'>
                            <input 
                            type='checkbox' 
                            checked={muscles.includes('triceps')}
                            onChange={(e)=>handleMuscles(e)}
                            name='triceps'
                            />
                            <label htmlFor="">triceps</label>
                        </div>
                    </article>
                    <section className='today'>
                        <div className='exercises-holder'>
                            <h2 className='targted-muscle'>exercises</h2>
                            <span className='add' onClick={handleAdd}>{IoMdAdd({})}</span>
                            {allExercises.map((e:any,i:number)=>(
                                <article className='exercise' key={i}>
                                    <span className='num'>
                                        #{i+1}
                                    </span>
                                    <span className='delete' onClick={()=>handleDelete(i)}>
                                        {MdDeleteOutline({})}
                                    </span>
                                    <ul role='list'>
                                        <li>
                                            {e.name}
                                        </li>
                                        <li>
                                            {e.set} sets
                                        </li>
                                        <li>
                                            {e.repRange}
                                        </li>
                                        <li>
                                            {e.rest} rest
                                        </li>
                                    </ul>
                                    <img src={e.gif} alt="" />
                                </article>
                            ))
                            }
                        </div>
                    <button className='save-btn P-BTN' onClick={handleSave}>
                            save
                        </button>
                    </section>
                </>
            }
        </>
    )
}

export default Routine