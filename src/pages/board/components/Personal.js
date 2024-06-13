import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inventorys } from './Inventory';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const Personal = ({setUser}) => {
  // 로그인 정보
  const nickname = sessionStorage.getItem("Nickname");
  const userId = sessionStorage.getItem("UserId");
  const navigate = useNavigate();

  // 밑 페이지네이션 번호
  const [page, setPage] = useState(1);
  // 페이지네이션이 몇 번부터 몇 번까지 필요한지 저장할 배열
  const [pageNum, setPageNum] = useState([]);
  // db에 저장된 게시글들
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/board_posts?author=${nickname}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((ans) => setPosts(ans))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [nickname]);

  // 게시글을 서버로부터 받아왔을 때 페이지네이션 수정
  useEffect(() => {
    const totalPosts = posts.length;
    setPageNum(Array.from({ length: Math.ceil(totalPosts / 10) }, (v, i) => i + 1));
  }, [posts]);

  // 페이지네이션 번호가 클릭되면 page를 그 번호로 바꿈
  const onClick = (e) => {
    setPage(Number(e.target.innerHTML));
  };

  // 회원탈퇴 버튼을 누르면 모달창을 띄움
  const deleteButton = () => {
    setShowModal(true);
  };

  // 회원탈퇴 확인 버튼을 누르면 삭제
  const handleClose = async () => {
    setShowModal(false);
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setUser(null)
        sessionStorage.clear();
        navigate('/');
      } else {
        alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원탈퇴 중 에러 발생", error);
      alert("회원탈퇴 중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 취소 버튼을 누르면 삭제하지 않음
  const cancelClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <button style={{ marginRight: "0%" }} id='write' type="button" className="btn btn-dark" onClick={deleteButton}>회원탈퇴</button>
      </div>

      <Modal show={showModal} onHide={cancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>정말로 회원탈퇴 하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>되돌릴 수 없습니다!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelClose}>취소</Button>
          <Button variant="secondary" onClick={handleClose}>확인</Button>
        </Modal.Footer>
      </Modal>

      <h1>내가 작성한 글 목록</h1>
      <Inventorys 
        posts={posts}
        pages={10}
        page_num={page}
        start={posts[0]?.id}
        isFromCheck={false}
      />
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pageNum.map((i) => (
            <li key={i} className="page-item">
              <a className="page-link" onClick={onClick}>{i === page ? <b>{i}</b> : i}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Personal;