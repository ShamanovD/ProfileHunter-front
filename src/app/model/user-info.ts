import {SourceType} from './source-type';

export interface UserInfo {

  id: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  sourceType: SourceType;
  image: string;

}
