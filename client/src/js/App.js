import React from 'react';
import Logo from './logo';
import TopNav from './topNav';
import Body from './body';
import Footer from './footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Logo />
      <BrowserRouter>
        <TopNav />
        <Body />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
