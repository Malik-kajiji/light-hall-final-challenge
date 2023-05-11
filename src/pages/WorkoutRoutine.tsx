/* eslint-disable jsx-a11y/no-redundant-roles */
import React,{useState,useEffect} from 'react';
import '../styles/WorkoutRoutine.scss';
import { useDispatch } from 'react-redux';
import { currentpageActions } from '../redux/CurrentPage';
import Routine from '../components/Routine';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';


const WorkoutRoutine = () => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const [day,setDay] = useState('Monday');
    const [routine,setRoutine] = useState<any>()
    useEffect(()=>{
        dispatch(currentpageActions.setCurrentPage({page:'routine'}));
        if(auth.currentUser){
            const ref = doc(db,'workoutRoutines',auth.currentUser.uid)
            const endSnapshot =  onSnapshot(ref,(res)=>{
                if(res.exists()){
                    setRoutine(res.data()?.routine)
                    setLoading(false)
                }
            })

            return () => endSnapshot()
        }
    },[])
    if(loading){
        return <h2>loading</h2>
    }
    return (
        <section className='Wokout-routine'>
            <div className='tabs'>
                <button onClick={()=>setDay('Monday')} className={`${day === 'Monday' && 'active'}`}>
                    Monday
                </button>
                <button onClick={()=>setDay('Tuesday')} className={`${day === 'Tuesday' && 'active'}`}>
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
            <Routine routine={routine} day={day}/>
        </section>
    )
}

export default WorkoutRoutine