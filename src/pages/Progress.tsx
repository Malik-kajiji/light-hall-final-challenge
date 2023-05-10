import React,{useState} from 'react';
import '../styles/Progress.scss';
import {AreaChart, XAxis , YAxis ,Tooltip , Area } from 'recharts';

const Progress = () => {
    const [ priceDate,setPriceData ] = useState([
        {'date':'11-jan-2023','weight':70},
        {'date':'12-jan-2023','weight':70.5},
        {'date':'13-jan-2023','weight':68.2},
        {'date':'14-jan-2023','weight':72.8},
        {'date':'15-jan-2023','weight':74},
        {'date':'16-jan-2023','weight':75.7},
    ]) 
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
            <article className='chart'>
            <AreaChart width={1005} height={400} data={priceDate}
                >
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6BA8E6" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#F0F8FF" stopOpacity={0.1}/>
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