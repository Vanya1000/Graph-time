import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from "./App.module.css";
import Preloader from './components/common/Preloader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { initializeApp } from './redux/app-reducer';
import { getworkTimeData } from './redux/learningTime-reducer.ts';
import { AppStateType } from './redux/redux-store';


function App() {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp());
  }, [])

  if (!initialized) {
    return (<Preloader />)
  } 
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
