const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const STAY_ON = 'user-stay-on'
const EMAIL_USER = 'email-user'

export function setTokens ({ refreshToken, idToken, localId, email, stayOn = false, expiresIn = 3600 }, setAuth) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USERID_KEY, localId)
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(STAY_ON, stayOn)
  localStorage.setItem(EMAIL_USER, email)
  if (setAuth) checkLogin(setAuth)
}
export function getAccessToken () {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken () {
  return localStorage.getItem(REFRESH_KEY)
}
export function getExpiresToken () {
  return localStorage.getItem(EXPIRES_KEY)
}
export function getUserId () {
  return localStorage.getItem(USERID_KEY)
}
export function getStayOn () {
  return localStorage.getItem(STAY_ON)
}
export function getEmailUser () {
  return localStorage.getItem(EMAIL_USER)
}
export function removeAuthData () {
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(STAY_ON)
  localStorage.removeItem(EMAIL_USER)
}
export function checkLogin (setAuth) {
  console.log('Run checkLogin')
  const expiresDate = getExpiresToken()
  const refreshToken = getRefreshToken()
  const stayOn = getStayOn()
  if (expiresDate && refreshToken && stayOn !== 'false') {
    console.log('CheckLogin val1')
    setAuth(true)
  } else if (refreshToken && Number(expiresDate) > Date.now()) {
    console.log('CheckLogin val2', Number(expiresDate), Date.now())
    setAuth(true)
  } else {
    console.log('CheckLogin val4')
    console.log('set false')
    setAuth(false)
    removeAuthData()
  }
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresToken,
  getUserId,
  getStayOn,
  removeAuthData,
  checkLogin,
  getEmailUser
}

export default localStorageService