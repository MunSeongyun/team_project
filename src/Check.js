import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {Inventorys} from './Inventory'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Comment from './Comment';

const Check = () => {

    const post = useLocation().state

    const [page,setPage] = useState(1)
    const [pageNum, setPageNum] = useState([])

    


    const [posts, setPosts] = useState([])
    useEffect(()=>{
      fetch("http://localhost:3000/posts",{
        method:"GET"
      })
      .then((response)=>{
        return response.json()})
      .then((ans) => {setPosts(ans)
        return ans.length
      }).then((a) => {
        let i = 0
    for(i = 0; i < posts.length; i++){
      if(posts[i].id === post.id){
        
        break
      }
    }
        setPageNum(Array.from({length:Math.ceil((a-i-1)/5)}, (v,i) => i+1))}).catch()

    })
    
    
    const onClick = (e) => {
      setPage(Number(e.target.innerHTML))
    }

    const onClick1 = (e) => {
      setPage(1)
    }
    


  return (
    <div>
      

        <h1>{post.title}
        <div><Link to={`/update/${post.id}`} state={
            {
                "id":post.id,
                "title":post.title,
                "content": post.content,
                "author": post.author,
                "timestamp": post.timestamp,
                "img":post.img
            }
            }
        ><button id='write' type="button" className="btn btn-dark">글 수정</button></Link>
        
        <Link 
        to={`/delete/${post.id}`}
        state={{
          id:post.id
        }}>
        <button style={{marginRight:"5%"}} id='write' type="button" className="btn btn-dark">글 삭제</button></Link></div>

        </h1>
        <img style={{
            paddingTop:"70px",
            width:"600px",
            height:"auto"
        }} src={post.img} alt="" />
        <p style={
            {paddingTop:"30px",
              paddingBottom:"30px",
              whiteSpace: "pre-wrap"
            }
        }>{post.content}</p>

        <Comment state={
          {id:post.id}
        }></Comment>

    <span onClick={onClick1}><Inventorys 
    posts={posts}
    pages={5}
    page_num={page}
    start={post.id}
    isFromCheck={true}
    /></span>
    

      <nav aria-label="Page navigation example"><ul className="pagination justify-content-center">
      {
      pageNum.map((i)=>{
        if(i == page){
          return <li key={i} className="page-item"><a className="page-link"><b>{i}</b></a></li>    
        }
        return <li key={i} className="page-item"><a className="page-link" onClick={onClick}>{i}</a></li>    
      })
      }
      </ul></nav>
    </div>
  )
}

export default Check