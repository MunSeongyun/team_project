import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Add = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title:"",
    content:"",
    author:"",
    img:""
  });

  const onChange = (e) => {
    setInputs((prev) => {
      return (
        {...inputs,
          [e.target.name]: e.target.value}
      )
    }
    )
  }

  const onSubmit = () => {



    let now = new Date()
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();  
  
    let timestamp = year+"-"+month+"-"+date+" / "+hours+":"+minutes+":"+seconds


    const post = {
      title: inputs.title,
      content: inputs.content,
      author: inputs.author,
      timestamp: timestamp,
      img:inputs.img
    }


    fetch("http://localhost:3000/board_posts",{
      method:"POST",
      body:JSON.stringify(post)
    }).then(()=>{
      
      setInputs(
        {
          title:"",
          content:"",
          author:"",
          img:""
        }
      )
    }).then(
      
      ()=>{
        navigate("/1/10/0")
        //window.location.href='/1/10/0'
      }
    ).catch()
    
  }

  return (
    <>
      <h1 style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>게시글 작성</h1>

    <div className="input-group input-group-sm mb-3" >
  <span className="input-group-text" id="inputGroup-sizing-sm">작성자</span>
  <input onChange={onChange} value={inputs.author} name="author" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
  <input onChange={onChange} value={inputs.title} name="title" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
    </div>
    <div className="input-group input-group-sm mb-3">
  <span className="input-group-text" id="inputGroup-sizing-sm">이미지 링크</span>
  <input onChange={onChange} value={inputs.img} name="img" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
    </div>
    <div className="input-group input-group-lg">
    <span className="input-group-text" id="inputGroup-sizing-lg">본문</span>
    <textarea rows={10} onChange={onChange} value={inputs.content} name="content" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
    </div>
      <div style={{
        textAlign:"right",
        marginTop:"30px"
      }}><button type="button" className="btn btn-dark" onClick={onSubmit}>submit</button></div>
    
    </>
  )
}

export default Add