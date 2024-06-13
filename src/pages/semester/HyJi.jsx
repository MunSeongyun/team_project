import React, { useState, useRef, useEffect } from 'react';
import './css/Button.css';
import HyjiList from './HyjiList';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import HyjiModal from './HyjiModal';


const HyJi = () => {
  const [hyenji, setHyenji] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(false)
  const [image, setImage] = useState(null)

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

  // 수정한 Input값 가져오기
  const nameRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const loginedId = sessionStorage.getItem('Nickname')

  // 
  const addHyenji = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const info = infoRef.current.value;
    const updateHyenji = {
      name,
      image,
      info,
      humun: loginedId
    };
    fetch('http://localhost:5000/hyenji', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateHyenji)
    }).then(() => {
      setButtonClicked((a) => !a)
      setEdit(false);
      setImage(null);
    })
    formRef.current.reset();
  };


  // 로그인을 해야 수정가능
  const handleClick = () => {
    if (!loginedId) {
      setShowModal(true)
    }
    else { setEdit(!edit) }

  };

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const handleDetailPost = ({ item }) => {
    if (item.humun !== loginedId) {
      setShowUpdateModal(true)
      return
    } else {
      navigate('/Hyjiupdate', {
        state: {
          id: item.id,
          name: item.name,
          image: item.image,
          info: item.info,
          humun: item.humun
        }
      })
    }
  }
  const [showDelectModal, setShowDelectModal] = useState(false)
  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = (id, humun) => {
    if (humun !== loginedId) {
      setShowDelectModal(true)
      return
    }
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

  // 모달 닫기
  const handleClose = () => {
    setShowModal(false);
  };
  const handleDelectClose = () => {
    setShowDelectModal(false);
  }
  const handleUpdateClose = () => {
    setShowUpdateModal(false);
  }

  // 이미지 파일로 올리기 구현
  const imgChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const imgbase54 = reader.result
      setImage(imgbase54)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 className='container' style={{ fontWeight: 'bold' }}>현지학기제</h1>
      <div>
        {
          hyenji.map((item) => {
            return (
              <div key={item.id} className="container mt-5"> {/* 고유한 key 속성을 추가 */}
                <p><strong>작성자: {item.humun}</strong></p>
                <HyjiList name={item.name} image={item.image} info={item.info} />  {/* {리스트 컴포넌트} */}
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
                      onClick={() => { handleDelete(item.id, item.humun) }}
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
        loginedId && edit && ( // 조건부 렌더링
          <form ref={formRef}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" type="text" placeholder='제목' ref={nameRef} />
            </div>
            <div>
              <img src={image} style={{ display: 'flex', justifyContent: 'flex-end' }} />
              <input onChange={imgChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" type="file" />
            </div>
            <div>
              <textarea className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" type="text" placeholder='정보' ref={infoRef}
                rows={5} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontWeight: 'bold' }} className=" mt-4">작성자:{loginedId}</span>
            </div>
            <button className='btn btn-outline-success' onClick={addHyenji} style={{ float: 'right' }}>
              정보추가
            </button>
          </form>
        )
      }

      {/* {모달 컴포넌트} */}
      <HyjiModal show={showModal} handleClose={handleClose} title="로그인 해주세요" bodyText="글 추가는 로그인 후 가능합니다." buttonText="확인" />
      <HyjiModal show={showDelectModal} handleClose={handleDelectClose} title="실패" bodyText="본인의 글만 삭제 가능합니다" buttonText="확인" />
      <HyjiModal show={showUpdateModal} handleClose={handleUpdateClose} title="실패" bodyText="본인의 글만 수정 가능합니다" buttonText="확인" />
    </div>
  );
}

export default HyJi