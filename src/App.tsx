import React, { useEffect, useState } from 'react';
import Account from './pages/Account';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './config/store';
import { themeActions } from './redux/Theme';
import Alert from './components/Alert';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const theme = useSelector((state:RootState )=> state.theme.mode);
  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
    })

    dispatch(themeActions.changeTheme({newTheme:window.localStorage.getItem('theme')}));
  },[])
  return (
    <main className={`App ${theme === 'dark' && 'Dark'}`}>
      <Alert />
      {isLoggedIn?
        <Sidebar />
      :
        <Account />
      }
    </main>
  );
}

export default App;
