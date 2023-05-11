import React,{useState,useEffect} from 'react';
import { doc,getDoc,setDoc  } from 'firebase/firestore';
import { db,auth } from '../config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { alertActions } from '../redux/AlertController';


type props = {
    isShowen: boolean,
    setIsShowen: React.Dispatch<React.SetStateAction<boolean>>,
    setAllExercises:React.Dispatch<React.SetStateAction<{
        name: string;
        set: string;
        repRange: string;
        rest: string;
        gif: string;
    }[]>>,
    muscles:string[]
}

const AddExecise = ({isShowen,setIsShowen,setAllExercises,muscles}:props) => {
    const dispatch = useDispatch();

    const [data,setData] = useState({muscle:'',exercise:'',Sets:'',RepRange:'',Rest:''});
    const [gif,setGif] = useState('');
    const [exercisesList,setExercisesList] = useState<any>({chest:[{name:'',gifUrl:''}]})

    function handleSave(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        const {  exercise , Sets , RepRange , Rest } = data;
        if(exercise === '' || Sets === '' || RepRange === '' || Rest === ''){
            dispatch(alertActions.showAlert({msg:'make sure to fill up all the inputs',type:'warrning'}))
        }else {
            setAllExercises(prev => ([...prev,{name:exercise,set:Sets,repRange:RepRange,rest:Rest,gif:gif}]))
            setIsShowen(false);
            setData({muscle:'',exercise:'',Sets:'',RepRange:'',Rest:''})
            setGif('')
        }
    }
    function handleCancel(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        setIsShowen(false);
        setData({muscle:'',exercise:'',Sets:'',RepRange:'',Rest:''})
        setGif('')
    }

    function handleChange(e:React.ChangeEvent<HTMLSelectElement>){
        setData(prev => {
            let newData = {...prev,[e.target.name]:e.target.value}
            return newData
        })
        if(e.target.name === 'exercise') {
            for(let i = 0; i < exercisesList[data.muscle].length ; i++) {
                if(exercisesList[data.muscle][i].name === e.target.value){
                    setGif(exercisesList[data.muscle][i].gifUrl)
                }
            }
        }
    }

    useEffect(()=>{
        const ref = doc(db,'allExercises','allExercises');
        getDoc(ref)
        .then(res => {
            if(res.exists()){
                setExercisesList(res.data())
            }
        })
    },[])
    return (
        <article className={`add-exercise ${isShowen && 'active'}`}>
            <form action="">
                <select name="muscle" id="" value={data.muscle} onChange={(e)=>handleChange(e)}>
                    <option value="">targeted muscle</option>
                    {muscles.map((e,i)=><option value={e} key={i}>{e}</option>)}
                </select>
                {data.muscle !== '' &&
                    <select name="exercise" id="" value={data.exercise} onChange={(e)=>handleChange(e)}>
                        <option value="" >exercise</option>
                        {exercisesList[data.muscle].map((e:{name:string},i:number)=> <option value={e.name} key={i}>{e.name}</option>)}
                    </select>
                }
                {data.exercise !== '' &&
                    <img src={gif} alt="" />
                }
                <select name="Sets" id="" value={data.Sets} onChange={(e)=>handleChange(e)}>
                    <option value="">Sets</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <select name="RepRange" id="" value={data.RepRange} onChange={(e)=>handleChange(e)}>
                    <option value="">Rep Range</option>
                    <option value="4 to 6">4 to 6</option>
                    <option value="6 to 8">6 to 8</option>
                    <option value="8 to 10">8 to 10</option>
                    <option value="10 to 12">10 to 12</option>
                    <option value="+12">+12</option>
                </select>
                <select name="Rest" id="" value={data.Rest} onChange={(e)=>handleChange(e)}>
                    <option value="">Rest</option>
                    <option value="1min">1min</option>
                    <option value="1min & 30sec">1min & 30sec</option>
                    <option value="2min">2min</option>
                    <option value="2min & 30sec">2min & 30sec</option>
                    <option value="3min">3min</option>
                </select>
                <button className='P-BTN' onClick={(e)=>handleSave(e)}>
                    Add
                </button>
                <button className='P-BTN' onClick={(e)=>handleCancel(e)}>
                    Cancel
                </button>
            </form>
        </article>
    )
}

export default AddExecise