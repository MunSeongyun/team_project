import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../App.module.css"
import { Link } from 'react-router-dom';

// Home에서 받아옴
const HomeTimeLine = ({ id, title, author, image }) => {
  return (
    <>
      <div className={styles.card}>
        <Link key={id} to={`/member/detail/${id}`}>
          <img className={styles.TimeLineImage} src={image}></img>
        </Link>
        <div className='TimeLineText'>
          <figure className="text-center">
            <blockquote className="blockquote">
              <p>{author}</p>
            </blockquote>
            {/* 이부분 db.json에 description 추가하면 될듯 */}
            <figcaption className={["blockquote-footer", styles.text_shadow]}>

              <cite title="Source Title">{title}</cite>
            </figcaption>
          </figure>
          
          
        </div>
        
      </div>
    </>
  )
}

export default HomeTimeLine