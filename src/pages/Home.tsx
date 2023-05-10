/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import '../styles/Home.scss';
import { GiCheckMark } from 'react-icons/gi';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';

const Home = () => {
    const [page,setPage] = useState('week')
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
        </section>
    )
}

export default Home