import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { currentpageActions } from '../redux/CurrentPage';
import '../styles/Partners.scss';

const Partners = () => {
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(currentpageActions.setCurrentPage({page:'partners'}));
    },[])
    return (
        <section>
            Partners
        </section>
    )
}

export default Partners