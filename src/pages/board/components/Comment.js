import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../css/Board_App.css';
const CommentUpdate = ({post_id, c_id, func, render}) => {
    // func는 현재 댓글 수정을 하는 중인지 아닌지 판단하는 함수
    // render은 댓글의 수정이나 삭제 후 부모컴포넌트가 다시 렌더링 하게 하는 함수

    // 로그인 되어있으면 본인의 이름을, 아니라면 익명으로 닉네임 설정
    let nickname = sessionStorage.getItem("Nickname")
    if(!nickname){
        nickname = "Anonymous"
    }
    
    const onChange = (e) => {
        setInputs((prev) => {
            return (
                {
                    ...prev,
                    [e.target.name]:e.target.value
                }
            )
        })
    }
    const [inputs, setInputs] = useState({
        content:"",
        author:nickname,
    })

    const onClick = (e) => {

        // 댓글 작성 시간
        let now = new Date()
        let year = now.getFullYear();
        let month = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();  
    let timestamp = year+"-"+month+"-"+date+" / "+hours+":"+minutes+":"+seconds

        const post = {
            id:c_id,
            content:inputs.content,
            author:inputs.author,
            timestamp: timestamp,
            post_id:post_id
        }

        fetch(`http://localhost:5000/board_comments/${c_id}`,{
        method:"PUT",
        body:JSON.stringify(post)
        }).then(()=>{
        setInputs(
            {
            content:"",
            author:nickname
            }
        )
        }).then(()=>{func((prev)=>!prev)}).then(()=>{render(a=>!a)}).catch()
        
    };

    return( <div>
        <form className="mb-4"><input value={inputs.author} className="form-control" rows="3" placeholder="작성자 이름"></input></form>
        <form className="mb-4"><textarea name="content" onChange={onChange} value={inputs.content} className="form-control" rows="3" placeholder="댓글 내용"></textarea></form>
        <button  onClick={onClick} type="button" className="btn btn-dark" style={{marginLeft:"1%", marginBottom:"3%"}}>등록</button>
        </div>)
}


const Comment = () => {
    let nickname = sessionStorage.getItem("Nickname")
    if(!nickname){
        nickname = "Anonymous"
    }

    const post_id = useLocation().state.id; // 게시글 아이디
    const [render, setRender] = useState(false) // 렌더시키는 용
    const [isUpdating, setIsUpdating] = useState(false) // 댓글 수정중인지 아닌지 확인
    const [updatingId, setUpdatingId] = useState("") // 수정중인 댓글의 아이디
    const [comments, setComments ] = useState([]); // 서버로 받아올 댓글 목록
    const [inputs, setInputs] = useState({
        content:"",
        author:nickname,
    })

    useEffect(()=>{
        fetch(`http://localhost:5000/board_comments?post_id=${post_id}`,{
        method:"GET"
        }).then((res)=>res.json())
        .then((res)=>setComments(res))
        .catch()
    },[render, post_id]) // 새로운 글을 볼때나, 렌더 변수가 바뀔때 마다 다시 서버에 요청해서 댓글 목록을 업데이트
    
    const onClick = (e) => {        
        let now = new Date()
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();  
  
    let timestamp = year+"-"+month+"-"+date+" / "+hours+":"+minutes+":"+seconds

        const post = {
            content:inputs.content,
            author:inputs.author,
            timestamp: timestamp,
            post_id:post_id
        }

        fetch("http://localhost:5000/board_comments",{
        method:"POST",
        body:JSON.stringify(post)
        }).then(()=>{
        setInputs(
            {
            content:"",
            author:nickname
            }
        )
        }).then(()=>{setRender(a=>!a)}).catch()
    };


    const onChange = (e) => {
        setInputs((prev) => {
            return (
                {
                    ...prev,
                    [e.target.name]:e.target.value
                }
            )
        })
    }

    const onUpdate = (e) => {
        let cid = e.target.innerHTML
        let id = [];
        // 버튼 안에 내용에 아이디를 숨겨뒀다가 나중에 가져와서 반복문으로 자른다.
        for( let i = 31; i < cid.length; i++){
            if(cid[i] === "<"){
                break
            }
            id.push(cid[i])
        }
        cid = id.join('')
        setIsUpdating((prev)=>!prev)
        setUpdatingId(cid)
    }

    const onDelete = (e) => {
        let cid = e.target.innerHTML
        let id = [];
        for( let i = 31; i < cid.length; i++){
            if(cid[i] === "<"){
                break
            }
            id.push(cid[i])
        }
        cid = id.join('')
        fetch(`http://localhost:5000/board_comments/${cid}`,
        {   
            method:"DELETE"
        }
        ).then(()=>{setRender((p)=>!p)}).catch()
        
    }


  return (
    <section className="mb-5">
        <div className="card bg-light">
            <div className="card-body">
                {/* 댓글 작성창 */}
                <div>
                    <div className="mb-4">
                        <input value={inputs.author} className="form-control" rows="3" placeholder="작성자 이름"></input>
                    </div>
                    <div className="mb-4">
                        <textarea name="content" onChange={onChange} value={inputs.content} className="form-control" rows="3" placeholder="댓글 내용"></textarea>
                    </div>
                    <button  onClick={onClick} type="button" className="btn btn-dark" style={{marginLeft:"1%", marginBottom:"3%"}}>등록</button>
                </div>
                {/* 댓글 출력 */}
                {comments.map((item)=>{
                    return (
                    <div className="mb-4" key={item.id} >
                    <div className="ms-3" style={{
                        marginBottom:"2%"
                    }}>
                        <div>
                        <div className="fw-bold" style={{
                            display:"inline-block"
                        }}>{item.author}
                        </div>
                        <div style={{
                            display:"inline-block",
                            float:"right"
                        }}>{item.timestamp} 
                        <div>
                            {(item.author==="Anonymous"||nickname===item.author)&&<><button onClick={onUpdate} type="button" className="btn btn-secondary" style={{height:"4%", fontSize:"10px", padding:"1%", margin:"1%"}}>수정<span style={{display:"none"}}>{item.id}</span></button>
                            <button onClick={onDelete} type="button" className="btn btn-secondary" style={{height:"4%", fontSize:"10px", padding:"1%"}}>삭제<span style={{display:"none"}}>{item.id}</span></button></>}
                        </div>
                        </div>
                        </div>
                        {item.content}
                        {/* 현재 댓글 수정 중인지 && 이 댓글의 아이디와 수정중인 댓글의 아이디가 일치하는지 */}
                        {/* 이 두 조건이 맞아야 댓글 밑에 수정 창을 렌더링 한다 */}
                        {isUpdating && item.id === updatingId &&<CommentUpdate post_id={item.post_id} c_id={item.id} func={setIsUpdating} render={setRender}/>}
                    </div>
                    </div>)
                })}
            </div>
        </div>
    </section>
  )
}

export default Comment