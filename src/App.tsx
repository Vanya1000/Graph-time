import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from "./App.module.css";
import PreloaderLinear from './components/common/PrealoderLinear';
import Preloader from './components/common/Preloader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { actions, initializeApp } from './redux/app-reducer';
import { AppStateType } from './redux/redux-store';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Switch } from '@mui/material';
import SwitchTheme from './components/common/SwitchTheme';
import { useNavigate } from 'react-router-dom';
import { getworkTimeData } from './redux/learningTime-reducer.ts';


const themeLight = createTheme({
  palette: {
    
  }
});

const themeDark = createTheme({

  palette: {
    background: {
      default: "#000000"
    },
    mode: 'dark',
  }
});

function App() {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const darkTheme = useSelector((state: AppStateType) => state.app.darkTheme)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  let redirect = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    !!isAuth && redirect(`/my-app/`)
  }, [isAuth])

  useEffect(() => {
    if (isAuth) {
      dispatch(getworkTimeData()); // если я авторизовался, то получаю data
    }
  }, [isAuth])

  

  useEffect(() => {
    dispatch(initializeApp());
  }, [])

  return (
    <>
      <ThemeProvider theme={darkTheme ? themeDark : themeLight}>
        <CssBaseline />
        {!initialized
          ? <PreloaderLinear />
          : <>
            <div className="bodyAlt">
              <div className="wrapper">
                <Header/>
                <Main />
                <Footer />
              </div>
            </div>
          </>}
      </ThemeProvider>
    </>
  );
}

export default App;
