import React, { useEffect } from 'react';
import styles from './WorkOutModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import Cloth from '../../../public/cloth.png';
import Moment from 'moment';
import { toast } from 'react-toastify';
import { subDays } from 'date-fns';
import attendanceAPI from '../../../API/attendanceAPI';
import { toastErrorData } from '../../../API/errorHandling';
import { useSelector } from 'react-redux';
import rootReducer from '../../../redux';
import exitingPanda from '../../../public/excitingpanda.jpg';
type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAttendanceDate: React.Dispatch<React.SetStateAction<Date[]>>;
};
type RootState = ReturnType<typeof rootReducer>;

const WorkOutModal: React.FC<ModalProps> = ({ isModal, setIsModal, setAttendanceDate }) => {
  const formatDate = Moment().format('MM/DD  ');
  const postDate = Moment().format('YYYY-MM-DD');
  const user_info = useSelector((state: RootState) => state.user).user_info;
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

            attendanceAPI.postAttendance({ date: postDate.toString() }).then(
              res => {
                setAttendanceDate(prevArray => [...prevArray, subDays(new Date(), 0)]);
              },
              error => {
                toastErrorData(error);
              },
            );
          }}
        >
          {user_info.username == '강다연' ? (
            <img className={styles.cloth} src={exitingPanda} alt='dayeon' />
          ) : (
            <img className={styles.cloth} src={Cloth} />
          )}

          <div className={styles.text}>
            <span>{formatDate}기합넣기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOutModal;
