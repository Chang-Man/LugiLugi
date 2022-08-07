import React, { useEffect, useState } from 'react';
import styles from './ScoreBoard.module.scss';
import Timer from './timer/Timer';
import InviteModal from './inviteModal/InviteModal';
import rootReducer from '../../redux';
import matchAPI from '../../API/matchAPI';
import { Stomp } from '@stomp/stompjs';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateScore } from '../../redux/module/match';
import useTimer, { TimerAction, TimerState } from './timer/useTimer';
import { toast } from 'react-toastify';
type RootState = ReturnType<typeof rootReducer>;

interface currentStateType {
  roundTime: number;
  current: boolean;
  breakTime: boolean;
}

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
  const [currentState, setCurrentState] = useState<currentStateType>({ roundTime: 1, current: false, breakTime: false });

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
        console.log(state);
        if (state.redScore !== undefined && state.redScore != -404) {
          dispatch(
            updateScore({
              redScore: state.redScore,
              blueScore: state.blueScore,
              redPenalty: state.redPenalty,
              bluePenalty: state.bluePenalty,
            }),
          );
        } else if (state.flowtype == 'START') {
          setCurrentState({ ...currentState, current: true });
        } else if (state.flowtype == 'STOP') {
          setCurrentState({ ...currentState, current: false });
        }
      });
    });

    return function cleanup() {
      stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('지금');
    console.log(!currentState.breakTime && currentState.roundTime <= matchOption.roundCount);
    console.log(matchOption.roundCount);
    console.log(currentState.roundTime);
  }, [currentState, setCurrentState]);

  return (
    <div className={styles.container}>
      <FaArrowLeft
        className={styles.arrow}
        onClick={() => {
          navigate(-1);
        }}
      />
      <button
        className={styles.lugicode}
        onClick={() => {
          setIsModal(true);
        }}
      >
        코드
      </button>
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
      {!currentState.breakTime && currentState.roundTime <= matchOption.roundCount && (
        <Timer currentState={currentState} setCurrentState={setCurrentState} roundTime={matchOption.roundTime} />
      )}
      {currentState.breakTime && matchOption.roundCount !== 1 && (
        <Timer currentState={currentState} setCurrentState={setCurrentState} roundTime={matchOption.breakTime} />
      )}
      {currentState.breakTime && matchOption.roundCount !== 1 ? (
        <div className={styles.restTxt}>쉬는 시간</div>
      ) : currentState.roundTime <= matchOption.roundCount ? (
        <div className={styles.roundTxt}>ROUND {currentState.roundTime}</div>
      ) : (
        <div className={styles.roundTxt}>경기 종료</div>
      )}
      {currentState.roundTime > matchOption.roundCount && (
        <div className={styles.saveWrapper}>
          <button
            className={styles.saveButton}
            onClick={() => {
              matchAPI.finishMatch(inviteCode).then(
                res => {
                  console.log(res);
                  toast.dark('경기가 저장되었습니다.');
                },
                error => {
                  toast.dark('경기를 저장할 수 없습니다.');
                },
              );
            }}
          >
            경기 저장
          </button>
          <span className={styles.saveTxt}>경기를 저장하시겠습니까?</span>
        </div>
      )}

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
