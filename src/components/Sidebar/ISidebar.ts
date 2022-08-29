import { friendsType } from "../../redux/reducers/sidebar"

export interface ISidebar {
  friendsData: friendsType[]
  isLoading: boolean
}