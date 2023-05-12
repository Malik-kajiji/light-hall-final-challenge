import React,{ useEffect , useState } from 'react'
import { useDispatch } from 'react-redux';
import { currentpageActions } from '../redux/CurrentPage';
import '../styles/Partners.scss';
import { HiUserAdd,HiUserRemove } from 'react-icons/hi';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { Link } from 'react-router-dom';
import { alertActions } from '../redux/AlertController';

const Partners = () => {
    const dispatch = useDispatch();
    const [page,setPage] = useState('Partners');
    const [partners,setPartners] = useState<any>([]);
    const [requests,setRequests] = useState<any>([]);
    const [inputData,setInputData] = useState('');
    const [allUsers,setAllUsers] = useState<any>([]);

    function handleSendRequest(){
        if(inputData === ''){
            dispatch(alertActions.showAlert({msg:"make sure to enter the partner's username",type:'warrning'}))
        }else if(inputData === auth.currentUser?.displayName){
            dispatch(alertActions.showAlert({msg:"you can't add yourself",type:'warrning'}))
        }else {
            let exists = false;
            let uid;
            for(let i = 0; i< allUsers.length ; i++){
                if(allUsers[i].username === inputData){
                    exists = true;
                    uid = allUsers[i].uid;
                }
            }
            if(exists){
                const userRef = doc(db,'partners',uid)
                getDoc(userRef)
                .then(res => {
                    if(res.exists()){
                        const data = res.data()
                        let newData = {added:data.added,requests:[...data.requests,{
                            name:auth.currentUser?.displayName,
                            uid:auth.currentUser?.uid
                        }]}
                        setDoc(userRef,newData)
                        .then(()=>{
                            setInputData('')
                            dispatch(alertActions.showAlert({msg:"request sent successfully",type:'success'}))
                        })
                        .catch((err)=>{
                            dispatch(alertActions.showAlert({msg:err.message,type:'error'}))
                        })
                    }
                })
            }else {
                dispatch(alertActions.showAlert({ msg: 'user not found', showen: true, type: 'error' }))
            }
        }
    }

    function handleAdd(uid:string,name:string){
        if(auth.currentUser){
            const Ref = doc(db,'partners',auth.currentUser?.uid);
            let newData = {added:[...partners,{name:name,uid:uid}],requests:requests.filter((e:any) => e.uid !== uid)};
            setDoc(Ref,newData);

            const usersRef = doc(db,'partners',uid)
            getDoc(usersRef)
            .then((res)=>{
                if(res.exists()){
                    const { added , requests} = res.data();
                    const newData = {added:[...added,{name:auth.currentUser?.displayName,uid:auth.currentUser?.uid}],requests:requests}
                    setDoc(usersRef,newData);
                }
            })
        }
    }
    function handleRemove(uid:string){
        if(auth.currentUser){
            const Ref = doc(db,'partners',auth.currentUser?.uid)
            let newData = {added:partners,requests:requests.filter((e:any) => e.uid !== uid)}
            setDoc(Ref,newData);
        }
    }

    useEffect(()=>{
        if(auth.currentUser){
            const Ref = doc(db,'partners',auth.currentUser?.uid)
            const cancel = onSnapshot(Ref,(res)=>{
                if(res.exists()){
                    setPartners(res.data().added)
                    setRequests(res.data().requests)
                }
            })
            return ()=> cancel()
        }
    },[])
    useEffect(()=>{
        const ref = doc(db,'allUsers','users');
        getDoc(ref)
        .then(res => {
            if(res.exists()){
                setAllUsers(res.data().data);
            }
        })
        dispatch(currentpageActions.setCurrentPage({page:'partners'}));
    },[])
    return (
        <section className='partners'>
            <div className='tabs'>
                <button onClick={()=>setPage('Partners')} className={`${page === 'Partners' && 'active'}`}>
                    Partners
                </button>
                <button onClick={()=>setPage('Requests')} className={`${page === 'Requests' && 'active'}`}>
                    <span>
                        Requests
                    </span>
                    {requests.length > 0 &&
                        <span className='num'>
                            {requests.length}
                        </span>
                    }
                </button>
            </div>
            <article className='update-weight'>
                <h2 className='update-weight-h2'>add an accountability partner </h2>
                <input 
                    type='text'
                    placeholder='enter partner username'
                    onChange={(e)=>setInputData(e.target.value)}
                    value={inputData}
                    />
                <button className='P-BTN' onClick={handleSendRequest}>
                    Add
                </button>
            </article>
            {page === 'Partners' ?
                <article className='added-partners'>
                    {partners.map((e:any,i:number)=>(
                        <div className='partner' key={i}>
                            <h2>
                                {e.name}
                            </h2>
                            <Link to={`/routine/${e.uid}`}>
                                <button className='P-BTN'>
                                    view workout routine
                                </button>
                            </Link>
                            <Link to={`/progress/${e.uid}`}>
                                <button className='P-BTN'>
                                    view progress
                                </button>
                            </Link>
                        </div>
                    ))
                    }
                </article>
            :
            <article className='request-partners'>
                {requests.map((e:any,i:number)=>(
                    <div className='partner' key={i}>
                        <h2>
                            {e.name}
                        </h2>
                        <button className='remove' onClick={()=>handleRemove(e.uid)}>
                            <span>
                                Remove 
                            </span>
                            <span className='icon'>
                                {HiUserRemove({})}
                            </span>
                        </button>
                        <button className='add' onClick={()=>handleAdd(e.uid,e.name)}>
                            <span>
                                Add 
                            </span>
                            <span className='icon'>
                                {HiUserAdd({})}
                            </span>
                        </button>
                    </div>
                ))
                }
            </article>
            }
        </section>
    )
}

export default Partners