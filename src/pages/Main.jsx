import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
// import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import oneJo from '../image/화목한 1조.jpg';

const Main = () => {
  return (
    <div className='container mt-5'>
      <div>
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '30vh' }}>
          <Row className="text-center">
            <Col>
              <h1 className="display-5" style={{ fontWeight: 'bold' }}>1조's HomePage</h1>
              <p className="lead"></p>
              <Button href="/" variant="dark">바로가기</Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="d-flex">
        <div style={{ width: "33%", padding: "5px" }} className="Main-image1">
          <Card>
            <Card.Img variant="top" src={oneJo}/>
            <hr/>
            <Card.Body>
              <Card.Title style={{ fontWeight: 'bold' }}>조원소개</Card.Title>
              <Card.Text>1조의 조원들을 소개합니다</Card.Text>
              <Button href="/member" variant="dark">자세히 보기</Button>
            </Card.Body>
          </Card>
        </div>
        <div style={{ width: "33%", padding: "5px" }} className="Main-image2">
          <Card>
            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/256/1623/1623785.png" />
            <hr/>
            <Card.Body>
              <Card.Title style={{ fontWeight: 'bold' }}>현지학기제</Card.Title>
              <Card.Text>일본반의 현지학기제란?</Card.Text>
              <Button href="/HyJi" variant="dark">자세히 보기</Button>
            </Card.Body>
          </Card>
        </div>
        <div style={{ width: "33%", padding: "5px" }} className="Main-image3">
          <Card>
            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/256/5740/5740604.png" />
            <hr/>
            <Card.Body>
              <Card.Title style={{ fontWeight: 'bold' }}>게시판</Card.Title>
              <Card.Text>의견을 자유롭게 써봐요</Card.Text>
              <Button href="/board" variant="dark">입장하기</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Main;
