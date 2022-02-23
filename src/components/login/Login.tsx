import React from 'react';
import styles from '../../styles/Login.module.scss';
import Logo from '../../public/tkdmark.jpg';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const onClicklogin = () => {
    navigate('/');
  };
  const onClickRegister = () => {
    navigate('/register');
  };
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} alt='logo' />
      <div className={styles.inputs}>
        <input placeholder='아이디' />
        <input placeholder='비밀번호' type='password' />
        <button>로그인</button>
        <button onClick={onClickRegister}>회원가입</button>
      </div>
    </div>
  );
};

export default Login;
