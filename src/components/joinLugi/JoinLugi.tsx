import React, { useState } from 'react';
import styles from './JoinLugi.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import Logo from '../../public/tkdmark.jpg';

const JoinLugi = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/lugilugi')} />
        경기 참여
      </div>
      <form
        className={styles.inputs}
        onSubmit={() => {
          navigate(`/joinLugi/${codeInput}`);
        }}
      >
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

        <button>완료</button>
      </form>
    </div>
  );
};

export default JoinLugi;
