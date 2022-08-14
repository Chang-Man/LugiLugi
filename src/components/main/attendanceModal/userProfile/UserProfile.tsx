import React from 'react';
import { UserGetProfileType } from '../../../../interface/interface';
import styles from './UserProfile.module.scss';
import defaultImg from '../../../../public/defaultProfile.png';

type ModalProps = {
  user: UserGetProfileType;
};

const UserProfile = ({ user }: ModalProps) => {
  return (
    <div className={styles.profile}>
      {user.image ? (
        <img className={styles.userImg} src={user.image} alt={'img'} />
      ) : (
        <img className={styles.userImg} src={defaultImg} alt={'defaultImg'} />
      )}

      <div className={styles.userTxt}>
        <span className={styles.user}>{user.username}</span>
        <span className={styles.cuteName}></span>
        <span className={styles.slash}>/</span>
        <span className={styles.code}>{user.code}</span>
        <br />
        <span className={styles.nickName}>{user.nickname}</span>
      </div>
    </div>
  );
};

export default UserProfile;
