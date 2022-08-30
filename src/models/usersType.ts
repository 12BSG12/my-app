export interface IUsers {
  name: string
  id: number
  uniqueUrlName: string |null
  photos: {
    small: string |null
    large: string |null
  },
  status: string | null
  followed: boolean
}

export type followindInProgressType  = {
  id: number
}

export type usersType = {
  usersData: IUsers[],
  pageSize: number,
  totalCount: number,
  currentPage: number,
  followindInProgress: followindInProgressType[],
  isFetching: boolean
  loading: boolean
}