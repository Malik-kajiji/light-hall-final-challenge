import React, { useEffect, useState } from 'react';
import Account from './pages/Account';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from './config/store';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const theme = useSelector((state:RootState )=> state.theme.mode);

  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
    })
  },[])
  return (
    <main className={`App ${theme === 'dark' && 'Dark'}`}>
      {isLoggedIn?
        <Account />
      :
        <Account />
      }
    </main>
  );
}

export default App;
