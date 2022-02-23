import React, { useEffect } from 'react';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import rootReducer from './redux';
import styles from './styles/mobile.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import ProfileRegister from './components/login/ProfileRegister';
import Main from './components/main/Main';
import MakeLugi from './components/makelugi/MakeLugi';
import JoinLugi from './components/JoinLugi';
import ScoreBoard from './components/ScoreBoard';

const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Mobile = ({ children }: any) => {
  const isTablet = useMediaQuery({ maxWidth: 991 });
  return isTablet ? children : null;
};
type RootState = ReturnType<typeof rootReducer>;

function App() {
  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
  const auth = useSelector((state: RootState) => state.auth).isLoggedIn;
  return (
    <div className='App'>
      <Desktop></Desktop>
      <Mobile>
        <div className={styles.container}>
          {auth ? (
            <div />
          ) : (
            <Routes>
              <Route path='/' element={<ScoreBoard />} />
              <Route path='/regisster' element={<Register />} />
              <Route path='/register' element={<ProfileRegister />} />
              <Route path='/makelugi' element={<MakeLugi />} />
              <Route path='/joinLugi' element={<JoinLugi />} />
            </Routes>
          )}
        </div>
      </Mobile>
    </div>
  );
}

export default App;
