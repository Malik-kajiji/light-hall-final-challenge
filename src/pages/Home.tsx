/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState , useEffect } from 'react';
import '../styles/Home.scss';
import { GiCheckMark } from 'react-icons/gi';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { db,auth } from '../config/firebaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentpageActions } from '../redux/CurrentPage';

const Home = () => {
    const dispatch = useDispatch();
    const [page,setPage] = useState('today');
    const [routine,setRoutine] = useState({});
    const [isRoutineCreated,setIsRoutineCreated] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(auth.currentUser !== null){
            const ref = doc(db,'workoutRoutines',auth.currentUser.uid);
            getDoc(ref)
            .then((res)=>{
                if(res.exists()){
                    setIsRoutineCreated(res.data().isRoutineCreated);
                    setRoutine(res.data().routine)
                }                
            })
        }
        dispatch(currentpageActions.setCurrentPage({page:'home'}));
    },[])
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
                        <div className='exercises-holder'>
                            <h2 className='targted-muscle'>chest and triceps</h2>
                            <article className='exercise'>
                                <span className='num'>
                                    #1
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
                        <button className='completed-btn P-BTN'>
                            completed the session
                        </button>
                    </section>
                    :
                    <section className='week'>
                        <div className='days-holder'>
                            <h2 className='stats'>stats of this week</h2>
                            <article className='session'>
                                <h2 className='day'>
                                    Monday
                                </h2>
                                <p className='targted-muscle'>
                                    chest and triceps
                                </p>
                                <span className={'icon '}>
                                    {MdOutlineCancel({})}
                                </span>
                            </article>
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