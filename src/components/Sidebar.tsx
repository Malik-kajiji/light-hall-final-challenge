/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch,useSelector } from 'react-redux';
import { themeActions } from '../redux/Theme';
import type { RootState } from '../config/store';
import { FiLogOut } from 'react-icons/fi';
import { CgGym } from 'react-icons/cg';
import { FiUsers,FiBarChart2 } from 'react-icons/fi';
const Sidebar = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state:RootState )=> state.theme.mode);

    function handleClick() {
        dispatch(themeActions.toggleTheme({}))
    }

    return (
        <aside className='sidebar'>
            <div className='top'>
                <h2 className='logo'>
                    <p>Gym</p>
                    <span>Tracker</span>
                </h2>
                <button className={`theme-btn ${theme === 'dark' && 'dark'}`} onClick={handleClick}>
                    <span className='bullet'></span>
                </button>
            </div>
            <ul role='list'>
                <li>
                    <span>
                        Home
                    </span>
                    <span className='icon'>
                        {AiOutlineHome({})}
                    </span>
                </li>
                <li>
                    <span>
                        Workout routine
                    </span>
                    <span className='icon'>
                        {CgGym({})}
                    </span>
                </li>
                <li>
                    <span>
                        Progress
                    </span>
                    <span className='icon'>
                        {FiBarChart2({})}
                    </span>
                </li>
                <li>
                    <span>
                        Partners
                    </span>
                    <span className='icon'>
                        {FiUsers({})}
                    </span>
                </li>
            </ul>
            <button className='logOut'>
                <p className='name'>
                    Malik
                </p>
                <p className='email'>
                    malik@gmail.com
                </p>
                <span className='icon'>
                    {FiLogOut({})}
                </span>
            </button>
        </aside>
    )
}

export default Sidebar