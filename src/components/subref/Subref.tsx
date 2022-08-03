import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import rootReducer from '../../redux';
import styles from './Subref.module.scss';
type RootState = ReturnType<typeof rootReducer>;
const Subref = () => {
  const { lugicode } = useParams();
  const user_info = useSelector((state: RootState) => state.user).user_info;

  const socket = new SockJS('https://lugiserver.com/ws');
  const stompClient = Stomp.over(socket);

  useEffect(() => {
    stompClient.connect({}, (frame: string) => {
      console.log('Connected:' + frame);
      setTimeout(() => {
        stompClient.send(
          `/${lugicode}/join`,
          {},
          JSON.stringify({
            userId: user_info.id,
            inviteCode: lugicode,
            type: 'JUDGE',
          }),
        );
      }, 500);
    });
    return () => stompClient.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.warning} ${styles.one}`}
        onClick={() => {
          stompClient.send(
            `/publish/${lugicode}/penalty`,
            {},
            JSON.stringify({
              judge: 'string',
              player: 'BLUE',
            }),
          );
        }}
      >
        경고
      </button>
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
        }}
      >
        시작
      </button>
      <button
        className={styles.stop}
        onClick={() => {
          stompClient.send(`/publish/${lugicode}/flow`, {}, JSON.stringify({ judge: 'judge', flowtype: 'STOP' }));
        }}
      >
        멈춤
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
      <button
        className={`${styles.warning} ${styles.two}`}
        onClick={() => {
          stompClient.send(
            `/publish/${lugicode}/penalty`,
            {},
            JSON.stringify({
              judge: 'string',
              player: 'RED',
            }),
          );
        }}
      >
        경고
      </button>
    </div>
  );
};

export default Subref;
