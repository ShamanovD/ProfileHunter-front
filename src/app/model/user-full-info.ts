import {UserInfo} from './user-info';

export interface UserFullInfo extends UserInfo {

  email: string;
  birthday: string;
  phoneNumber: string;
  profilePhotos: string[];

}
