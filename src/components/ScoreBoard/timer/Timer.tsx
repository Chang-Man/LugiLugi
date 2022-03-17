import React from 'react';
import useTimer, { TimerState, TimerAction } from './useTimer';
import styles from './Timer.module.scss';

const Timer = () => {
  const { totalSeconds, minutes, seconds, timerDispatch, timer } = useTimer(60 * 2);

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

  const styleObj = {
    color: totalSeconds <= 45 ? 'orange' : 'black',
  };

  if (totalSeconds <= 15) {
    styleObj.color = 'red';
  }

  return (
    <div className={styles.wrapper}>
      <span>{minutes}</span> : <span>{seconds}</span>
      <br />
      <input
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
      />
    </div>
  );
};

export default Timer;