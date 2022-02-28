import React from 'react';
import styles from '../../styles/GroupAddModal.module.scss';
import { GrClose } from 'react-icons/gr';
import { IconContext } from 'react-icons/lib';

type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const style = { color: 'white', fontSize: '1.5em' };
const GroupAddModal: React.FC<ModalProps> = ({ isModal, setIsModal }) => {
  return (
    <div className={isModal ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={isModal ? styles.plusModal : styles.plusModalClosed}>
        <div className={styles.navigationBar}>
          <GrClose className={styles.close} size='1.5em' />새 그룹 등록
        </div>
      </div>
    </div>
  );
};

export default GroupAddModal;
