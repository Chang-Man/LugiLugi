import React, { useState } from 'react';
import styles from './MakeLugiSetting.module.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material';
import matchAPI from '../../API/matchAPI';
import { toast } from 'react-toastify';

const MakeLugiSetting = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    redCode: '',
    blueCode: '',
    judgeCount: 1,
    roundCount: 1,
    roundTime: 60,
    breakTime: 30,
  });

  const handleRoundTime = (event: Event, newValue: number | number[]) => {
    setInputValue({ ...inputValue, roundTime: newValue as number });
  };

  const handleBreakTime = (event: Event, newValue: number | number[]) => {
    setInputValue({ ...inputValue, breakTime: newValue as number });
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        <FaArrowLeft className={styles.arrow} onClick={() => navigate('/lugilugi')} />
        경기 생성
      </div>
      <form
        className={styles.inputs}
        onSubmit={e => {
          e.preventDefault();
          matchAPI.createMatch(inputValue).then(
            res => {
              navigate(`/makelugi/${res.inviteCode}`);
            },
            e => {
              toast.dark('선수 코드를 다시 확인해주세요.');
            },
          );
        }}
      >
        <TextField
          placeholder='청 선수코드'
          label='청 선수 코드'
          focused
          style={{
            marginBottom: '10%',
          }}
          InputProps={{
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
          autoComplete='off'
          value={inputValue.blueCode}
          onChange={e => {
            setInputValue({ ...inputValue, blueCode: e.target.value });
          }}
        />
        <TextField
          placeholder='홍 선수코드'
          label='홍 선수코드'
          focused
          color='warning'
          style={{
            marginBottom: '10%',
          }}
          InputProps={{
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
          autoComplete='off'
          value={inputValue.redCode}
          onChange={e => {
            setInputValue({ ...inputValue, redCode: e.target.value });
          }}
        />

        <InputLabel id='demo-simple-select-label' style={{ color: 'white', fontWeight: 'bold' }}>
          라운드
        </InputLabel>
        <Select
          value={inputValue.roundCount}
          style={{ width: '100%', fontWeight: 'bold', color: 'white', marginBottom: '10%' }}
          onChange={e => {
            setInputValue({ ...inputValue, roundCount: Number(e.target.value) });
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>

        <InputLabel style={{ color: 'white', fontWeight: 'bold' }}>라운드 시간 : {inputValue.roundTime}(초)</InputLabel>
        <Slider step={10} min={60} max={180} track={false} marks defaultValue={60} valueLabelDisplay='auto' onChange={handleRoundTime} />

        <InputLabel style={{ color: 'white', fontWeight: 'bold' }}>쉬는 시간 : {inputValue.breakTime}(초)</InputLabel>
        <Slider step={10} min={10} max={60} track={false} marks defaultValue={30} valueLabelDisplay='auto' onChange={handleBreakTime} />

        <button>완료</button>
      </form>
    </div>
  );
};

export default MakeLugiSetting;

const stylees = (theme: any) => ({
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  input: {
    color: 'white',
  },
});
