import React, { useEffect, useState } from 'react';
import styles from './Lugilugi.module.scss';
import createGame from '../../public/createGame.png';
import joinGame from '../../public/joinGame.png';
import gameLog from '../../public/gameLog.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import authAPI from '../../API/authAPI';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/module/auth';

const Lugilugi = () => {
  const [user, setUser] = useState({ id: '', username: '', email: '', nickname: '', code: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <div className={styles.logos}>
          <img src={Logo} alt={'logo'} className={styles.logo} />
          <span>LUGI-LUGI</span>
        </div>
        <div className={styles.status}>
          <BsPerson className={styles.profile} size={'1.5em'} onClick={() => navigate('/profile')} />
          <BsThreeDotsVertical className={styles.menu} size={'1.5em'} onClick={onClickLogout} />
        </div>
      </div> */}
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/')} />
        LUGI-LUGI
      </div>
      <div className={styles.profile}>
        <div className={styles.userImg}></div>
        <div className={styles.userTxt}>
          <span className={styles.userLabel}>이름</span>
          <br />
          <span className={styles.user}>{user.username}</span>
          <br />
          <br />
          <span className={styles.userLabel}>선수코드</span>
          <br />
          <span className={styles.code}>{user.code}</span>
        </div>
      </div>
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
      </div>
    </div>
  );
};

export default Lugilugi;
