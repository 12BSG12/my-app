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
  isFetching: boolean
  loading: boolean
}

export interface IGetUsers {
  items: IUsers[]
  totalCount: number
}

export interface IFollowed {
  resultCode: ResultCodeEnum
  messages: string[],
}

export interface IParams {
  friend?: 'true' | 'false' | 'null',
  term?: string,
  page?: string
}

export interface ISearchForm {
  usersSearchQuery: string
  usersIsFriendQuery: string
  setSearchParams({term, friend}:{term?:string, friend?: string}): void
}
