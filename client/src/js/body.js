import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './main_js/login';
import Regist from './main_js/regist';
import Main from './main_js/main';
import MyPage from './main_js/myPage';
import Matching from './main_js/matching.js';


function body() {
    return (
        <div className='body'>
            <Routes>
                <Route path='/' element={<Main />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/regist' element={<Regist />}></Route>
                <Route path='/main' element={<Main />}></Route>
                <Route path='/myPage' element={<MyPage />}></Route>
                <Route path='/matching' element={<Matching />}></Route>
            </Routes>
        </div>
    )
}

export default body;