import React, { useEffect } from 'react';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import rootReducer from './redux';
import styles from './styles/mobile.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/register/Register';
import Profile from './components/profile/Profile';
import Main from './components/main/Main';
import JoinLugi from './components/joinLugi/JoinLugi';
import MakeLugiSetting from './components/makeLugiSetting/MakeLugiSetting';
import ScoreBoard from './components/scoreBoard/ScoreBoard';
import Subref from './components/subref/Subref';
import Lugilugi from './components/lugilugi/Lugilugi';

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
      <Desktop>
        <div className={styles.container}>모바일 버전을 확인해주세요!</div>
      </Desktop>
      <Mobile>
        <div className={styles.container}>
          {auth ? (
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/lugilugi' element={<Lugilugi />} />
              <Route path='/makelugi' element={<MakeLugiSetting />} />
              <Route path='/makelugi/:inviteCode' element={<ScoreBoard />} />
              <Route path='/joinLugi' element={<JoinLugi />} />
              <Route path='/joinLugi/:lugicode' element={<Subref />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          )}
        </div>
      </Mobile>
    </div>
  );
}

export default App;
