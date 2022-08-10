import React, { useEffect } from 'react';
import styles from './AttendanceModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import Cloth from '../../../public/cloth.png';
import Moment from 'moment';
import { UserGetType } from '../../../interface/interface';
import UserProfile from './userProfile/UserProfile';
import attendanceAPI from '../../../API/attendanceAPI';
import { toast } from 'react-toastify';

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
};
const attendanceUsers = [
  { id: '0', username: '김창아', nickname: '굿', code: 'Wefkde', image: '22' },
  { id: '1', username: '김세영', nickname: '테스트1', code: 'Wefkde', image: '' },
  { id: '2', username: '김영연', nickname: '테스트2', code: 'Wefkde', image: '' },
  { id: '3', username: '조은세상', nickname: '와우', code: 'Wefkde', image: '' },
];
const AttendanceModal: React.FC<ModalProps> = ({ isModal, setIsModal, date }) => {
  const getYear = Moment(date).format('YYYY');
  const getMonth = Moment(date).format('MM');
  const getDay = Moment(date).format('DD');

  useEffect(() => {
    if (isModal) {
      attendanceAPI.getAttendanceDay({ year: getYear, month: getMonth, day: getDay }).then(
        res => {
          console.log(res.results);
        },
        e => {
          toast.dark('출석한 인원이 없습니다.');
          setIsModal(false);
        },
      );
    }
  }, [isModal]);

  return (
    <div className={isModal ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={isModal ? styles.plusModal : styles.plusModalClosed}>
        <div className={styles.navigationBar}>
          <FaWindowClose className={styles.close} size='1em' onClick={() => setIsModal(false)} />
          {getMonth}/{getDay} 운동
        </div>
        {attendanceUsers.map(item => {
          return <UserProfile key={item.id} user={item} />;
        })}
      </div>
    </div>
  );
};

export default AttendanceModal;
