import React, { useEffect, useState } from 'react';
import { RegisterInputType, RegisterKeyType } from '../../interface/interface';
import styles from '../../styles/Register.module.scss';

const Register = () => {
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

  return (
    <form className={styles.container}>
      <span>아이디</span>
      <input onChange={e => changeRegisterInput('userId', e.target.value)} value={registerInput.userId} />
      <span>비밀번호</span>
      <input type='password' onChange={e => changeRegisterInput('password1', e.target.value)} value={registerInput.password1} />
      <span>비밀번호 재확인</span>
      <input type='password' onChange={e => changeRegisterInput('password2', e.target.value)} value={registerInput.password2} />
      <span>이름</span>
      <input onChange={e => changeRegisterInput('name', e.target.value)} value={registerInput.name} />
      <span>생년월일</span>
      <div className={styles.birth_container}>
        <input className={`${styles.birth} ${styles.year}`} name='year' placeholder='년' />
        <select className={`${styles.birth} ${styles.month}`} name='month'>
          <option value='1월'>1월</option>
          <option value='2월'>2월</option>
          <option value='3월'>3월</option>
          <option value='4월'>4월</option>
          <option value='5월'>5월</option>
          <option value='6월'>6월</option>
          <option value='7월'>7월</option>
          <option value='8월'>8월</option>
          <option value='9월'>9월</option>
          <option value='10월'>10월</option>
          <option value='11월'>11월</option>
          <option value='12월'>12월</option>
        </select>
        <input className={`${styles.birth} ${styles.day}`} name='day' placeholder='일' />
      </div>
      <button>회원가입</button>
    </form>
  );
};
export default Register;

// const customStyles = {
//   container: (provided) => ({
//     ...provided,
//     display: 'inline-block',
//     width: '250px',
//     minHeight: '1px',
//     textAlign: 'left',
//     border: 'none',
//   }),
//   control: (provided) => ({
//     ...provided,
//     border: '2px solid #757575',
//     borderRadius: '0',
//     minHeight: '1px',
//     height: '42px',
//   }),
//   input: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//   }),
//   dropdownIndicator: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     paddingTop: '0',
//     paddingBottom: '0',
//     color: '#757575',
//   }),
//   indicatorSeparator: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     height: '24px',
//   }),
//   clearIndicator: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     height: '40px',
//     paddingTop: '0',
//     paddingBottom: '0',
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     minHeight: '1px',
//     paddingBottom: '2px',
//   }),
// };
