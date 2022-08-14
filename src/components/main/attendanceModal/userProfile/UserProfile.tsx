import React from 'react';
import { UserGetProfileType } from '../../../../interface/interface';
import styles from './UserProfile.module.scss';

type ModalProps = {
  user: UserGetProfileType;
};

const UserProfile = ({ user }: ModalProps) => {
  return (
    <div className={styles.profile}>
      <img className={styles.userImg} src={user.image} alt={'img'} />

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
