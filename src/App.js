// Main 홈페이지 & 회원가입 & 로그인 대겸
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarBs from "./components/bootstrap/NavbarBs";
import Footer from "./components/bootstrap/underBar.jsx";
import Main from "./pages/Main.jsx";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

// 게시판 & 게시판 댓글 성윤
import BoardAdd from './pages/board/components/Add.js';
import { Inventory } from './pages/board/components/Inventory.js';
import BoardUpdate from './pages/board/components/Update.js';
import BoardDelete from './pages/board/components/Delete.js';
import BoardCheck from './pages/board/components/Check.js';
import BoardStart from './pages/board/components/Start.js';
import BoardPersonal from './pages/board/components/Personal.js';

// 조원소개 형선
import Member from './pages/member/components/Home.jsx'
import MemberDetail from './pages/member/components/Detail.jsx'
import MemberUpdate from './pages/member/components/Update.jsx'
import CreateMember from './pages/member/components/CreateMember.jsx';

// 현지학기제 완덕,진모
import Hyji from './pages/semester/HyJi.jsx'
import Hyjiupdate from './pages/semester/Hyjiupdate.jsx'

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
      <div style={{
        margin: "7% 13% 0% 13%",
        backgroundColor: "white",
        color: "black",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
        boxSizing: "border-box",
      }}><Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Signin" element={<Signin />} />

        {/* 문성윤 게시판 */}
        <Route path="/board" element={<BoardStart />} />
        <Route path="/board/:page_num/:pages/:start" element={<Inventory />} />
        <Route path="/board/add" element={<BoardAdd />} />
        <Route path='/board/update/:id' element={<BoardUpdate />} />
        <Route path='/board/delete/:id' element={<BoardDelete />} />
        <Route path='/board/check/:id' element={<BoardCheck />} />
        <Route path='/board/personal' element={<BoardPersonal />} />

        {/* 김형선 조원소개 ###### Tue Jun 11 23:12:03 KST 2024 CreateMember 추가 */ }
        <Route path="/member" element={<Member />} />
        <Route path="/member/detail/:id" element={<MemberDetail />} />
        <Route path="/member/update/:id" element={<MemberUpdate />} />
        <Route path="/member/CreateMember" element={<CreateMember />} /> 
        
        {/* 김완덕, 구진모 현지학기제 */}
        <Route path="/hyji" element={<Hyji />}></Route>
        <Route path="/hyjiupdate"  element={<Hyjiupdate />}></Route>
      </Routes></div>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;