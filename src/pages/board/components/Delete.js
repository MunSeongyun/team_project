import React from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import '../css/Board_App.css';
const Delete = () => {

  const navigate = useNavigate();
    const id = useLocation();
    

    
    fetch(`http://localhost:5000/board_posts/${id.state.id}`,
        {   
            method:"DELETE"
        }
    ).then(()=>{
      
        navigate("/board/1/10/0")
        //window.location.href='/1/10/0'
    }).catch()


  return (
    <div>Delete</div>
  )
}

export default Delete