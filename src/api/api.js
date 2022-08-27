import * as axios from 'axios';
import key from './api-key';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: key
});

export const usersAPI = {
  follow: {
    deleteFollow(id) {return instance.delete(`follow/${id}`).then(response => response.data)},
    postFollow(id) {return instance.post(`follow/${id}`,{}).then(response => response.data)},
  },
  profile: {
    getProfile(id) {return instance.get(`profile/${id}`).then(response => response.data)},
    getProfileStatus(id) {return instance.get(`profile/status/${id}`).then(response => response.data)},
    putProfileStatus(status) {return instance.put('profile/status', {status: status}).then(response => response.data)},
    putProfilePhoto(formData) {return instance.put('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data)},
    putProfileEdit(formData) {return instance.put('profile', {...formData}).then(response => response.data)},
  },
  auth: {
    getAuth() {return instance.get('auth/me').then(response => response.data)},
    postLogin(email, password, rememberMe=false, captcha) {return instance.post('auth/login', {email, password, rememberMe, captcha})},
    deleteLogOut() {return instance.delete('auth/login' )},
  },
  users: {
    getUsers(currentPage, pageSize) {return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)},
    getFriends(totalCount) {return instance.get(`users?friend=true&count=${totalCount}`).then(response => response.data)},
  },
  security: {
    getCaptcha() {return instance.get('security/get-captcha-url').then(response => response.data)},
  }
}

export const api = {
  baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
  credentials: 'include',
}