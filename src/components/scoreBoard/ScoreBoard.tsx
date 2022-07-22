import React, { useEffect, useState } from 'react';
import styles from './ScoreBoard.module.scss';
import Timer from './timer/Timer';
import InviteModal from './inviteModal/InviteModal';
import rootReducer from '../../redux';
import matchAPI from '../../API/matchAPI';
import SockJs from 'sockjs-client';
import StompJs, { Stomp } from '@stomp/stompjs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';

type RootState = ReturnType<typeof rootReducer>;

const ScoreBoard = () => {
  const [isModal, setIsModal] = useState<boolean>(true);
  const [matchOption, setMatchOption] = useState({
    id: 0,
    inviteCode: '',
    redName: '',
    blueName: '',
    judgeCount: 0,
    roundCount: 0,
    roundTime: 0,
    breakTime: 0,
  });

  const navigate = useNavigate();
  const { lugiid } = useParams();

  const socket = new SockJS('https://lugiserver.com/ws');
  const stompClient = Stomp.over(socket);

  function onMessageReceived(payload: any) {
    const message = JSON.parse(payload.body);
    console.log(message);
  }

  useEffect(() => {
    matchAPI.getMatch(lugiid).then(res => {
      setMatchOption(res);
      stompClient.connect({}, () => {
        stompClient.subscribe(`/subscribe/${matchOption.inviteCode}`, onMessageReceived);
      });
    });

    return () => stompClient.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <FaArrowLeft className={styles.arrow} onClick={() => navigate('/')} />
      <InviteModal isModal={isModal} setIsModal={setIsModal} match={matchOption} />
      <Warning />
      <div className={`${styles.scoreContainer} ${styles.blue} `}>
        <div className={styles.score}>0</div>
        <div className={styles.name}>{matchOption.blueName}</div>
      </div>
      <div className={styles.block} />
      {matchOption.roundTime !== 0 && <Timer roundTime={matchOption.roundTime} />}
      <div className={styles.roundTxt}>ROUND 1</div>
      <div className={`${styles.scoreContainer} ${styles.red} `}>
        <div className={styles.score}>1</div>
        <div className={styles.name}>{matchOption.redName}</div>
      </div>
      <Warning />
    </div>
  );
};
export default ScoreBoard;

const Warning = () => {
  return (
    <div className={styles.warningContainer}>
      <div className={styles.warning}>0</div>
      <div className={styles.warningTxt}>경고</div>
    </div>
  );
};
