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
      <GroupAddModal isModal={isModal} setIsModal={setIsModal} />
      <form className={styles.inputs}>
        <div className={styles.navigationBar}>
          <FaArrowLeft className={styles.arrow} onClick={() => navigate(-1)} />
          Profile
        </div>
        <div className={styles.userImg} />
        <input placeholder='이름' />
        <input placeholder='닉네임' />
        <input placeholder='소개' />
        <select name='cars' id='cars'>
          <option value='없음'>없음</option>
          <option value='volvo'>Volvo</option>
          <option value='saab'>Saab</option>
          <option value='mercedes'>Mercedes</option>
          <option value='audi'>Audi</option>
        </select>
        <div className={styles.noGroup} onClick={() => setIsModal(true)}>
          속하신 그룹이 목록에 없으신가요?
        </div>
        <button>완료</button>
      </form>
    </div>
  );
};
export default Profile;
