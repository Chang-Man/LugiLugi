import React, { useState } from 'react';
import styles from './JoinLugi.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Logo from '../../public/tkdmark.jpg';
import { toast } from 'react-toastify';

const JoinLugi = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/lugilugi')} />
        경기 참여
      </div>
      <div className={styles.inputs}>
        <img src={Logo} alt={'logo'} className={styles.logo} />

        <br />
        <br />
        <TextField
          placeholder='초대코드'
          label='초대코드'
          focused
          onChange={e => {
            setCodeInput(e.target.value);
          }}
          style={{
            marginBottom: '10%',
          }}
          InputProps={{
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
          autoComplete='off'
        />

        <button
          onClick={() => {
            if (codeInput) navigate(`/joinLugi/${codeInput}`);
            else toast.dark('초대코드를 입력하세요.');
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default JoinLugi;
