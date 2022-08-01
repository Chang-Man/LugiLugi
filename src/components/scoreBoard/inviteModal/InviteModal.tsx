import React from 'react';
import styles from './InviteModal.module.scss';
import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Match = {
  id: number;
  inviteCode: string;
};
type ModalProps = {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  match: Match;
};

const inViteModal: React.FC<ModalProps> = ({ isModal, setIsModal, match }) => {
  const navigate = useNavigate();
  return (
    <div className={isModal ? styles.modalWrapper : styles.modalWrapperClosed}>
      <div className={isModal ? styles.plusModal : styles.plusModalClosed}>
        <div className={styles.navigationBar}>
          <FaWindowClose
            className={styles.close}
            size='1em'
            onClick={() => {
              if (match.id) setIsModal(false);
              else {
                navigate(-1);
              }
            }}
          />
          초대 코드
        </div>
        <div className={styles.wrapper}>
          {match.inviteCode ? (
            <>
              <span>부심에게 알려주세요!</span>
              <span className={styles.inviteCode}>{match.inviteCode}</span>
            </>
          ) : (
            <span>경기가 만들어지지 않았습니다!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default inViteModal;
