import axios, {AxiosResponse} from 'axios';
import key from './api-key';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: key
});

const responseBody = (response: AxiosResponse) => response.data;

export const usersAPI = {
  follow: {
    deleteFollow(id: number) {return instance.delete(`follow/${id}`).then(responseBody)},
    postFollow(id: number) {return instance.post(`follow/${id}`,{}).then(responseBody)},
  },
  profile: {
    getProfile(id: number) {return instance.get(`profile/${id}`).then(responseBody)},
    getProfileStatus(id: number) {return instance.get(`profile/status/${id}`).then(responseBody)},
    putProfileStatus(status: string) {return instance.put('profile/status', {status: status}).then(responseBody)},
    putProfilePhoto(formData: FormData) {return instance.put('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(responseBody)},
    putProfileEdit(formData: object) {return instance.put('profile', {...formData}).then(responseBody)},
  },
  auth: {
    getAuth() {return instance.get('auth/me').then(responseBody)},
    postLogin(email: string, password: string, rememberMe:boolean = false, captcha:string) {return instance.post('auth/login', {email, password, rememberMe, captcha}).then(responseBody)},
    deleteLogOut() {return instance.delete('auth/login').then(responseBody)},
  },
  users: {
    getUsers(currentPage: number, pageSize: number) {return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(responseBody)},
    getFriends(totalCount?: number) {return instance.get(`users?friend=true&count=${totalCount}`).then(responseBody)},
  },
  security: {
    getCaptcha() {return instance.get('security/get-captcha-url').then(responseBody)},
  }
}