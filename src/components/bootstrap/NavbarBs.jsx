import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarBs = ({ user, setUser }) => {
  const navigate = useNavigate();
  // 로그아웃 버튼 클릭시
  const handleLogout = () => {
    /* localStorage.removeItem('Email');
    localStorage.removeItem('Nickname');
    localStorage.removeItem('UserId'); */
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('Nickname');
    sessionStorage.removeItem('UserId');
    setUser(null);
    navigate('/');
  };

  return (
    <div><Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar navbar-expand-lg navbar-light bg-light fixed-top" bg='info' variant='light'>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>1조's HomePage</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="조원소개" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/member/detail/3775">구진모</NavDropdown.Item>
              <NavDropdown.Item href="/member/detail/5">박지은</NavDropdown.Item>
              <NavDropdown.Item href="/member/detail/2">문성윤</NavDropdown.Item>
              <NavDropdown.Item href="/member/detail/3">김형선</NavDropdown.Item>
              <NavDropdown.Item href="/member/detail/6">김대겸</NavDropdown.Item>
              <NavDropdown.Item href="/member/detail/4">김완덕</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/HyJi">현지학기제</Nav.Link>
            <Nav.Link href="/board">게시판</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link href='/board/personal'>Welcome {sessionStorage.getItem('Nickname')}</Nav.Link>
                <Nav.Link eventKey={2} onClick={handleLogout}>Log out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/Signin">Sign in</Nav.Link>
                <Nav.Link href="/Login">Log in</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></div>
    
  );
}

export default NavbarBs;