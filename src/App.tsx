import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from "./App.module.css";
import PreloaderLinear from './components/common/PrealoderLinear';
import Preloader from './components/common/Preloader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { initializeApp } from './redux/app-reducer';
import { AppStateType } from './redux/redux-store';


function App() {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp());
  }, [])


  return (
    <>
      {!initialized
        ? <PreloaderLinear />
        : <>
          <div className="bodyAlt">
            <div className="wrapper">
              <Main />
              <Footer />
            </div>
          </div>
        </>}
    </>
  );
}

export default App;
