import { getExpiryTimeFromToken, checkTokenExpired } from '../helper/helper'
import { useEffect } from 'react';

export default function CheckTokenExpired() {
    useEffect(()=>{
        if(localStorage.getItem('access')!=null){
            let token = localStorage.getItem('access');
            let expiryTime = getExpiryTimeFromToken(token);
            let isExpired = checkTokenExpired(expiryTime);
            if(isExpired){
                localStorage.removeItem('access');
                localStorage.removeItem('id');
                localStorage.removeItem('username');
            }
        }
    })
    return(
        <div></div>
    )
}