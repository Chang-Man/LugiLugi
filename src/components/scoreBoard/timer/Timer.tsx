import React, { useEffect } from 'react';
import useTimer, { TimerState, TimerAction } from './useTimer';
import styles from './Timer.module.scss';

type TimeProps = {
  roundTime: number;
  currentState: currentStateType;
  setCurrentState: React.Dispatch<React.SetStateAction<currentStateType>>;
};

interface currentStateType {
  roundTime: number;
  current: boolean;
  breakTime: boolean;
}

const Timer: React.FC<TimeProps> = ({ roundTime, currentState, setCurrentState }) => {
  const { totalSeconds, minutes, seconds, timerDispatch, timer } = useTimer(roundTime);

  useEffect(() => {
    if (currentState.current == true || currentState.breakTime) {
      startPause(TimerAction.START);
    } else if (!currentState.current && timer.state === TimerState.RUNNING) {
      startPause(TimerAction.PAUSE);
    }
  }, [currentState]);

  useEffect(() => {
    if (minutes * 1 === 0 && seconds * 1 === 0 && currentState.breakTime) {
      startPause(TimerAction.PAUSE);
      setCurrentState({ ...currentState, breakTime: false });
    } else if (minutes * 1 === 0 && seconds * 1 === 0) {
      startPause(TimerAction.PAUSE);
      setCurrentState({ ...currentState, roundTime: currentState.roundTime + 1, breakTime: true });
    }
  }, [minutes, seconds]);

  const startPause = (action: any) => {
    if (timer.state === TimerState.RUNNING) {
      timerDispatch({
        type: TimerAction.PAUSE,
      });
    } else {
      timerDispatch({
        type: TimerAction.START,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <span>{minutes}</span> : <span>{seconds}</span>
      <br />
      {/* <input
        type='button'
        onClick={() => startPause(TimerAction.START)}
        value={timer.state === TimerState.RUNNING ? 'Pause Timer' : 'Start Timer'}
      />
      <input
        type='button'
        onClick={() =>
          timerDispatch({
            type: TimerAction.RESET,
          })
        }
        value='Reset Timer'
      /> */}
    </div>
  );
};

export default Timer;
