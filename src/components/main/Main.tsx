import React, { useState } from 'react';
import Logo from '../../public/tkdmark.jpg';
import styles from './Main.module.scss';
import { BsPerson, BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import joinGame from '../../public/joinGame.png';
import workOut from '../../public/workOut.png';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';

const Main = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const array = [
    {
      id: 1,
      date: '07/15/2022',
    },
    {
      id: 2,
      date: '07/10/2022',
    },
    {
      id: 3,
      date: '07/09/2022',
    },
    {
      id: 4,
      date: '07/19/2022',
    },
  ];
  const highlight = [];
  for (let index = 0; index < array.length; index++) {
    highlight.push(subDays(new Date(`${array[index].date}`), 0));
  }
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
        <style>
          {`.react-datepicker {
          width: 100%;
          font-family: RussoOne;
          font-weight: lighter;
          font-size: 110%;
      }
      .react-datepicker__month-container {
        width: 100%;
      }
      .react-datepicker__day--today {
         color : 808080;
    
      }
      .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
        background-color : black;
      }
      .react-datepicker__day--highlighted {
        background-color : gray;
      }
      .react-datepicker__day--selected:hover {
        background-color : black;
      }
      .react-datepicker__day--outside-month {
        color: transparent !important;
        pointer-events: none;
      }
      `}
        </style>
        <div className={styles.count}>
          <span>이번 달 운동</span>
          <span className={styles.slash}>:</span>
          <span>20회</span>
        </div>
        <Datepicker
          className='form-control'
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          highlightDates={highlight}
          isClearable={false}
          inline
        />
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
