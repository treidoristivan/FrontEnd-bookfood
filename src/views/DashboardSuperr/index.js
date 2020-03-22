import React from 'react'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import User from './User'
import Categories from './Categories'
import Restaurants from './Restaurants'
import Items from './Items'
const listPage = {
  dashboard: Restaurants,
  categories: Categories,
  items: Items
}
export default function DashboardSuperr (props) {
  const showPage = props.match.params.page
  let Page = listPage.dashboard
  if (showPage) {
    if (listPage[showPage]) {
      Page = listPage[showPage]
    } else {
      return (<Redirect to='/404' />)
    }
  }
  return (<Page />)
}
