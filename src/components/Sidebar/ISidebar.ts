import { IFriends } from "../../models/sidebarType"

export interface ISidebar {
  friendsData: IFriends[]
  isLoading: boolean
}