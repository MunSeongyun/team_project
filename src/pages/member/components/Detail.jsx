import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../App.module.css'
import DetailComments from './DetailComments';
import Figure from './Figure';

const Detail = () => {
  const params = useParams()
  const navigate = useNavigate()
  // data에 현재 posts값 
  // comments를 불러온다 id별로 
  const [commentData, setCommentData] = useState([])
  const [member, setMember] = useState([])
  const [topic, setTopic] = useState({
    name: '',
    description: '',
    postId: params.id,
  })

  const loginId = sessionStorage.getItem('Nickname')

  const commentNumber = commentData.length

  // POST 
  // 지금 토픽값이 들어가는게 아닌 submit 했던 과거의 토픽값이 들어감 
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
    // 이렇게 따로 만들어 주어야 잘 들어가게 된다 그렇게 안하면 그 전에 전부 없애버림 
    const topics = {
      name: topic.name,
      description: topic.description,
      timestamp: timestamp,
      postId: topic.postId
    }

    fetch(`http://localhost:5000/member_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // state에서 바로 주는 방법이 있고, 따로 만들어서 주는 방법이 있다 state에서 변형된 값을 주어야한다면 안에서 새로 만들어주어야 한다 
      body: JSON.stringify(topics)
    })
      .then((response) => response.json())
      .then((response) => {
        setCommentData([...commentData, response])
        setTopic({
          name: '',
          description: '',
          postId: params.id,
        })
      })
  }
  // members GET
  useEffect(() => {
    fetch(`http://localhost:5000/member_posts?id=${params.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => setMember(response))
  }, [])

  // comment GET
  useEffect(() => {
    fetch(`http://localhost:5000/member_comments?postId=${params.id}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => setCommentData(response))
  }, [])

  const onChange = (event) => {
    const { target: { name, value } } = event
    setTopic({ ...topic, [name]: value })
  }

  const CommentDelete = (id) => {
    fetch(`http://localhost:5000/member_comments/${id}`, {
      method: 'DELETE'
    })
      // 여기 이해하기 
      .then(() => {
        const updateData = commentData.filter(data => data.id !== id)
        setCommentData(updateData)
      })
  }

  const MemberDelete = () => {
    fetch(`http://localhost:5000/member_posts/${params.id}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/member'))
  }

  return (
    <div className={style.body}>
      <Figure />
      <Link state={{ member: member }} to={`/member/updateMember/${params.id}`}>updateMember</Link>
      <button style={{ position: "absolute", right: "10%" }} class="btn btn-danger" onClick={MemberDelete}>delete</button>
      <div className="container">
        <div className='row'>
          <div className="col-lg-2 col-md-2 col-sm-3 col-xs-2" >
            <div className="short-div" style={{ width: "35em", height: "500px" }}>
              <h1 className={style.intro}>자기소개</h1>
              <div>밑의 희미한 글</div>
              {member.length >= 1 ? <p>{member[0].description}</p> : "로딩중"}
            </div>
          </div>
          {/* 사진line 상세정보 사진 db */}
            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-2 offset-5">
              {member.length >= 1 ? <img class="w-100" style={{ width: "25em", height: "657px" }} className='rounded mx-auto d-block' src={member[0].descriptionImage}></img> : "로딩중"}
          </div>
          <div className="comment area" style={{ paddingTop: "5%" }}>
            <div className="container">
              <h2 style={{ textAlign: "center" }}>Comment</h2>
              <hr />
              <h4>댓글 수 : {commentNumber}</h4>
              <hr />
              <div className="comment list">
                <ul className="list-group list-group-flush">
                  {commentData.map((datas) => {
                    return (
                      <li className="list-group-item" key={datas.id}>
                        <DetailComments data={datas} key={datas.id} name={datas.name} description={datas.description} timestamp={datas.timestamp} />
                        <button onClick={() => CommentDelete(datas.id)}>Delete</button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="container" style={{ paddingTop: "10%", display: 'inline-block', textAlign: 'center' }} >
            코멘트 폼
            <div className={style.commentForm} style={{ backgroundColor: "#fafafa", }} >
              <form className="form-group" onSubmit={onSubmit} method="POST" >
                <div style={{ margin: "20px" }}>
                  <label htmlFor="usr">이름:</label>
                  <input className="form-control" id="usr" type="text" name="name" value={topic.name} onChange={onChange} placeholder='name' />
                </div>
                <div style={{ margin: "20px" }}>
                  <label htmlFor="comment">내용:</label>
                  <textarea className="form-control" rows="5" name="description" value={topic.description} onChange={onChange} placeholder='description' />
                </div>
                <button className="btn btn-success">제출</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

