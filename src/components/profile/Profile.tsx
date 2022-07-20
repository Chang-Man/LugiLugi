import styles from './Profile.module.scss';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import GroupAddModal from './groupAddModal/GroupAddModal';

const Profile = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/')} />
        Profile
      </div>
      <GroupAddModal isModal={isModal} setIsModal={setIsModal} />
      <form className={styles.inputs}>
        <div className={styles.userImg} />
        <input placeholder='이름' />
        <input placeholder='닉네임' />
        <input placeholder='소개' />
        <button>수정 완료</button>
      </form>
    </div>
  );
};
export default Profile;
