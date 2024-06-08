import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const CommentUpdate = ({post_id, c_id, func, render}) => {
    
    
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
        author:"",
    })

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
            author:""
            }
        )
        }).then(()=>{func((prev)=>!prev)}).then(()=>{render(a=>!a)}).catch()
        
    };

    return( <div>
        <form className="mb-4"><input name="author" onChange={onChange} value={inputs.author} className="form-control" rows="3" placeholder="작성자 이름"></input></form>
        <form className="mb-4"><textarea name="content" onChange={onChange} value={inputs.content} className="form-control" rows="3" placeholder="댓글 내용"></textarea></form>
        <button  onClick={onClick} type="button" className="btn btn-dark" style={{marginLeft:"1%", marginBottom:"3%"}}>등록</button>
        </div>)
}


const Comment = () => {
    const post_id = useLocation().state.id;

    const [render, setRender] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatingId, setUpdatingId] = useState("")
    const [comments, setComments ] = useState([]);
    const [inputs, setInputs] = useState({
        content:"",
        author:"",
    })

    useEffect(()=>{
        fetch(`http://localhost:5000/board_comments?post_id=${post_id}`,{
        method:"GET"
        }).then((res)=>res.json())
        .then((res)=>setComments(res))
        .catch()
    },[render, post_id])
    
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
            author:""
            }
        )
        }).catch()

        setRender(a=>!a)
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
                
                <div>
                <form className="mb-4"><input name="author" onChange={onChange} value={inputs.author} className="form-control" rows="3" placeholder="작성자 이름"></input></form>
                <form className="mb-4"><textarea name="content" onChange={onChange} value={inputs.content} className="form-control" rows="3" placeholder="댓글 내용"></textarea></form>
                <button  onClick={onClick} type="button" className="btn btn-dark" style={{marginLeft:"1%", marginBottom:"3%"}}>등록</button>
                </div>
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
                            <button onClick={onUpdate} type="button" className="btn btn-secondary" style={{height:"4%", fontSize:"10px", padding:"1%", margin:"1%"}}>수정<span style={{display:"none"}}>{item.id}</span></button>
                            <button onClick={onDelete} type="button" className="btn btn-secondary" style={{height:"4%", fontSize:"10px", padding:"1%"}}>삭제<span style={{display:"none"}}>{item.id}</span></button>
                    
                        </div>
                        </div>
                        </div>

                        {item.content}
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