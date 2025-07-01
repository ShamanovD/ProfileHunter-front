import {SourceType} from './source-type';
import {LinkedSearchFilter} from './linked-search-filter';

export interface SearchModel {

  username: string;
  sourceType: SourceType;
  linkedSearchFilter: LinkedSearchFilter;

}
