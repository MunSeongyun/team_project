import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeTimeLine from './HomeTimeLine';
import styles from "../App.module.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  // state와 같은 형식으로 
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/member_posts', {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => setData(response))
  }, [])

  const toBoard=()=>{
    navigate("/board")
  }

  return (

    <div>

      <div className={styles.intro_flex_container}>
        {data.map((data) =>
          // 메인 html 필요할지도 
          <HomeTimeLine
            key={data.id}
            id={data.id}
            title={data.title}
            author={data.author}
            image={data.image}
          />
        )}
      </div>
      <div style={{textAlign:"right"}} >
        <button className="btn btn-primary" onClick={toBoard}>
          게시판으로<i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Home