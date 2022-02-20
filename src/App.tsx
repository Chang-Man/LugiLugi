import React, { useEffect } from 'react';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import rootReducer from './redux';
import Login from './components/login/Login';
import styles from './scss/layout/mobile.module.scss';

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
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <div className='App'>
      <Desktop>으악</Desktop>
      <Mobile>
        <div className={styles.container}>{auth ? <div /> : <Login />}</div>
      </Mobile>
    </div>
  );
}

export default App;
