import React,{useState,useEffect} from 'react';
import '../styles/Progress.scss';
import {AreaChart, XAxis , YAxis ,Tooltip , Area } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../config/store';
import { currentpageActions } from '../redux/CurrentPage';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { alertActions } from '../redux/AlertController';

const Progress = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state:RootState) => state.theme.mode);
    const [startInput,setStartInput] = useState('');
    const [updateInput,setUpdateInput] = useState('');
    const [isProgressStarted,setIsProgressStarted] = useState(false);
    const [currentWeight,setCurrentWeight] = useState(0);
    const [ weightData,setWeightData ] = useState([]) 

    function changeStartInput(e:React.ChangeEvent<HTMLInputElement>):void{
        const lastChar = parseFloat(e.target.value[e.target.value.length-1])
        if(e.target.value === ''){
            setStartInput('')
        } else if(Number.isNaN(lastChar)){
            if(e.target.value[e.target.value.length-1] === '.') setStartInput(e.target.value)
        }else if(typeof lastChar == 'number'){
            setStartInput(e.target.value)
        }
    }

    function handleStart(){
        if(startInput === ''){
            dispatch(alertActions.showAlert({msg:'make sure to enter your weight',type:'warrning'}))
        }else if(auth.currentUser){
            const ref = doc(db,'progress',auth.currentUser.uid);
            const newObj = {
                currentWeight: parseFloat(startInput),
                isProgressStarted:true,
                progressHistory:[{date:new Date().toLocaleDateString(),weight:parseFloat(startInput)}]
            }

            setDoc(ref,newObj)
            .then(()=> dispatch(alertActions.showAlert({msg:'progress started',type:'success'})))
        }
    }

    function changeUpdateInput(e:React.ChangeEvent<HTMLInputElement>):void{
        const lastChar = parseFloat(e.target.value[e.target.value.length-1])
        if(e.target.value === ''){
            setUpdateInput('')
        } else if(Number.isNaN(lastChar)){
            if(e.target.value[e.target.value.length-1] === '.') setUpdateInput(e.target.value)
        }else if(typeof lastChar == 'number'){
            setUpdateInput(e.target.value)
        }
    }

    function handleUpdate(){
        if(updateInput === ''){
            dispatch(alertActions.showAlert({msg:'make sure to enter your weight',type:'warrning'}))
        }else if(auth.currentUser){
            const ref = doc(db,'progress',auth.currentUser.uid);
            const newObj = {
                currentWeight: parseFloat(updateInput),
                isProgressStarted:true,
                progressHistory:[...weightData,{date:new Date().toLocaleDateString(),weight:parseFloat(updateInput)}]
            }
            setDoc(ref,newObj)
            .then(()=> dispatch(alertActions.showAlert({msg:'weight updated',type:'success'})))
            .then(()=>setUpdateInput(''))
        }
    }   

    useEffect(()=>{
        if(auth.currentUser){
            const ref = doc(db,'progress',auth.currentUser.uid);
            let cancel = onSnapshot(ref,(res)=>{
                if (res.exists()) {
                    setIsProgressStarted(res.data().isProgressStarted);
                    setCurrentWeight(res.data().currentWeight)
                    setWeightData(res.data().progressHistory)
                }
            })

            return () => cancel()
        }
    },[])
    useEffect(()=>{
        dispatch(currentpageActions.setCurrentPage({page:'progress'}));
    },[])
    return (
        <section className='progress'>
            {isProgressStarted?
                <>
                    <article className='update-weight'>
                        <h2 className='update-weight-h2'>Update your current weight </h2>
                        <input 
                            type='text'
                            placeholder='enter you current weight'
                            onChange={(e)=>changeUpdateInput(e)}
                            value={updateInput}
                            />
                        <button className='P-BTN' onClick={handleUpdate}>
                            update
                        </button>
                    </article>
                    <div className='current-weight'>
                        <h2>
                            {currentWeight}
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
            <article className='update-weight'>
                <h2 className='update-weight-h2'>start your progress </h2>
                <input 
                    type='text'
                    placeholder='enter you current weight'
                    name='start'
                    onChange={(e)=>changeStartInput(e)}
                    value={startInput}
                    />
                <button className='P-BTN' onClick={handleStart}>
                    start
                </button>
            </article>
            }
        </section>
    )
}

export default Progress