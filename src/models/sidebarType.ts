export interface IFriends {
  id: number
  name: string
  photos: {
    small: string
    large: string
  }
}

export type sidebarType = {
  friendsData: IFriends[],
  count: number,
  isLoading: boolean,
  error: string | null |undefined
}