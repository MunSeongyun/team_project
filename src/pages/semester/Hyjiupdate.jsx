import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Hyjiupdate = () => {
  // useLocation 훅을 사용하여 URL에서 상태 가져오기
  const { id, name, imag, info } = useLocation().state;
  // useNavigate 훅을 사용하여 페이지 이동 기능 가져오기
  const navigate = useNavigate();
  // 입력 상태를 관리하는 useState 훅 사용
  const [inputs, setInputs] = useState({
    id: id || '',
    name: name || '',
    imag: imag,
    info: info || ''
  });
  console.log(inputs);
  // 모달의 표시 여부를 관리하는 useState 훅 사용
  const [showModal, setShowModal] = useState(false);

  // 입력 필드 변경 시 호출되는 함수
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    // 데이터를 서버에 저장하는 비동기 요청

  };

  // 되돌아가기 버튼 클릭 시 호출되는 함수
  const handleGoBack = () => {
    // 페이지 이전으로 이동
    navigate(-1);
  };

  // 저장 버튼 클릭 시 호출되는 함수
  const handleSave = () => {
    // 페이지 이동
    const updatedInputs = { ...inputs };
    fetch(`http://localhost:5000/hyenji/${updatedInputs.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedInputs)
    })
    .then(() => {navigate('/Hyji');
      // 저장 완료 후 모달 표시
      
    });
    
  };

  // 모달 닫기 버튼 클릭 시 호출되는 함수
  const handleClose = () => {
    // 모달 닫기
    setShowModal(false);
  };

  return (
    <div>
      <main className="container my-5">
        <h1>현지학기제</h1>
        <p className="text-muted">
          Subheading that sets up context, shares more info about the author, or
          generally gets people psyched to keep reading
        </p>
        <form onSubmit={handleSubmit}>
          {/* 제목 입력  */}
          <div className="form-group" style={{ width: "100%" }}>         
            <span style={{ float: "left" }}>제목</span>
            <input
              value={inputs.name}
              onChange={onChange}
              name='name'
              type="text"
              className="form-control"
              id="title"
            />
          </div>
          {/* 사진 입력 */}
          <div className="mt-3" style={{ width: "100%" }}>
            <span style={{ float: "left" }}>사진</span>
            <input
              value={inputs.imag}
              onChange={onChange}
              name='imag'
              type="imag"
              className="form-control"
              id="title"
            />
          </div>
          {/* 내용 입력  */}
          <div className="mt-4" style={{ width: "100%" }}>
            <span style={{ float: "left" }}>내용</span>
            <textarea
              value={inputs.info}
              name='info'
              onChange={onChange}
              className="form-control"
              id="content"
            ></textarea>
          </div>
          {/* 버튼  */}
          <div style={{ width: "100%" }}>
            {/* 저장 버튼 */}
            <button
              className="btn btn-dark mt-2"
              style={{ float: "right" }}
              type="submit"
            >저장</button>
            {/* 되돌아가기 버튼 */}
            <button
              className="btn btn-light mt-2 mr-2"
              style={{ float: "right" }}
              onClick={handleGoBack}
            >돌아가기</button>
          </div>
        </form>
      </main>
      
      {/* 모달 */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>저장할까요, 되돌아갈까요?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          저장하시겠습니까? 되돌아가시려면 취소 버튼을 클릭하세요.
        </Modal.Body>
        <Modal.Footer>
          {/* 취소 버튼 */}
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          {/* 저장 버튼 */}
          <Button variant="primary" onClick={handleSave}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Hyjiupdate;
