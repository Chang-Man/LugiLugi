import { Stomp } from '@stomp/stompjs';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import styles from './Subref.module.scss';
const Subref = () => {
  const { lugiid } = useParams();
  const sock = new SockJS('https://lugiserver.com/ws/match');
  const client = Stomp.over(sock);
  const handleClick = () => {
    console.log('Connected' + lugiid);
    client.send('/publish/create', {}, JSON.stringify(lugiid));
  };
  return (
    <div className={styles.container}>
      <button className={`${styles.warning} ${styles.one}`}>경고</button>
      <div className={`${styles.scoreContainer} ${styles.blue} `}>
        <button className={`${styles.buttons}`}>1</button>
        <button className={`${styles.buttons}`}>2</button>
        <button className={`${styles.buttons}`}>3</button>
      </div>
      <button className={styles.start}>시작/멈춤</button>
      <div className={styles.minus}>
        <button>-1</button>
        <button>-1</button>
      </div>
      <div className={`${styles.scoreContainer} ${styles.red} `}>
        <button className={`${styles.buttons}`}>1</button>
        <button className={`${styles.buttons}`}>2</button>
        <button className={`${styles.buttons}`}>3</button>
      </div>
      <button className={`${styles.warning} ${styles.two}`}>경고</button>
    </div>
  );
};

export default Subref;
