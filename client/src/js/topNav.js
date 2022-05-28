import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

function topNav() {
    return (
        <div className='topNav'>
            <Link to='/login'>로그인</Link>
            <Link to='/regist'>회원가입</Link>
            <Link to='/main'>메인</Link>
            <Link to='/myPage'>마이페이지</Link>
            <Link to='/matching'>멘토멘티 매치</Link>
        </div>
    );
}

export default topNav;