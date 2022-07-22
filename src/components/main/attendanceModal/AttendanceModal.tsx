import React from 'react';
import styles from './AttendanceModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import Cloth from '../../../public/cloth.png';
import Moment from 'moment';
import { UserGetType } from '../../../interface/interface';
import UserProfile from './userProfile/UserProfile';

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
};
const attendanceUsers = [
  { id: '0', username: '김창아', nickname: '굿', code: 'Wefkde', image: '22' },
  { id: '1', username: '김영연', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '2', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '3', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '4', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '5', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '6', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '7', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
  { id: '8', username: '조은세상', nickname: '발차기', code: 'Wefkde', image: '' },
];
const AttendanceModal: React.FC<ModalProps> = ({ isModal, setIsModal, date }) => {
  const formatDate = Moment(date).format('MM/DD  ');
  return (
    <div className={isModal ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={isModal ? styles.plusModal : styles.plusModalClosed}>
        <div className={styles.navigationBar}>
          <FaWindowClose className={styles.close} size='1em' onClick={() => setIsModal(false)} />
          {formatDate} 운동
        </div>
        {attendanceUsers.map(item => {
          return <UserProfile key={item.id} user={item} />;
        })}
      </div>
    </div>
  );
};

export default AttendanceModal;
