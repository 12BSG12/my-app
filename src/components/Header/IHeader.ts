export interface IHeader {
  login: string | null,
  isAuth: boolean | null,
  photo: string | null,
  onClickLogOut(): void
}