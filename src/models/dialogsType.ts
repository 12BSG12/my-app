export interface IDialogs {
  id: number
  name: string
}

export interface IMessage {
  id: number
  message: string
}

export type dialogsType = {
  dialogsData: IDialogs[] 
  messagesData: IMessage[]
  chat?: chatType[]
}

export type chatType = {
  message: string,
  photo: string
  userId: number
  userName: string
}