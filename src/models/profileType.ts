export interface IUser {
  aboutMe: string | null | undefined
  contacts?: {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
  },
  lookingForAJob: boolean,
  lookingForAJobDescription: string | null,
  fullName: string,
  userId?: number | null,
  photos?: {
    small: string | null,
    large: string | null
  }
}

export interface IPost {
  id: number
  message: string,
  likesCount: number
}

export type profileType = {
  userProfileData: IUser | null
  postData: IPost[]
  isFetching?: boolean
  profileStatus: string
}
export interface IPhoto {
  photos: {
    small: string,
    large: string
  }
}