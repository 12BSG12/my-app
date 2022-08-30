import { followindInProgressType } from "../../models/usersType";

export interface IUser {
  followed: boolean, 
  loading: boolean, 
  id: number,
  photos: string,
  follow(id: number): void, 
  unFollow(id: number): void, 
  name: string, 
  status: string | null
  followindInProgress: followindInProgressType[]
}