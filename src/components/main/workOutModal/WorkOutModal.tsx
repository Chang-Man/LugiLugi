import React from 'react';
import styles from './WorkOutModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import Cloth from '../../../public/cloth.png';
import Moment from 'moment';

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkOutModal: React.FC<ModalProps> = ({ isModal, setIsModal }) => {
  const formatDate = Moment().format('MM/DD  ');
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
