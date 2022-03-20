import React, { useState } from 'react';
import styles from './Login.module.scss';
import Logo from '../../public/tkdmark.jpg';
import { useNavigate } from 'react-router-dom';
import authAPI from '../../API/authAPI';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/module/auth';

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClicklogin = () => {
    authAPI.login(loginInput).then(
      token => {
        dispatch(login(token));
      },
      error => {},
    );
  };
  const onClickRegister = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} alt='logo' />
      <span>LUGI-LUGI</span>
      <div className={styles.inputs}>
        <input placeholder='EMAIL' value={loginInput.email} onChange={e => setLoginInput({ ...loginInput, email: e.target.value })} />
        <input
          placeholder='PASSWORD'
          type='password'
          value={loginInput.password}
          onChange={e => setLoginInput({ ...loginInput, password: e.target.value })}
        />
        <button className={styles.login} onClick={onClicklogin}>
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
