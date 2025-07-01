import {SearchType} from './search-type';
import {SourceType} from './source-type';

export interface LinkedSearchFilter {

  startNodeType: SourceType;

  searchType: SearchType;

  sourceTypes: SourceType[];

}
