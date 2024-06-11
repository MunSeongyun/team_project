import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const underBar = () => {
  return (
      <footer style={{marginTop: "80px"}}className="bg-light py-4 text-center">
        <Container>
          <Row>
            <Col md={4}>
              <h5 style={{ fontWeight: 'bold' }}>1조's HomePage</h5>
              <div style={{ padding: "2px" }} className="social-icons">
                <a href="https://www.facebook.com" className="text-dark me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" className="text-dark me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com" className="text-dark me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com" className="text-dark me-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://www.instagram.com" className="text-dark" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={4}>
                  <h5 style={{ fontWeight: 'bold' }}>조원</h5>
                  <ul style={{ padding: "2px"  }} className="list-unstyled">
                    <li><a style={{ color: 'black', padding: "2px" }} href="/member/detail/1">구진모</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/member/detail/4">김완덕</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/member/detail/5">박지은</a></li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5 style={{ fontWeight: 'bold' }}>조원</h5>
                  <ul style={{ padding: "2px"  }} className="list-unstyled">
                    <li><a style={{ color: 'black', padding: "2px"  }} href="/member/detail/2">문성윤</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/member/detail/3">김형선</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/member/detail/6">김대겸</a></li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5 style={{ fontWeight: 'bold' }}>메뉴</h5>
                  <ul style={{ padding: "2px"  }}className="list-unstyled">
                    <li><a style={{ color: 'black', padding: "2px" }} href="/member">조원소개</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/hyji">현지학기제</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/board">게시판</a></li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
  );
}

export default underBar