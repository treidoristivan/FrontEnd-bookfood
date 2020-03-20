import { SET_USER_LOGIN, SET_USER_PROFILE, REMOVE_USER_LOGIN } from './actionTypes'

export const setUserLogin = (token, dataProfile) => {
  return {
    type: SET_USER_LOGIN,
    payload: {
      token,
      dataProfile
    }
  }
}
export const setUserProfile = (dataProfile) => {
  return {
    type: SET_USER_PROFILE,
    payload: dataProfile
  }
}
export const removeUserLogin = () => {
  return {
    type: REMOVE_USER_LOGIN
  }
}
