import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/Board_App.css';
const Delete = () => {

  const navigate = useNavigate();
    const id = useParams();
    console.log(id);
    fetch(`http://localhost:5000/board_posts/${id.id}`,
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