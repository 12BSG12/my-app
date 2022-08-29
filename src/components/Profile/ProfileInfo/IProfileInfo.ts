import { IUser } from "../../../models/profileType"

export interface IProfileInfo {
  userProfileData: IUser | null
  profileStatus: string
}