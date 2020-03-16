import React from 'react'
import { Container, Divider, Grid, Button } from '@material-ui/core'
import Header from './components/Header'
import CardItem from './components/CardItem'
import getData from '../../helpers/getData'

export default function Home (props) {
  const  [items, setItem] = React.useState([])
  React.useEffect(() => {
    getDataItems(15)
  })
  const getDataItems = async (numData) => {
    try {
      const dataItems = await getData('/browse-items?sort[_id]=1&limit='+numData)
      if (dataItems.data.success && dataItems.data.data) {
        setItem(dataItems.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Header />
      
    </>
  )
}
