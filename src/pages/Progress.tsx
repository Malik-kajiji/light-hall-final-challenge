import React,{useState,useEffect} from 'react';
import '../styles/Progress.scss';
import {AreaChart, XAxis , YAxis ,Tooltip , Area } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../config/store';
import { currentpageActions } from '../redux/CurrentPage';

const Progress = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state:RootState) => state.theme.mode);
    const [ weightData,setWeightData ] = useState([
        {'date':'11-jan-2023','weight':70},
        {'date':'12-jan-2023','weight':70.5},
        {'date':'13-jan-2023','weight':68.2},
        {'date':'14-jan-2023','weight':72.8},
        {'date':'15-jan-2023','weight':74},
        {'date':'16-jan-2023','weight':75.7},
    ]) 


    useEffect(()=>{
        dispatch(currentpageActions.setCurrentPage({page:'progress'}));
    },[])
    return (
        <section className='progress'>
            <article className='update-weight'>
                <h2 className='update-weight-h2'>Update your current weight </h2>
                <input 
                    type='text'
                    placeholder='enter you current weight'
                    />
                <button className='P-BTN'>
                    update
                </button>
            </article>
            <div className='current-weight'>
                <h2>
                    78.6 kg
                </h2>
            </div>
            <article className='chart'>
            <AreaChart width={1100} height={400} data={weightData}
                >
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`${theme === 'light'? '#6BA8E6' : '#C6DEFF'}`} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={`${theme === 'light'? '#F0F8FF' : '#101828'}`} stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="weight" stroke="#abc4ff" fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
        </article>
        </section>
    )
}

export default Progress