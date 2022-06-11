import React from 'react';
import Body from './Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wordlist from './Wordlist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<Body />}></Route>
       <Route path='/list' element={<Wordlist />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
