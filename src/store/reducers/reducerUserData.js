import { SET_USER_LOGIN, SET_USER_PROFILE, REMOVE_USER_LOGIN } from '../actions/actionTypes'
const initialState = {
  token: '',
  dataProfile: {},
  isLogin: false
}

const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        isLogin: true,
        dataProfile: action.payload.dataProfile
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        dataProfile: action.payload
      }
    case REMOVE_USER_LOGIN:
      return {
        ...initialState
      }
    default:
      return state
  }
}
export default dataUser
