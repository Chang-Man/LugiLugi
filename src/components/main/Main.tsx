import React, { useEffect, useState } from 'react';
import Logo from '../../public/tkdmark.jpg';
import styles from './Main.module.scss';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import lugilugi from '../../public/lugilugi.png';
import workOut from '../../public/workOut.png';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';
import WorkOutModal from './workOutModal/WorkOutModal';
import AttendanceModal from './attendanceModal/AttendanceModal';
import Moment from 'moment';
import defaultProfile from './../../public/defaultProfile.png';
import authAPI from '../../API/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/module/auth';
import userAPI from '../../API/userAPI';
import { setUser } from '../../redux/module/user';
import rootReducer from '../../redux';
import { FiLogOut } from 'react-icons/fi';
import moment from 'moment';
import attendance from '../../API/attendance';
type RootState = ReturnType<typeof rootReducer>;

interface attendanceDateObjectType {
  id: string;
  date: string;
}

const Main = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isAttendanceModal, setIsAttendanceModal] = useState<boolean>(false);
  const [attendanceDate, setAttendanceDate] = useState<Date[]>([]);
  const [dateToPost, setDateToPost] = useState<Date>();
  const formatDate = Moment(nowDate).format('YYYY/MM');
  const dispatch = useDispatch();
  const user_info = useSelector((state: RootState) => state.user).user_info;

  const onClickLogout = () => {
    authAPI.logout();
    dispatch(logout());
  };

  const array = [
    {
      id: 1,
      date: '07/7/2022',
    },
    {
      id: 2,
      date: '07/14/2022',
    },
    {
      id: 3,
      date: '07/21/2022',
    },
  ];

  const handleMonthChange = (date: Date) => {
    setDateToPost(date);
  };

  useEffect(() => {
    userAPI.getUser().then(
      res => dispatch(setUser(res)),
      error => {
        authAPI.logout();
      },
    );
    attendance.getAttendanceMonth({ year: moment().format('YYYY'), month: moment().format('MM') }).then(res => {
      setAttendanceDate([]);
      res.results.map((res: string, idx: number) => {
        setAttendanceDate(prevArray => [...prevArray, subDays(new Date(res), 0)]);
      });
    });
  }, []);

  useEffect(() => {
    const yearToGet = moment(dateToPost).format('YYYY');
    const monthToGet = moment(dateToPost).format('MM');

    attendance.getAttendanceMonth({ year: yearToGet, month: monthToGet }).then(res => {
      setAttendanceDate([]);
      res.results.map((res: string, idx: number) => {
        setAttendanceDate(prevArray => [...prevArray, subDays(new Date(res), 0)]);
      });
    });
  }, [dateToPost, setDateToPost]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <img src={Logo} alt={'logo'} className={styles.logo} />
          <span>LUGI-LUGI</span>
        </div>
        <div className={styles.status}>
          <BsPerson className={styles.profile} size={'1.5em'} onClick={() => navigate('/profile')} />
          <FiLogOut className={styles.menu} size={'1.5em'} onClick={onClickLogout} />
        </div>
      </div>
      <WorkOutModal isModal={isModal} setIsModal={setIsModal} setAttendanceDate={setAttendanceDate} />
      <AttendanceModal isModal={isAttendanceModal} setIsModal={setIsAttendanceModal} date={nowDate} />
      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          <img className={styles.userImg} src={defaultProfile} />

          {user_info == null ? (
            <></>
          ) : (
            <div className={styles.userTxt}>
              <span className={styles.user}>{user_info.username}</span>
              <span className={styles.cuteName}></span>
              <span className={styles.slash}>/</span>
              <span className={styles.code}>{user_info.code}</span>
              <br />
              <span className={styles.nickName}>{user_info.nickname}</span>
            </div>
          )}
        </div>
        <style>
          {`.react-datepicker {
          width: 100%;
          font-family: RussoOne;
          font-weight: lighter;
          font-size: 110%;
      }
      .react-datepicker__month-container {
        width: 100%;
      }
      .react-datepicker__day--today {
         color : #D3D3D3;

      }
      .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
        background-color : black;
      }
      .react-datepicker__day--highlighted {
        background-color : gray;
      }
      .react-datepicker__day--selected:hover {
        background-color : black;
      }
      .react-datepicker__day--outside-month {
        color: transparent !important;
        pointer-events: none;
      }
      `}
        </style>
        <div className={styles.count}>
          <span>{formatDate} 운동</span>
          <span className={styles.slash}>:</span>
          <span>{attendanceDate.length}회</span>
        </div>
        <Datepicker
          className='form-control'
          selected={nowDate}
          onChange={(date: Date) => {
            setNowDate(date);
            setIsAttendanceModal(true);
          }}
          highlightDates={attendanceDate}
          isClearable={false}
          onMonthChange={handleMonthChange}
          inline
        />

        <div className={styles.menus}>
          <img src={workOut} alt={'workOut'} onClick={() => setIsModal(true)} />
          <img
            src={lugilugi}
            alt={'lugilugi'}
            onClick={() => {
              navigate('/lugilugi');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
