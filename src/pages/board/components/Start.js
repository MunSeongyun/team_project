import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Board_App.css';
const Start = () => {
    const navigate = useNavigate();
    useEffect(()=>{navigate("/board/1/10/0")},[])
    
}

export default Start