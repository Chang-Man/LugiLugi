import React, { useState } from 'react';
import { RegisterInputType, RegisterKeyType } from '../../../interface/interface';
import styles from './Register.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import authAPI from '../../../API/authAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastErrorData } from '../../../API/errorHandling';

const Register = () => {
  const [registerInput, setRegisterInput] = useState<RegisterInputType>({
    email: '',
    password1: '',
    password2: '',
    username: '',
    nickname: '',
  });
  const navigate = useNavigate();

  const changeRegisterInput = (key: RegisterKeyType, input: string) => {
    setRegisterInput({ ...registerInput, [key]: input });
  };

  const checkEmail = (str: string) => {
    const reg_email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!reg_email.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  const checkPassword = (pwd1: string, pwd2: string) => {
    if (pwd1 === pwd2) return true;
    else return false;
  };

  const clickRegister = () => {
    if (
      checkEmail(registerInput.email) &&
      checkPassword(registerInput.password1, registerInput.password2) &&
      registerInput.username &&
      registerInput.nickname
    ) {
      const postInput = {
        email: registerInput.email,
        password: registerInput.password1,
        username: registerInput.username,
        nickname: registerInput.nickname,
      };

      authAPI.register(postInput).then(
        () => {
          toast.dark('루기루기 가입 완료~');
          navigate('/');
        },
        error => {
          toastErrorData(error);
        },
      );
    } else {
      if (checkEmail(registerInput.email) === false) {
        toast.dark('이메일을 다시 확인하세요.');
        return null;
      }
      if (checkPassword(registerInput.password1, registerInput.password2) === false) {
        toast.dark('비밀번호를 다시 확인하세요.');
        return null;
      }
      if (registerInput.email === '' || registerInput.nickname === '' || registerInput.username === '') toast.dark('모두 입력해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate(-1)} />
        SIGN UP
      </div>
      <form
        className={styles.inputs}
        onSubmit={e => {
          e.preventDefault();
          clickRegister();
        }}
      >
        <input placeholder='이름' onChange={e => changeRegisterInput('username', e.target.value)} value={registerInput.username} />
        <input placeholder='닉네임' onChange={e => changeRegisterInput('nickname', e.target.value)} value={registerInput.nickname} />
        <input placeholder='이메일' onChange={e => changeRegisterInput('email', e.target.value)} value={registerInput.email} />
        <input
          placeholder='비밀번호'
          type='password'
          onChange={e => changeRegisterInput('password1', e.target.value)}
          value={registerInput.password1}
        />
        <input
          placeholder='비밀번호 확인'
          type='password'
          onChange={e => changeRegisterInput('password2', e.target.value)}
          value={registerInput.password2}
        />
        <button>회원가입</button>
      </form>
    </div>
  );
};
export default Register;
