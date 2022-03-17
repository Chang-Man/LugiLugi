import React, { useEffect, useState } from 'react';
import styles from './ScoreBoard.module.scss';
import Timer from '../ScoreBoard/timer/Timer';

const ScoreBoard = () => {
  return (
    <div className={styles.container}>
      <Warning />
      <div className={`${styles.scoreContainer} ${styles.blue} `}>
        <div className={styles.score}>1</div>
        <div className={styles.name}>김창아</div>
      </div>
      {/* <div className={styles.timer}>01:00</div> */}
      <Timer />
      <div className={styles.roundTxt}>ROUND 1</div>
      <div className={`${styles.scoreContainer} ${styles.red} `}>
        <div className={styles.score}>0</div>
        <div className={styles.name}>배준서</div>
      </div>
      <Warning />
      <button className={styles.invite}>초대하기</button>
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
