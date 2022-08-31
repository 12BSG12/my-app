export interface IHeader {
  fullName: string | null,
  isAuth: boolean | null,
  photo: string | null,
  onClickLogOut(): void
}