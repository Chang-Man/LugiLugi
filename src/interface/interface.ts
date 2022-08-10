export type RegisterKeyType = 'email' | 'password1' | 'password2' | 'username' | 'nickname';

export interface RegisterInputType {
  email: string;
  password1: string;
  password2: string;
  username: string;
  nickname: string;
}

export interface RegisterPostType {
  email: string;
  password: string;
  username: string;
  nickname: string;
}

export interface LoginPostType {
  email: string;
  password: string;
}

interface image {
  image: string;
}
export interface ProfileInputType {
  images: Array<image>;
  intro: string;
  group: string;
}

export interface UserGetType {
  id: string;
  email: string;
  username: string;
  nickname: string;
  code: string;
  image: string;
}

export interface UserGetProfileType {
  id: string;
  username: string;
  nickname: string;
  code: string;
  image: string;
}

export interface MatchType {
  redCode: string;
  blueCode: string;
  judgeCount: number;
  roundCount: number;
  roundTime: number;
  breakTime: number;
}

export interface postAttendanceType {
  date: string;
}

export interface getAttendanceMonthType {
  year: string;
  month: string;
}

export interface getAttendanceDayType {
  year: string;
  month: string;
  day: string;
}
