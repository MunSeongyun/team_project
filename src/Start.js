import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate = useNavigate();
    useEffect(()=>{navigate("/1/10/0")})
    
}

export default Start