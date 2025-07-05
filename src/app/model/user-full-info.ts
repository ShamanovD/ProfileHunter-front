import {UserInfo} from './user-info';

export interface UserFullInfo extends UserInfo {

  profilePhotos: string[];
  metaInfoMap: { [key: string]: any };

}
