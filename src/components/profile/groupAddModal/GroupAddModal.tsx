import React from 'react';
import styles from './GroupAddModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const GroupAddModal: React.FC<ModalProps> = ({ isModal, setIsModal }) => {
  return (
    <div className={isModal ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={isModal ? styles.plusModal : styles.plusModalClosed}>
        <div className={styles.navigationBar}>
          <FaWindowClose className={styles.close} size='1em' onClick={() => setIsModal(false)} />새 그룹 등록
        </div>
      </div>
    </div>
  );
};

export default GroupAddModal;
