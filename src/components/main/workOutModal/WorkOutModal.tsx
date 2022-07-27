import React from 'react';
import styles from './WorkOutModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import Cloth from '../../../public/cloth.png';
import Moment from 'moment';
import attendance from '../../../API/attendance';
import { toast } from 'react-toastify';
import { subDays } from 'date-fns';

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAttendanceDate: React.Dispatch<React.SetStateAction<Date[]>>;
};

const WorkOutModal: React.FC<ModalProps> = ({ isModal, setIsModal, setAttendanceDate }) => {
  const formatDate = Moment().format('MM/DD  ');
  const postDate = Moment().format('YYYY-MM-DD');
  return (
    <div className={isModal ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={isModal ? styles.plusModal : styles.plusModalClosed}>
        <div className={styles.navigationBar}>
          <FaWindowClose className={styles.close} size='1em' onClick={() => setIsModal(false)} />
          운동이요
        </div>
        <div
          className={styles.workOutButton}
          onClick={() => {
            setIsModal(false);

            attendance.postAttendance({ date: postDate.toString() }).then(
              res => {
                setAttendanceDate(prevArray => [...prevArray, subDays(new Date(), 0)]);
              },
              error => {
                toast.dark('예상치 못한 오류로, 운동에 참여할 수 없습니다');
              },
            );
          }}
        >
          <img className={styles.cloth} src={Cloth} />
          <div className={styles.text}>
            <span>{formatDate}기합넣기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOutModal;
