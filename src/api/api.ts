import { ResultCodeForCaptcha, ResultCodeEnum } from './../models/resultCodeEnum';
import axios from 'axios';
import { IAuth, ICaptcha } from '../models/authType';
import { IPhoto, IUser } from '../models/profileType';
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
    putProfileStatus(status: string) {return instance.put<ResultResponse<{}, ResultCodeEnum>>('profile/status', {status: status}).then(response => response.data)},
    putProfilePhoto(formData: FormData) {return instance.put<ResultResponse<IPhoto, ResultCodeEnum>>('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data)},
    putProfileEdit(formData: IUser) {return instance.put<ResultResponse<IUser, ResultCodeEnum>>('profile', {...formData}).then(response => response.data)},
  },
  auth: {
    getAuth() {return instance.get<ResultResponse<IAuth, ResultCodeEnum>>('auth/me').then(response => response.data)},
    postLogin(email: string, password: string, rememberMe:boolean = false, captcha:string) {return instance.post<ResultResponse<{}>>('auth/login', {email, password, rememberMe, captcha}).then(response => response.data)},
    deleteLogOut() {return instance.delete<ResultResponse<{}, ResultCodeEnum>>('auth/login').then(response => response.data)},
  },
  users: {
    getUsers(currentPage: number, pageSize: number, isFriends?: boolean | null, search?: string) {return instance.get<IGetUsers>(`users?page=${currentPage}&count=${pageSize}&friend=${isFriends}&term=${search}`).then(response => response.data)},
    getFriends(totalCount?: number) {return instance.get<IGetFriends>(`users?friend=true&count=${totalCount}`).then(response => response.data)},
  },
  security: {
    getCaptcha() {return instance.get<ICaptcha>('security/get-captcha-url').then(response => response.data)},
  }
}

interface ResultResponse<D={}, RC=ResultCodeEnum | ResultCodeForCaptcha> {
  data: D,
  messages: string[]
  resultCode: RC
}