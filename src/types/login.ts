export type LoginResponse = {
  data: any
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken: string
}

export type LoginRequest = {
  username: string
  password: string
}
