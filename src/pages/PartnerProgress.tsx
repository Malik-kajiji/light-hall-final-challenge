import React,{useState,useEffect} from 'react';
import '../styles/Progress.scss';
import {AreaChart, XAxis , YAxis ,Tooltip , Area } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../config/store';
import { currentpageActions } from '../redux/CurrentPage';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { alertActions } from '../redux/AlertController';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const PartnerProgress = () => {
    const { uid } = useParams()
    const dispatch = useDispatch();
    const theme = useSelector((state:RootState) => state.theme.mode);
    const [isProgressStarted,setIsProgressStarted] = useState(false);
    const [currentWeight,setCurrentWeight] = useState(0);
    const [ weightData,setWeightData ] = useState([]) 
    const [loading,setLoading] = useState(true)



    useEffect(()=>{
        if(uid){
            const ref = doc(db,'progress',uid);
            let cancel = onSnapshot(ref,(res)=>{
                if (res.exists()) {
                    setIsProgressStarted(res.data().isProgressStarted);
                    setCurrentWeight(res.data().currentWeight)
                    setWeightData(res.data().progressHistory)
                }
                setLoading(false)
            })

            return () => cancel()
        }else {
            setLoading(false)
        }
    },[])
    useEffect(()=>{
        dispatch(currentpageActions.setCurrentPage({page:'partners'}));
    },[])

    if(loading) return <Loading />
  return (
    <section className='progress'>
            {isProgressStarted?
                <>
                    <div className='current-weight'>
                        <h2>
                            Current Weight : {currentWeight}
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
                </>
            :
            <h2>looks Like your partner haven't started to progress!</h2>
            }
        </section>
  )
}

export default PartnerProgress