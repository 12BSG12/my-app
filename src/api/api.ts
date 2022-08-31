import axios from 'axios';
import { IAuth, ICaptcha, ILogin } from '../models/authType';
import { IEditProfile, IPhoto, IProfileStatus, IUser } from '../models/profileType';
import { IGetFriends } from '../models/sidebarType';
import { IFollowed, IGetUsers } from '../models/usersType';
import key from './api-key';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: key
});

export const usersAPI = {
  follow: {
    deleteFollow(id: number) {return instance.delete<IFollowed>(`follow/${id}`).then(response => response.data)},
    postFollow(id: number) {return instance.post<IFollowed>(`follow/${id}`,{}).then(response => response.data)},
  },
  profile: {
    getProfile(id: number) {return instance.get<IUser>(`profile/${id}`).then(response => response.data)},
    getProfileStatus(id: number) {return instance.get<string>(`profile/status/${id}`).then(response => response.data)},
    putProfileStatus(status: string) {return instance.put<IProfileStatus>('profile/status', {status: status}).then(response => response.data)},
    putProfilePhoto(formData: FormData) {return instance.put<IPhoto>('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data)},
    putProfileEdit(formData: IUser) {return instance.put<IEditProfile>('profile', {...formData}).then(response => response.data)},
  },
  auth: {
    getAuth() {return instance.get<IAuth>('auth/me').then(response => response.data)},
    postLogin(email: string, password: string, rememberMe:boolean = false, captcha:string) {return instance.post<ILogin>('auth/login', {email, password, rememberMe, captcha}).then(response => response.data)},
    deleteLogOut() {return instance.delete<ILogin>('auth/login').then(response => response.data)},
  },
  users: {
    getUsers(currentPage: number, pageSize: number) {return instance.get<IGetUsers>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)},
    getFriends(totalCount?: number) {return instance.get<IGetFriends>(`users?friend=true&count=${totalCount}`).then(response => response.data)},
  },
  security: {
    getCaptcha() {return instance.get<ICaptcha>('security/get-captcha-url').then(response => response.data)},
  }
}