import React from 'react';
import s from "./App.module.css";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';


function App() {
  return (
    <div className="bodyAlt">
      <div className="wrapper">
        <Main />
        <Footer/>
      </div>
    </div>
  );
}

export default App;
