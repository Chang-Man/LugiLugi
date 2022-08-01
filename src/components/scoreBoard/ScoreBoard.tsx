import React, { useEffect, useRef, useState } from 'react';
import styles from './ScoreBoard.module.scss';
import Timer from './timer/Timer';
import InviteModal from './inviteModal/InviteModal';
import rootReducer from '../../redux';
import matchAPI from '../../API/matchAPI';
import SockJs from 'sockjs-client';
import StompJs, { debugFnType, Stomp } from '@stomp/stompjs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateScore } from '../../redux/module/match';
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
  // const liveMatch = useRef({
  //   redScore: 0,
  //   blueScore: 0,
  // });
  const redScore = useSelector((state: RootState) => state.match).redScore;
  const blueScore = useSelector((state: RootState) => state.match).blueScore;
  const redPenalty = useSelector((state: RootState) => state.match).redPenalty;
  const bluePenalty = useSelector((state: RootState) => state.match).bluePenalty;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { inviteCode } = useParams();

  useEffect(() => {
    dispatch(
      updateScore({
        redScore: 0,
        blueScore: 0,
        redPenalty: 0,
        bluePenalty: 0,
      }),
    );
  }, []);

  useEffect(() => {
    matchAPI.getMatch(inviteCode).then(res => {
      setMatchOption(res);
    });
    const socket = new SockJS('https://lugiserver.com/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(`/subscribe/${inviteCode}`, data => {
        const state = JSON.parse(data.body);
        dispatch(
          updateScore({
            redScore: state.redScore,
            blueScore: state.blueScore,
            redPenalty: state.redPenalty,
            bluePenalty: state.bluePenalty,
          }),
        );
        console.log(state);
      });
    });

    return function cleanup() {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <FaArrowLeft
        className={styles.arrow}
        onClick={() => {
          navigate('/');
        }}
      />
      <InviteModal isModal={isModal} setIsModal={setIsModal} match={matchOption} />
      <div className={styles.warningContainer}>
        <div className={styles.warning}>{bluePenalty}</div>
        <div className={styles.warningTxt}>경고</div>
      </div>
      <div className={`${styles.scoreContainer} ${styles.blue} `}>
        <div className={styles.score}>{blueScore}</div>
        <div className={styles.name}>{matchOption.blueName}</div>
      </div>
      <div className={styles.block} />
      {matchOption.roundTime !== 0 && <Timer roundTime={matchOption.roundTime} />}
      <div className={styles.roundTxt}>ROUND 1</div>
      <div className={`${styles.scoreContainer} ${styles.red} `}>
        <div className={styles.score}>{redScore}</div>
        <div className={styles.name}>{matchOption.redName}</div>
      </div>
      <div className={styles.warningContainer}>
        <div className={styles.warning}>{redPenalty}</div>
        <div className={styles.warningTxt}>경고</div>
      </div>
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
