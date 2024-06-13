import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Board_App.css';
const Add = () => {
  // 로그인 확인
  const nickname = sessionStorage.getItem("Nickname")
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title:"",
    content:"",
    author:nickname,
    img:""
  });
  const [image, setImage] = useState(null);

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
        {...inputs,
          [e.target.name]: e.target.value}
      )
    }
    )
  }

  const onSubmit = () => {
    // 현재 시간 생성
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
      img:image
    }


    fetch("http://localhost:5000/board_posts",{
      method:"POST",
      body:JSON.stringify(post)
    }).then(
      ()=>{
        // 추가후 게시판 첫 페이지로 이동
        navigate("/board/1/10/0")
      }
    ).catch()
    
  }

  return (
    <>
      <h1 style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>게시글 작성</h1>

    {/* 작성자 입력 창 */}
    <div className="input-group input-group-sm mb-3" >
    <span className="input-group-text" id="inputGroup-sizing-sm">작성자</span>
    <input value={inputs.author} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
    </div>
    {/* 제목 입력 창 */}
    <div className="input-group input-group-sm mb-3">
    <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
    <input onChange={onChange} value={inputs.title} name="title" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
    </div>
    {/* 이미지 입력 창 */}
    <div className="input-group input-group-sm mb-3">
    <span className="input-group-text" id="inputGroup-sizing-sm">이미지</span>
    <input onChange={imgChange} name="img" type="file" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
    </div>
    {/* 본문 입력 창 */}
    <div className="input-group input-group-lg">
    <span className="input-group-text" id="inputGroup-sizing-lg">본문</span>
    <textarea rows={10} onChange={onChange} value={inputs.content} name="content" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
    {/* 글 작성 버튼 */}
    </div>
        <div style={{
          textAlign:"right",
          marginTop:"30px"
        }}><button type="button" className="btn btn-dark" onClick={onSubmit}>submit</button></div>
    
    </>
  )
}

export default Add