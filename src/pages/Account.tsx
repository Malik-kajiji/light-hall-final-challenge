import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import '../styles/Account.scss';
import type { RootState } from '../config/store';
import { themeActions } from '../redux/Theme';

const Account = () => {
    const theme = useSelector((state:RootState )=> state.theme.mode);
    const dispatch = useDispatch();
    function handleClick(){
        dispatch(themeActions.toggleTheme({}))
    }
    return (
        <section className={`account ${theme === 'dark' && 'dark'}`}>
            <aside className={'logo'}>
                <h2>
                    <p>Gym</p>
                    <span>Tracker</span>
                </h2>
            </aside>
            <button onClick={handleClick} className={`theme-btn ${theme === 'dark' && 'dark'}`}>
                <span className='bullet'></span>
            </button>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </section>
    )
}

export default Account