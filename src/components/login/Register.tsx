import React, { useEffect, useState } from 'react';
import { RegisterInputType, RegisterKeyType } from '../../interface/interface';
import styles from '../../styles/Register.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const setBithForm = () => {
    if (registerInput.birthday) {
      if (registerInput.birthday.length === 5 && registerInput.birthday.charAt(registerInput.birthday.length - 1) !== '/') {
        setRegisterInput({
          ...registerInput,
          birthday: registerInput.birthday.replace(/(.{4})/g, '$1/'),
        });
      }
      if (registerInput.birthday.length === 8 && registerInput.birthday.charAt(registerInput.birthday.length - 1) !== '/') {
        setRegisterInput({
          ...registerInput,
          birthday: registerInput.birthday.replace(/(.{7})/g, '$1/'),
        });
      }
      if (registerInput.birthday.length > 10) setRegisterInput({ ...registerInput, birthday: '' });
    }
  };

  const [registerInput, setRegisterInput] = useState<RegisterInputType>({
    userId: '',
    password1: '',
    password2: '',
    name: '',
    birthday: '',
  });
  const changeRegisterInput = (key: RegisterKeyType, input: string) => {
    setRegisterInput({ ...registerInput, [key]: input });
  };
  const navigate = useNavigate();
  useEffect(() => {
    setBithForm();
  }, [registerInput.birthday]);
  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate(-1)} />
        SIGN UP
      </div>
      <form className={styles.inputs}>
        <input placeholder='이름' onChange={e => changeRegisterInput('name', e.target.value)} value={registerInput.name} />
        <input placeholder='생년월일' onChange={e => changeRegisterInput('birthday', e.target.value)} value={registerInput.birthday} />
        <input placeholder='이메일' onChange={e => changeRegisterInput('userId', e.target.value)} value={registerInput.userId} />
        <input placeholder='비밀번호' onChange={e => changeRegisterInput('password1', e.target.value)} value={registerInput.password1} />
        <input
          placeholder='비밀번호 확인'
          onChange={e => changeRegisterInput('password2', e.target.value)}
          value={registerInput.password2}
        />
        <button onClick={() => navigate('/')}>회원가입</button>
      </form>
    </div>
  );
};
export default Register;
