import { ResultCodeEnum, ResultCodeForCaptcha } from "./resultCodeEnum"

export type authType = {
  id: number | null,
  fullName: string | null,
  isAuth: boolean,
  photo: string | null,
  captchaURL?: string | null,
  messageError?: string | null
}

export interface IAuth {
  data:{
    id: number,
    email: number,
    login: number
  }
  resultCode: ResultCodeEnum
  message: string
}

export interface ILogin {
  resultCode?: ResultCodeEnum | ResultCodeForCaptcha
  messages?: string[]
}

export interface ICaptcha {
  url: string
}