import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import styles from './Subref.module.scss';

const Subref = () => {
  const [start, setStart] = useState(0);
  const { lugicode } = useParams();

  const socket = new SockJS('https://lugiserver.com/ws');
  const stompClient = Stomp.over(socket);

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.send(`/publish/${lugicode}`, () => {
        return {
          userId: String, // 심판으로 참여하고자 하는 유저의 id
          inviteCode: String, // 참여하고자 하는 경기의 inviteCode
          type: 'JUDGE',
        };
      });
    });
    return () => stompClient.disconnect();
  }, []);

  // stompClient.send('/publish/ping', {}, JSON.stringify(''));

  // stompClient.send('/publish/ping', {}, '');

  return (
    <div className={styles.container}>
      <button className={`${styles.warning} ${styles.one}`}>경고</button>
      <div className={`${styles.scoreContainer} ${styles.blue} `}>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'BLUE',
                score: '1',
              }),
            );
          }}
        >
          1
        </button>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'BLUE',
                score: '2',
              }),
            );
          }}
        >
          2
        </button>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'BLUE',
                score: '3',
              }),
            );
          }}
        >
          3
        </button>
      </div>
      <button
        className={styles.start}
        onClick={() => {
          stompClient.send(`/publish/${lugicode}/flow`, {}, JSON.stringify({ judge: 'judge', flowtype: 'START' }));
          setStart(1);
        }}
      >
        시작/멈춤
      </button>
      <div className={styles.minus}>
        <button
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'BLUE',
                score: '-1',
              }),
            );
          }}
        >
          -1
        </button>
        <button
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'RED',
                score: '-1',
              }),
            );
          }}
        >
          -1
        </button>
      </div>
      <div className={`${styles.scoreContainer} ${styles.red} `}>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'RED',
                score: '1',
              }),
            );
          }}
        >
          1
        </button>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'RED',
                score: '2',
              }),
            );
          }}
        >
          2
        </button>
        <button
          className={`${styles.buttons}`}
          onClick={() => {
            stompClient.send(
              `/publish/${lugicode}/score`,
              {},
              JSON.stringify({
                judge: 'string',
                player: 'RED',
                score: '3',
              }),
            );
          }}
        >
          3
        </button>
      </div>
      <button className={`${styles.warning} ${styles.two}`}>경고</button>
    </div>
  );
};

export default Subref;
