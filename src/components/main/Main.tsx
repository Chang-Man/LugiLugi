import React, { useState } from 'react';
import Logo from '../../public/tkdmark.jpg';
import styles from './Main.module.scss';
import { BsPerson, BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import joinGame from '../../public/joinGame.png';
import workOut from '../../public/workOut.png';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Main = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <img src={Logo} alt={'logo'} className={styles.logo} />
          <span>LUGI-LUGI</span>
        </div>
        <div className={styles.status}>
          <BsPerson className={styles.profile} size={'1.5em'} onClick={() => navigate('/profile')} />
          <BsThreeDotsVertical className={styles.menu} size={'1.5em'} />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          <div className={styles.userImg}></div>
          <div className={styles.userTxt}>
            <span className={styles.user}>user.name</span>
            <span className={styles.slash}>/</span>
            <span className={styles.code}>user.code</span>
          </div>
        </div>
        <Datepicker selected={startDate} onChange={(date: any) => setStartDate(date)} inline />
        {/* <div className={styles.calendar}>하이</div> */}
        <div className={styles.menus}>
          <img
            src={workOut}
            alt={'workOut'}
            onClick={() => {
              navigate('/joinlugi');
            }}
          />
          <img
            src={joinGame}
            alt={'joinGame'}
            onClick={() => {
              navigate('/joinlugi');
            }}
          />
        </div>
      </div>

      {/*
      <div className={styles.menus}>
        <img src={gameLog} alt={'gameLog'} />
        <img
          src={createGame}
          alt={'createGame'}
          onClick={() => {
            navigate('/makelugi');
          }}
        />
        <img
          src={joinGame}
          alt={'joinGame'}
          onClick={() => {
            navigate('/joinlugi');
          }}
        />
      </div> */}
    </div>
  );
};

export default Main;
