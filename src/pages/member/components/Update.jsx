import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../App.module.css'
// 먼저 Link로 포스트의 id를 가지고온다 
// http://localhost:3000/comments?id=${~} 이런식으로 받아온다 
// 이걸 기존 input 에다가 넣어주고 
// submit 하면 http://localhost:3000/comments?id=${~} 이 주소의 값 업데이트

// detail comments에서 받아옴
// 업데이트 후 렌더링이 안되는중
// 새로 만든놈을 업데이트 바로 돌리면 안됨 부모한테서 못받았으니까
const Update = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state.data
  const [topic, setTopic] = useState({
    id: data.id,
    name: data.name,
    description: data.description,
    postId: data.postId
  })

  // 업데이트 필요 
  // navigate하고 렌더링 필요 
  const onSubmit = (e) => {
    e.preventDefault();

    let now = new Date()
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let timestamp = year + "-" + month + "-" + date + " / " + hours + ":" + minutes + ":" + seconds

    const topics = {
      name: topic.name,
      description: topic.description,
      timestamp: timestamp,
      postId: topic.postId
    }

    fetch(`http://localhost:5000/member_comments/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(topics)
    })
      .then((response) => response.json())
      .then(() => {
        setTopic({ name: '', description: '', })
      }
      ) // 이동한 곳에 topic값을 준다
      .then(() => {
        navigate(`/member/detail/${topic.postId}`)
      }
      )

  }

  const onChange = (event) => {
    const { target: { name, value } } = event
    setTopic({ ...topic, [name]: value })
  }
  return (
    <div>
      <div className="mb-3">
        <form onSubmit={onSubmit} method="POST">
          <input className='form-control' type="text" name="name" value={topic.name} onChange={onChange} placeholder='name' />
          <textarea className="form-control" style={{ height: '500px' }} name="description" rows="3" value={topic.description} onChange={onChange} placeholder='description' />
          <div className={style.updateBtn} >
            <button style={{ display: 'inline-block' }} className='btn btn-primary' >submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update