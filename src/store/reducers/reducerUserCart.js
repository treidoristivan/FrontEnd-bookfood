import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART,GET_CART, CLEAR_CART} from '../actions/actionTypes'

const initialState = {
  totalPrice: 0,
  totalTypeItems: 0,
  itemInCart: [],
  isLoading: false,
  isError: false
}

const dataCart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART + '_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case GET_CART + '_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: action.payload.cata
      }
    case GET_CART + '_FULFILLED':
      if (action.payload.data.data) {
        return {
          ...state,
          ...action.payload.data.data,
          isLoading: false,
          isError: false
        }
      } else {
        return {
          ...initialState
        }
      }
    case CLEAR_CART:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default dataCart
