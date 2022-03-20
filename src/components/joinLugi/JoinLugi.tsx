import React, { useState } from 'react';
import styles from './JoinLugi.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField } from '@mui/material';
import matchAPI from '../../API/matchAPI';
import { useDispatch } from 'react-redux';
import { createMatch } from '../../redux/module/match';
import Logo from '../../public/tkdmark.jpg';
import SockJS from 'sockjs-client';
import StompJs, { Stomp } from '@stomp/stompjs';

const JoinLugi = () => {
  const navigate = useNavigate();
  const { lugiid } = useParams();

  const sock = new SockJS('https://lugiserver.com/ws/match');
  // const client = Stomp.over(sock);
  const handleClick = () => {
    console.log('Connected' + lugiid);
    // client.send('/publish/create', { user: '', inviteCode: '' }, JSON.stringify(lugiid));
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/')} />
        경기 참여
      </div>
      <form className={styles.inputs}>
        <img src={Logo} alt={'logo'} className={styles.logo} />

        <br />
        <br />
        <TextField
          placeholder='초대코드'
          label='초대코드'
          focused
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
            handleClick;
          }}
        >
          완료
        </button>
      </form>
    </div>
  );
};

export default JoinLugi;
