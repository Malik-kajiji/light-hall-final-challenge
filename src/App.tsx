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
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WorkoutRoutine from './pages/WorkoutRoutine';
import Progress from './pages/Progress';
import Partners from './pages/Partners';
import PartnerProgress from './pages/PartnerProgress';
import PartnerRoutine from './pages/PartnerRoutine';
import Loading from './components/Loading';
function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const theme = useSelector((state:RootState )=> state.theme.mode);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
      setLoading(false)
    })

    dispatch(themeActions.changeTheme({newTheme:window.localStorage.getItem('theme')}));
  },[])
  return (
    <>
    <main className={`App ${theme === 'dark' && 'Dark'}`}>
      <Alert />
      {loading ?
        <Loading />
      :
        <>
          {isLoggedIn?
          <Router>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/routine" element={<WorkoutRoutine />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/progress/:uid" element={<PartnerProgress />} />
                <Route path="/routine/:uid" element={<PartnerRoutine />} />
            </Routes>
          </Router>
          :
            <Account />
          }
        </>
      }
    </main>
    </>
  );
}

export default App;
