import { ResultCodeEnum } from "./resultCodeEnum"

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

export type usersType = {
  usersData: IUsers[],
  pageSize: number,
  totalCount: number,
  currentPage: number,
  isFetching: boolean
  loading: boolean
  isFriends: boolean | null
  search: string
}

export interface IGetUsers {
  items: IUsers[]
  totalCount: number
}

export interface IFollowed {
  resultCode: ResultCodeEnum
  messages: string[],
}

