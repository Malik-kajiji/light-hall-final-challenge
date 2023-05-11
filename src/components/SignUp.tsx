import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertActions } from '../redux/AlertController';
import { auth,db } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword,updateProfile,setPersistence,browserSessionPersistence } from 'firebase/auth';
import { doc,getDoc,setDoc } from 'firebase/firestore';
import { RxEyeOpen,RxEyeClosed } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    const [signUpData,setSignUpData] = useState({name:'',email:'',password:'',confirmPassword:''});
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [allUsers,setAllUsers] = useState<any>([]);
    const dispatch = useDispatch();

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const name = e.target.name
        const value = e.target.value
        setSignUpData(prev => ({...prev,[name]:value}));
    }
    function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        const {name , email , password , confirmPassword } = signUpData
        if(name === '' || email === '' || password === '' || confirmPassword === ''){
            dispatch(alertActions.showAlert({msg:'make sure to fill up all the inputs',showen:true,type:'warrning'}));
        }else if(password !== confirmPassword){
            dispatch(alertActions.showAlert({msg:'make sure to match the password',showen:true,type:'error'}));
        }
        else {
            let exists = false;
            for(let i = 0; i< allUsers.length ; i++){
                if(allUsers[i].username === name){
                    exists = true;
                }
            }
            if(exists){
                dispatch(alertActions.showAlert({ msg: 'usename is already taken', showen: true, type: 'error' }))
            }else {
                setPersistence(auth,browserSessionPersistence)
                .then(async ()=>{
                    try {
                        const res = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password);
                        updateProfile(res.user, { displayName: signUpData.name });


                        dispatch(alertActions.showAlert({ msg: 'created account successfully', showen: true, type: 'success' }));
                        
                        
                        const ref = doc(db,'allUsers','users');
                        setDoc(ref,{data:[...allUsers,{username:name,uid:res.user.uid}]});


                        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                        let newObj: {isRoutineCreated:boolean,routine : any} = {isRoutineCreated:false,routine:{}};
                        weekday.forEach(e=> {
                            newObj.routine[e] = {
                                exercises:[],
                                isRestDay:false,
                                targetedMuscles:[]
                            }
                        })
                        const routineRef = doc(db,'workoutRoutines',res.user.uid);
                        setDoc(routineRef,newObj)
                        .then(() => navigate('/'));

                    } catch (err : any ) {
                        dispatch(alertActions.showAlert({ msg: err.message, showen: true, type: 'error' }));
                    }
                })
                .catch(err => dispatch(alertActions.showAlert({ msg: err.message, showen: true, type: 'error' })))
            }
        }
        
    }

    useEffect(()=>{
        const ref = doc(db,'allUsers','users');
        getDoc(ref)
        .then(res => {
            if(res.exists()){
                setAllUsers(res.data().data);
            }
        })
    },[])
    return (
        <article className={'signUp'}>
            <form action="" className={`${'form'} medium-fs normal-gray`} >
                <label htmlFor="name" className={`${'formLabel'} normal`}>Name</label>
                <input
                    type="text" 
                    name='name' 
                    id='name' 
                    className={`${'formInput'} light-gray light`}
                    placeholder='name'
                    onChange={(e)=>handleChange(e)}
                    value={signUpData.name}
                    />
                <label htmlFor="email" className={`${'formLabel'} normal`}>Email</label>
                <input 
                    type="text" 
                    name='email' 
                    id='email' 
                    className={`${'formInput'} light-gray light`}
                    placeholder='example@email.com'
                    onChange={(e)=>handleChange(e)}
                    value={signUpData.email}
                    />
                <div className={'passwordHolder'}>
                    <label htmlFor="password" className={`${'formLabel'} normal`}>Password</label>
                    <input 
                        type={showPassword? 'text':'password'} 
                        name='password' 
                        id='password' 
                        className={`${'formInput'} light-gray light`}
                        placeholder='***********'
                        onChange={(e)=>handleChange(e)}
                        value={signUpData.password}
                        />
                        <span className={`${'showPassword'} x-large-fs light-gray`} onClick={()=>setShowPassword(prev => !prev)}>
                            {showPassword?
                                RxEyeOpen({})
                                :
                                RxEyeClosed({})
                            }
                        </span>
                </div>
                <div className={'passwordHolder'}>
                    <label htmlFor="confrimPassword" className={`${'formLabel'} normal`}>Confirm Password</label>
                    <input 
                        type={showConfirmPassword? 'text': 'password'} 
                        name='confirmPassword' 
                        id='confrimPassword' 
                        className={`${'formInput'} light-gray light`}
                        placeholder='***********'
                        onChange={(e)=>handleChange(e)}
                        value={signUpData.confirmPassword}
                        />
                        <span className={`${'showPassword'} x-large-fs light-gray`} onClick={()=>setShowConfirmPassword(prev => !prev)}>
                            {showConfirmPassword?
                                RxEyeOpen({})
                                :
                                RxEyeClosed({})
                            }
                        </span>
                </div>
                <button className={`${'signUpBtn'} P-BTN`} onClick={(e)=>handleClick(e)}>Create Account</button>
            </form>
            <p className={`${'newAccount'} small-fs light`}>
                already have an account? 
                <Link to='/' className={'createAccount'} >
                    login
                </Link>
            </p>
        </article>
    )
}

export default SignUp