import { ListGroupItem } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../css/Board_App.css';
const Inventorys = ({ posts, pages, page_num, start, isFromCheck }) => {

  let i = 0
  for (i = 0; i < posts.length; i++) {
    if (posts[i].id === start) {
      break
    }
  }

  start = i + 1

  if (isFromCheck) {
    start++
  }


  return (
    <>
      <ListGroup style={{ padding: "0" }} className='whole' >

        {!isFromCheck &&
          <div><Link to="/board/add"><button id='write' type="button" className="btn btn-dark">글 작성</button></Link></div>
        }

        <ListGroupItem>
          <div className='id'><b>id</b></div>
          <div className='author'><b>author</b></div>
          <div className='title'><b>title</b></div>
          <div style={{ "textAlign": "center" }} className='time'><b>timestamp</b></div>
        </ListGroupItem>

        {posts.map((item, index) => {
          if (index + 1 >= start && (page_num - 1) * pages <= index - (start - 1) && page_num * pages > index - (start - 1)) {
            return (
              <Link key={item.id} to={`/board/check/${item.id}`} state={
                {
                  "id": item.id,
                  "title": item.title,
                  "content": item.content,
                  "author": item.author,
                  "timestamp": item.timestamp,
                  "img": item.img
                }
              }>
                <ListGroup.Item >
                  <div className='id'>{item.id}</div>
                  <div className='author'>{item.author}</div>
                  <div className='title'>{item.title}</div>
                  <div className='time'>{item.timestamp}</div>
                </ListGroup.Item>
              </Link>
            )
          }

        })}
      </ListGroup>
    </>
  )

}

const Inventory = (props) => {

  const loginedId = sessionStorage.getItem("Nickname")
  console.log(loginedId);

  const navigate = useNavigate()

  const toMember = () => {
    navigate("/member")
  }

  let isFromCheck = false
  let { page_num, pages, start } = useParams();


  const [posts, setPosts] = useState([])
  const [pageNum, setPageNum] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/board_posts", {
      method: "GET"
    })
      .then((response) => { return response.json() })
      .then((ans) => {
        setPosts(ans)
        return ans.length
      })
      .then((a) => { setPageNum(Array.from({ length: Math.ceil((a - start) / pages) }, (v, i) => i + 1)) })
      .catch()
  }, [])



  return (
    <>
      <Inventorys posts={posts} pages={pages} start={posts[0]?.id} page_num={page_num} isFromCheck={isFromCheck} />

      <nav aria-label="Page navigation example"><ul className="pagination justify-content-center">
        {
          pageNum.map((i) => {

            if (page_num == i) {
              return <li key={i} className="page-item"><a className="page-link" ><b>{i}</b></a></li>
            };
            return <li key={i} className="page-item"><a className="page-link" href={`/board/${i}/${pages}/${start}`}>{i}</a></li>
          })
        }
      </ul></nav>
      <div style={{ textAlign: "left" }} >
        <button className="btn btn-primary" onClick={toMember}>
          <i className="bi bi-arrow-left">조원소개로</i>
        </button>
      </div>
    </>
  )
}
export { Inventorys, Inventory };