import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import {Inventorys} from './Inventory'
import Comment from './Comment';
import '../css/Board_App.css';

const Check = () => {
    const navigate = useNavigate();
    // 로그인 확인
    const nickname = sessionStorage.getItem("Nickname")
    // 인벤토리에서 받아둔 글 정보 그대로 전달 받음
    const post = useLocation().state

    // 밑 페이지네이션 번호
    const [page,setPage] = useState(1)
    // 페이지네이션이 몇 번 부터 몇 번까지 필요한지 저장할 배열
    const [pageNum, setPageNum] = useState([])
    // db에 저장된 게시글들
    const [posts, setPosts] = useState([])
    const [showModal, setShowModal] = useState(false);

    // 서버로 요청을 보내 게시글들을 받아옴
    useEffect(
      ()=>{
        fetch("http://localhost:5000/board_posts",{
          method:"GET"
        })
        .then((response)=>{
          return response.json()})
        .then((ans) => {
          setPosts(ans)
        })
        .catch()
      },[])
    
      // 게시글을 서버로 부터 받아왔을때랑, 내가 보고있는 게시글이 바뀔때 페이지 네이션 수정
      useEffect(()=>{
        let a = posts.length 
        let i = 0
        for(i = 0; i < posts.length; i++){
          if(posts[i].id === post.id){
            break
          }         
        }
        setPageNum(Array.from(
          {length:Math.ceil((a-i-1)/5)}, (v,i) => i+1
        ))
        },[posts, post.id]
      )
    
      // 페이지네이션 번호가 클릭되면 page를 그 번호로 바꾼다
    const onClick = (e) => {
      setPage(Number(e.target.innerHTML))
    }

    // 다른 글을 선택했을때 다시 페이지네이션을 1번으로 되돌린다.
    const onClick1 = (e) => {
      setPage(1)
    }

    // 글 삭제 버튼을 누르면 모달창을 띄운다.
    const deleteButton = (e) => {
      setShowModal(true)
    }
    
    // 글 삭제 확인 버튼을 누르면 삭제한다
  const handleClose = () => {
    setShowModal(false);
    navigate(`/board/delete/${post.id}`)
  };
  // 취소 버튼을 누르면 삭제하지 않는다
  const cancelClose = () => {
    setShowModal(false);
  };
  

  return (
    <div>
        <h1>{post.title}
        {nickname===post.author&&<div><Link to={`/board/update/${post.id}`} state={
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
        
        <button style={{marginRight:"5%"}} id='write' type="button" className="btn btn-dark" onClick={deleteButton}>글 삭제</button></div>}
        </h1>
        {/* ----여기까지 게시글 제목과 수정 및 삭제 버튼 조건부 렌더링 */}

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
        {/* --- 여기까지 게시글 이미지 및 본문 */}
        
        <Comment state={
          {id:post.id}
        }></Comment>
        {/* 게시글 id를 통해 저장된 댓글들을 불러온다 */}

    <span onClick={onClick1}><Inventorys 
    posts={posts}
    pages={5}
    page_num={page}
    start={post.id}
    isFromCheck={true}
    /></span>
    {/* 페이지네이션의 게시글 목록들 */}

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
      {/* 페이지네이션의 번호 선택 창 */}

      {/* 모달 창 구현 */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>정말로 삭제 하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          되돌릴 수 없습니다!!!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelClose}>
            취소
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Check