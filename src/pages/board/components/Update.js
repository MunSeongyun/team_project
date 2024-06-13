import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import '../css/Board_App.css';
const Update = () => {
  const navigate = useNavigate();
  const id = useParams();

  // 수정하기 편하게 이미 게시글에 입력되어있던 값을 받아왔다.
  const inputed = useLocation();
  const [inputs, setInputs] = useState({
    title:inputed.state.title,
    content:inputed.state.content,
    author:inputed.state.author
  });
  const [image, setImage] = useState(inputed.state.image);

    const imgChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        console.log(reader);
        reader.onload = () => {
            const imgbase64 = reader.result;
            setImage(imgbase64);
        };

        reader.readAsDataURL(file);
    };
  const onChange = (e) => {
    setInputs((prev) => {
      return (
        {...prev,
          [e.target.name]: e.target.value}
      )
    }
    )
  }

  const onSubmit = () => {
    // 시간 설정
    let now = new Date()
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();  
    let timestamp = year+"-"+month+"-"+date+" / "+hours+":"+minutes+":"+seconds


    const post = {
      id:id,
      title: inputs.title,
      content: inputs.content,
      author: inputs.author,
      timestamp: timestamp,
      img:image
    }

    

    fetch(`http://localhost:5000/board_posts/${inputed.state.id}`,{
      method:"PUT",
      body:JSON.stringify(post)
    }).then(
      ()=>{
        navigate("/board/1/10/0")
        //window.location.href='/1/10/0'
      }
    ).catch()
    
  }

  return (
    <>
      <h1 style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>게시글 수정</h1>

    <div className="input-group input-group-sm mb-3" >
  <span className="input-group-text" id="inputGroup-sizing-sm">작성자</span>
  <input onChange={onChange} value={inputs.author} name="author" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
  </div>

  <div className="input-group input-group-sm mb-3">
  <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
  <input onChange={onChange} value={inputs.title} name="title" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
    </div>
    {image&&<img src={image} alt="" />}
    <div className="input-group input-group-sm mb-3">
  <span className="input-group-text" id="inputGroup-sizing-sm">이미지</span>
  <input onChange={imgChange} name="img" type="file" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
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

export default Update