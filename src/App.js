// Main 홈페이지 & 회원가입 & 로그인 대겸
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarBs from "./components/bootstrap/NavbarBs";
import Footer from "./components/bootstrap/underBar.jsx";
import Main from "./pages/Main.jsx";
import HyJi from "./pages/HyJi.jsx";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

// 게시판 & 게시판 댓글 성윤
import BoardAdd from './pages/board/components/Add.js';
import { Inventory } from './pages/board/components/Inventory.js';
import BoardUpdate from './pages/board/components/Update.js';
import BoardDelete from './pages/board/components/Delete.js';
import BoardCheck from './pages/board/components/Check.js';
import BoardStart from './pages/board/components/Start.js';

// 조원소개 형선
import Member from './pages/member/components/Home.jsx'
import MemberDetail from './pages/member/components/Detail.jsx'
import MemberUpdate from './pages/member/components/Update.jsx'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('Email');
    const savedNickname = sessionStorage.getItem('Nickname');
    const savedUserId = sessionStorage.getItem('UserId');
    if (savedEmail && savedNickname && savedUserId) {
      setUser({ email: savedEmail, nickname: savedNickname, userId: savedUserId });
    }
  }, []);

  return (
    <BrowserRouter>
      <NavbarBs user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/HyJi" element={<HyJi />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Signin" element={<Signin />} />

        {/* 문성윤 게시판 */}
        <Route path="/board" element={<BoardStart />} />
        <Route path="/board/:page_num/:pages/:start" element={<Inventory />} />
        <Route path="/board/add" element={<BoardAdd />} />
        <Route path='/board/update/:id' element={<BoardUpdate />} />
        <Route path='/board/delete/:id' element={<BoardDelete />} />
        <Route path='/board/check/:id' element={<BoardCheck />} />

        {/* 김형선 조원소개*/}
        <Route path="/member" element={<Member />} />
        <Route path="/member/detail/:id" element={<MemberDetail />} />
        <Route path="/member/update/:id" element={<MemberUpdate />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;