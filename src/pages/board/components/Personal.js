import React, { useEffect, useState } from 'react'
import {Inventorys} from './Inventory'

const Personal = () => {
    // 로그인 정보
    const nickname = sessionStorage.getItem("Nickname")

    // 밑 페이지네이션 번호
    const [page,setPage] = useState(1)
    // 페이지네이션이 몇 번 부터 몇 번까지 필요한지 저장할 배열
    const [pageNum, setPageNum] = useState([])
    // db에 저장된 게시글들
    const [posts, setPosts] = useState([])

    useEffect(
        ()=>{
          fetch(`http://localhost:5000/board_posts?author=${nickname}`,{
            method:"GET"
          })
          .then((response)=>{
            return response.json()})
          .then((ans) => {
            setPosts(ans)
          })
          .catch()
        },[]
    )
    // 게시글을 서버로 부터 받아왔을때 페이지 네이션 수정
    useEffect(()=>{
        let a = posts.length 
        setPageNum(Array.from(
          {length:Math.ceil((a)/10)}, (v,i) => i+1
        ))
        },[posts]
    )
      // 페이지네이션 번호가 클릭되면 page를 그 번호로 바꾼다
      const onClick = (e) => {
        setPage(Number(e.target.innerHTML))
      }
  return (
    <>
    <h1>내가 작성한 글 목록</h1>
    <Inventorys 
    posts={posts}
    pages={10}
    page_num={page}
    start={posts[0]?.id}
    isFromCheck={false}
    />
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
      </>
  )
}

export default Personal