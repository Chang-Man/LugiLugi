export type RegisterKeyType = 'userId' | 'password1' | 'password2' | 'name' | 'birthday';

export interface RegisterInputType {
  userId: string;
  password1: string;
  password2: string;
  name: string;
  birthday: string;
}
interface image {
  image: string;
}
export interface ProfileInputType {
  images: Array<image>;
  intro: string;
  group: string;
}
