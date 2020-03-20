import { GET_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from './actionTypes'
import getData from '../../helpers/getData'

export const getCart = () => {
  return {
    type: GET_CART,
    payload: getData('/carts?sort[created_at]=1')
  }
}
export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}
