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
                  <h5 style={{ fontWeight: 'bold' }}>Topic</h5>
                  <ul style={{ padding: "2px"  }} className="list-unstyled">
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page1">Page</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page2">Page</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page3">Page</a></li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5 style={{ fontWeight: 'bold' }}>Topic</h5>
                  <ul style={{ padding: "2px"  }} className="list-unstyled">
                    <li><a style={{ color: 'black', padding: "2px"  }} href="/page1">Page</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page2">Page</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page3">Page</a></li>
                  </ul>
                </Col>
                <Col md={4}>
                  <h5 style={{ fontWeight: 'bold' }}>Topic</h5>
                  <ul style={{ padding: "2px"  }}className="list-unstyled">
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page1">Page</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page2">Page</a></li>
                    <li><a style={{ color: 'black', padding: "2px" }} href="/page3">Page</a></li>
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