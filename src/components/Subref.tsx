import React from 'react';
import styles from '../styles/Subref.module.scss';
const Subref = () => {
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
