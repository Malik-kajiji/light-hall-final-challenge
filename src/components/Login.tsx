import React,{useState} from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { alertActions } from '../redux/AlertController';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { RxEyeOpen,RxEyeClosed } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [loginData,setLoginData] = useState({email:'',password:''});
    const dispatch = useDispatch();

    function handleLoginChange(e:React.ChangeEvent<HTMLInputElement>){
        const name = e.target.name
        const value = e.target.value
        setLoginData(prev => ({...prev,[name]:value}));
    }

    function handleLoginWithEmail(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        if(loginData.email === '' || loginData.password === ''){
            dispatch(alertActions.showAlert({msg:'make sure to fill up the inputs',showen:true,type:'warrning'}));
        }else {
            signInWithEmailAndPassword(auth,loginData.email,loginData.password)
            .then((user)=>{
                dispatch(alertActions.showAlert({msg:'logged in successfully',showen:true,type:'success'}));
            })
            .catch((err)=> {
                dispatch(alertActions.showAlert({msg:err.message,showen:true,type:'error'}));
            })
        }
    }

    return (
        <article className={'logIn'}>
        <form action="" className={`${'form'} medium-fs normal-gray`}>
            <label htmlFor="email" className={`${'formLabel'} normal`}>Email</label>
            <input 
                type="text" 
                name='email' 
                id='email' 
                className={`${'formInput'} light-gray light`}
                placeholder='example@email.com'
                value={loginData.email}
                onChange={(e)=>handleLoginChange(e)}
                />
            <div className={'passwordHolder'}>
                <label htmlFor="password" className={`${'formLabel'} normal`}>Password</label>
                <input 
                    type={showPassword? 'text': 'password'} 
                    name='password' 
                    id='password' 
                    className={`${'formInput'} light-gray light`}
                    placeholder='***********'
                    onChange={(e)=>handleLoginChange(e)}
                    value={loginData.password}
                    />
                    <span className={`${'showPassword'} x-large-fs light-gray`} onClick={()=>setShowPassword(prev => !prev)}>
                        {showPassword?
                            RxEyeOpen({})
                            :
                            RxEyeClosed({})
                        }
                    </span>
            </div>
            <button className={`${'logInBtn'} P-BTN`} onClick={(e)=>handleLoginWithEmail(e)}>Log In</button>
        </form>
        <p className={`${'newAccount'} small-fs light`}>
            Don't have an account? 
            <Link to='/signup' className={'createAccount'} >
                Create free account
            </Link>
        </p>
    </article>
    )
}

export default Login