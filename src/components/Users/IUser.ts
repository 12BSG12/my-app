export interface IUser {
  followed: boolean, 
  id: number,
  photos: string,
  follow(id: number): void, 
  unFollow(id: number): void, 
  name: string, 
  status: string | null
}