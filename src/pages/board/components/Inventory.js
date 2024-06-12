import { ListGroupItem } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../css/Board_App.css';
const Inventorys = ({posts,pages,page_num,start,isFromCheck}) => {
  // 게시글들, 전체페이지네이션 수, 선택된 페이지, 몇 번째 글 부터 보일건지, 
  // 이 요청이 Check에서 왔는지(check에서 왔다면 게시글 추가 버튼을 렌더링 하지 않음)

  const id = sessionStorage.getItem("Nickname")

  // start는 id로 오므로 게시글 배열의 인덱스로 변경
  let i = 0
  for (i = 0; i < posts.length; i++) {
    if (posts[i].id === start) {
      break
    }
  }
  start = i + 1

  // check에서 왔다면 그 게시물은 보여주지 않고, 다음 게시물 부터 보여줌
  if (isFromCheck) {
    start++
  }


  return (
    <>
      <ListGroup style={{ padding: "0" }} className='whole' >

      {/* 로그인 되어있는지 && Check 컴포넌트에서 오지 않았는지 */}
      {/* 둘 다 만족해야지 글 작성 버튼을 렌더링한다 */}
      {id && !isFromCheck&&
      <div><Link to="/board/add"><button id='write' type="button" className="btn btn-dark">글 작성</button></Link></div>
      }

      {/* 게시판의 가장 윗 부분, 열 이름을 표시한다 */}
        <ListGroupItem>
          <div className='id'><b>id</b></div>
          <div className='author'><b>author</b></div>
          <div className='title'><b>title</b></div>
          <div style={{ "textAlign": "center" }} className='time'><b>timestamp</b></div>
        </ListGroupItem>

      {/* 게시글을 페이지네이션으로 선택된 번호의 범위 내의 게시글만 렌더링 한다 */}
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