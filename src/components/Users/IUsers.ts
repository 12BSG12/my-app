import { followindInProgressType, IUsers } from './../../models/usersType';
export interface _IUsers {
  usersData: IUsers[], 
  follow(id: number): void, 
  unFollow(id: number): void, 
  loading: boolean, 
  pagesCount: number, 
  changePage(num: number): void, 
  currentPage: number
  followindInProgress: followindInProgressType[] 
}