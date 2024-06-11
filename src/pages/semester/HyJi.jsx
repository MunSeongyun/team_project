import React, { useState, useRef, useEffect } from 'react';
import './css/Button.css';
import HyjiList from './HyjiList';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


const HyJi = () => {
  const [hyenji, setHyenji] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(false)
  useEffect(() => {
    fetch('http://localhost:5000/hyenji')
      .then(response => response.json())
      .then(data => setHyenji(data));
  }, [buttonClicked]);

  useEffect(() => {
    if (location.state && location.state.updatedInputs) {
      const updatedInputs = location.state.updatedInputs;
      setHyenji(prevHyenji => prevHyenji.map(item =>
        item.name === updatedInputs.name ? updatedInputs : item
      ));
    }
  }, [location.state]);

  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const loginedId = sessionStorage.getItem('Nickname')

  const addHyenji = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const imag = imageRef.current.value;
    const info = infoRef.current.value;
    const updateHyenji = {
      name,
      imag,
      info
    };
    fetch('http://localhost:5000/hyenji', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateHyenji)
    }).then(() => {
      setButtonClicked((a) => !a)
    })

    formRef.current.reset();
  };


  const handleClick = () => {
    if (!loginedId) {
      setShowModal(true)
    }
    else { setEdit(!edit) }

  };


  const handleDetailPost = ({ item }) => {
    navigate('/Hyjiupdate', {
      state: {
        id: item.id,
        name: item.name,
        imag: item.imag,
        info: item.info
      }
    })
  }

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = (id) => {
    console.log(id);
    // 서버로 DELETE 요청을 보냅니다.
    fetch(`http://localhost:5000/hyenji/${id}`, {
      method: 'DELETE'
    })
      // 요청이 성공하면 아이템을 배열에서 제거합니다.
      .then(() => {
        setHyenji(prevHyenji => prevHyenji.filter(item => item.id !== id));
      });
  };
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    // 모달 닫기
    setShowModal(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='container mt-4' style={{ fontWeight: 'bold' }}>현지학기제</h1>
      <div>
        {
          hyenji.map((item) => {
            return (
              <div key={item.id} className="container"> {/* 고유한 key 속성을 추가 */}
                <HyjiList name={item.name} image={item.imag} info={item.info} />
                <div className="row justify-content-end">
                  <div className="col-auto ">
                    <Button className='btn btn-dark btn-lg' href="/Hyjiupdate" onClick={(e) => {
                      e.preventDefault()
                      handleDetailPost({ item })
                    }}>수정</Button>
                  </div>
                  <div className="col-auto ">
                    <button
                      className='btn btn-dark btn-lg'
                      onClick={() => { handleDelete(item.id) }}
                    >삭제</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className='btn btn-dark ' onClick={handleClick}>추가</button>
      </div>

      {
        loginedId && edit && (
          <form ref={formRef}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <input type="text" placeholder='제목' ref={nameRef} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <input type="text" placeholder='이미지링크' ref={imageRef} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <textarea type="text" placeholder='정보' ref={infoRef} />
            </div>
            <button className='btn btn-outline-success' onClick={addHyenji} style={{ float: 'right' }}>
              정보추가
            </button>
          </form>
        )
      }

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>로그인 해주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          글 추가는 로그인 후 가능합니다.
        </Modal.Body>
        <Modal.Footer>
          {/* 취소 버튼 */}
          <Button variant="secondary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HyJi