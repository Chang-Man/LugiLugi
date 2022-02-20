import React from 'react';
import Logo from '../../public/tkdmark.jpg';
import styles from '../../styles/Main.module.scss';

const Main = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} alt='logo' />
      <button>로그인</button>
      <button>회원가입</button>
    </div>
  );
};

export default Main;
