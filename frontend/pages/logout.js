import Router from 'next/router';
import { useEffect } from 'react';

export default function logout(){
    useEffect(()=>{
        localStorage.removeItem('access');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        Router.push('/');
    });

    return (<div></div>);
}