import React from 'react';
import styles from '../../styles/Main.module.scss';
import Logo from '../../public/tkdmark.jpg';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* <div className={styles.profile}>대충 프로필 자리</div> */}
      <button>LUGI 기록</button>
      <button
        onClick={() => {
          navigate('/makelugi');
        }}
      >
        LUGI 만들기
      </button>
      <button
        onClick={() => {
          navigate('/joinlugi');
        }}
      >
        LUGI 참여
      </button>
      <div className={styles.footer}>
        <img src={Logo} alt={'logo'} />
        <span>서울대 태권도부</span>
      </div>
    </div>
  );
};

export default Main;
