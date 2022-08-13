import * as axios from 'axios';
import key from './api-key';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: key
});
export const usersAPI = {
  getAuth() {return instance.get('auth/me').then(response => response.data)},
  getProfile(id) {return instance.get(`profile/${id}`).then(response => response.data)},
  getUsers(currentPage, pageSize) {return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)},
  deleteFollow(id) {return instance.delete(`follow/${id}`).then(response => response.data)},
  postFollow(id) {return instance.post(`follow/${id}`,{}).then(response => response.data)},
}