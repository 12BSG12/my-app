export type authType = {
  id: number | null,
  fullName: string | null,
  isAuth: boolean,
  photo: string | null,
  captchaURL?: string | null,
  messageError?: string | null
}

export interface IAuth {
  id: number,
  email: number,
  login: number
}

export interface ICaptcha {
  url: string
}