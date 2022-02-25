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
      <span>LUGI-LUGI</span>
      <div className={styles.inputs}>
        <input placeholder='EMAIL' />
        <input placeholder='PASSWORD' type='password' />
        <button className={styles.login} onClick={() => navigate('/main')}>
          LOGIN
        </button>
        <div className={styles.register} onClick={onClickRegister}>
          REGISTER
        </div>
      </div>
    </div>
  );
};

export default Login;
