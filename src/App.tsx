import React from 'react';
import './App.css';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }: any) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Mobile = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};

function App() {
  return (
    <div className='App'>
      <Desktop>Desktop</Desktop>
      <Mobile>Mobile</Mobile>
    </div>
  );
}

export default App;
