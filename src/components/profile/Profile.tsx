import styles from './Profile.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../public/defaultProfile.png';
import { useSelector } from 'react-redux';
import rootReducer from '../../redux';
import userAPI from '../../API/userAPI';
import { toast } from 'react-toastify';
import { toastErrorData } from '../../API/errorHandling';

type RootState = ReturnType<typeof rootReducer>;

interface editProfileInput {
  username: string;
  nickname: string;
}

const Profile = () => {
  const navigate = useNavigate();
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

  const submitImage = (event: any) => {
    event.preventDefault();
    const formData: any = new FormData();

    formData.append('image', fileImage);
    userAPI.saveImages(formData).then(
      res => {
        toast.dark('프로필 이미지 변경');
      },
      error => {
        toastErrorData(error);
      },
    );
  };

  const saveNames = () => {
    userAPI.editNames(editInput).then(
      res => {
        navigate(-1);
        toast.dark('수정되었습니다.');
      },
      e => {
        toast.dark('수정에 실패하였습니다.');
      },
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/')} />
        Profile
      </div>
      <div className={styles.inputs}>
        {!imageUrl ? (
          <img className={styles.userImg} src={defaultProfile} alt={'defaultProfile'} />
        ) : (
          <img className={styles.userImg} src={imageUrl} alt={'editedImage'} />
        )}

        <div className={styles.selectImg}>
          <label className={styles.fileUpload}>
            <input
              className={styles.editImg}
              onChange={saveFileImage}
              ref={fileRef}
              type={'file'}
              accept={'image/*'}
              style={{ display: 'none' }}
            />
            이미지 수정
          </label>
          <div
            className={styles.defaultImgButton}
            onClick={() => {
              setImageUrl('');
            }}
          >
            기본 이미지
          </div>
        </div>

        <form className={styles.editImgButtons} onSubmit={submitImage}>
          <button className={styles.saveImg} type='submit'>
            이미지 저장
          </button>
        </form>

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
        <button onClick={saveNames}>수정 완료</button>
      </div>
    </div>
  );
};
export default Profile;
