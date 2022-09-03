import { IUsers } from './../../models/usersType';
export interface _IUsers {
  usersData: IUsers[], 
  follow(id: number): void, 
  unFollow(id: number): void, 
  pagesCount: number, 
  changePage(num: number): void, 
  usersPageQuery: string
  usersSearchQuery: string
  usersIsFriendQuery: string
  setSearchParams({term, friend}:{term?:string, friend?: string}): void
}
