import { userType } from './../../../redux/reducers/profile';
export interface IProfileInfo {
  userProfileData: userType | null
  profileStatus: string
}