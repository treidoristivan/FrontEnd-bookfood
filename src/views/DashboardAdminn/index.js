import React from 'react'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import Items from './Items'
const listPage = {
  dashboard: Items
}
export default function DashboardAdminn (props) {
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
