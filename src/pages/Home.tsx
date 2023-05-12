/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState , useEffect } from 'react';
import '../styles/Home.scss';
import { db,auth } from '../config/firebaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentpageActions } from '../redux/CurrentPage';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/Loading';

const Home = () => {
    const dispatch = useDispatch();
    const allDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const [page,setPage] = useState('today');
    const [routine,setRoutine] = useState<any>({});
    const [dayRoutine,setDayRoutine] = useState<any>({exercises:[],isRestDay:false,targetedMuscles:[]})
    const [isRoutineCreated,setIsRoutineCreated] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        onAuthStateChanged(auth,(res)=>{
            if(res){
                const ref = doc(db,'workoutRoutines',res.uid);
                getDoc(ref)
                .then((res)=>{
                    if(res.exists()){
                        setIsRoutineCreated(res.data().isRoutineCreated);
                        setRoutine(res.data().routine)
                        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                        const d = new Date();
                        let day = weekday[d.getDay()];
                        setDayRoutine(res.data().routine[day])
                        setLoading(false)
                    }                
                })
            }else {
                setLoading(false)
            }
        })
        dispatch(currentpageActions.setCurrentPage({page:'home'}));
    },[])
    if(loading) return <Loading />
    return (
        <section className='home'>
            <div className='tabs'>
                <button onClick={()=>setPage('today')} className={`${page === 'today' && 'active'}`}>
                    Today
                </button>
                <button onClick={()=>setPage('week')} className={`${page === 'week' && 'active'}`}>
                    This Week
                </button>
            </div>
            {isRoutineCreated?
                <>
                {page === 'today'?
                    <section className='today'>
                        {dayRoutine.exercises.length <= 0 ?
                            <h2> 
                                no exercises have been set for today ! 
                            </h2>
                        :
                            <>
                                <div className='exercises-holder'>
                                    <h2 className='targted-muscle'>
                                        {dayRoutine.targetedMuscles.length === 1 ?
                                            dayRoutine.targetedMuscles[0]
                                        :
                                            dayRoutine.targetedMuscles.map((e:any,i:any)=> {
                                                if(i === dayRoutine.targetedMuscles.length - 1){
                                                    return ` and ${e}`
                                                }else if(i === 0) {
                                                    return `${e}`
                                                }else {
                                                    return ` ,${e}`
                                                }
                                            })
                                        }
                                    </h2>
                                    {dayRoutine.exercises.map((e:any,i:number)=>(
                                        <article className='exercise' key={i}>
                                            <span className='num'>
                                                #{i+1}
                                            </span>
                                            <ul role='list'>
                                                <li>
                                                    {e.name}
                                                </li>
                                                <li>
                                                    {e.set} sets
                                                </li>
                                                <li>
                                                    {e.repRange} reps
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
                            </>
                        }
                    </section>
                    :
                    <section className='week'>
                        <div className='days-holder'>
                            <h2 className='stats'>workout split</h2>
                            {allDays.map((e,i)=> (
                                <article className='session' key={i}>
                                    <h2 className='day'>
                                        {e}
                                    </h2>
                                    <p className='targted-muscle'>
                                        {routine[e].isRestDay?
                                            'rest'
                                        :
                                            routine[e].targetedMuscles.map((e:any,i:any)=> {
                                                if(i === dayRoutine.targetedMuscles.length - 1){
                                                    return ` and ${e}`
                                                }else if(i === 0) {
                                                    return `${e}`
                                                }else {
                                                    return ` ,${e}`
                                                }
                                            })
                                        }
                                    </p>
                                    
                                </article>
                                ))
                            }
                        </div>
                    </section>
                    }
                </>
            :
                <section className='create-routine'>
                    <h2>look's like you haven't created a workout routine yet</h2>
                    <Link to='/routine'>
                        <button className='P-BTN'>
                            Create One
                        </button>
                    </Link>
                </section>
            }
        </section>
    )
}

export default Home