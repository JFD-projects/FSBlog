const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const USER_EMAIL = 'user-email'

export function setTokens ({ refreshToken, accessToken, userId, email, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USERID_KEY, userId)
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(USER_EMAIL, email)
}
export function getAccessToken () {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken () {
  return localStorage.getItem(REFRESH_KEY)
}
export function removeAuthData () {
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USER_EMAIL)
}
export function getExpiresToken () {
  return localStorage.getItem(EXPIRES_KEY)
}
export function getUserId () {
  return localStorage.getItem(USERID_KEY)
}
export function getEmailUser () {
  return localStorage.getItem(USER_EMAIL)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresToken,
  getUserId,
  removeAuthData,
  getEmailUser
}

export default localStorageService