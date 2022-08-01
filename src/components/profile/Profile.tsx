import styles from './Profile.module.scss';
import React, { useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../public/defaultProfile.png';
import { useSelector } from 'react-redux';
import rootReducer from '../../redux';
type RootState = ReturnType<typeof rootReducer>;

interface editProfileInput {
  username: string;
  nickname: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState<File>();
  const user_info = useSelector((state: RootState) => state.user).user_info;
  const [editInput, setEditInput] = useState<editProfileInput>({ username: user_info.username, nickname: user_info.nickname });
  const [imageUrl, setImageUrl] = useState<string>(user_info.image);

  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFileImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/')} />
        Profile
      </div>
      <form className={styles.inputs}>
        {!imageUrl ? (
          <img className={styles.userImg} src={defaultProfile} alt={'defaultProfile'} />
        ) : (
          <img className={styles.userImg} src={imageUrl} alt={'editedImage'} />
        )}
        <label className={styles.fileUpload}>
          <input
            className={styles.editImg}
            onChange={saveFileImage}
            ref={fileRef}
            type={'file'}
            accept={'image/*'}
            style={{ display: 'none' }}
          />
          이미지 편집
        </label>

        <input
          placeholder='이름'
          value={editInput.username}
          onChange={e => {
            setEditInput({ ...editInput, username: e.target.value });
          }}
        />
        <input
          placeholder='닉네임'
          value={editInput.nickname}
          onChange={e => {
            setEditInput({ ...editInput, nickname: e.target.value });
          }}
        />
        <button>수정 완료</button>
      </form>
    </div>
  );
};
export default Profile;
