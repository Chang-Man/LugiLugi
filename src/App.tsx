import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

function App() {
  return (
    <div className='App'>
      <Desktop>Desktop</Desktop>
      <Tablet>
        <div>아니야</div>
      </Tablet>
      <Mobile>Mobile</Mobile>
      {/* <Default>Not mobile</Default> */}
    </div>
  );
}

export default App;
