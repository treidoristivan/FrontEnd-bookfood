import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import SuperAdminRoute from './components/SuperAdminRoute'
import UserRoute from './components/UsersRoute'
import MainLayout from './layouts/Main'
import MinimalLayout from './layouts/Minimal'
import Home from './views/Home'
import Login from './views/Login'
import Profile from './views/Profile'
import Logout from './views/Logout'
import Register from './views/Register'
import ShowItems from './views/ShowItems'
import DetailItem from './views/ShowItems/DetailItem'
import ShowCarts from './views/Carts'
import DashboardAdmin from './views/DashboardAdmin'
import Page404 from './views/Page404'
import Page403 from './views/Page403'
import cookie from 'js-cookie'
class App extends React.Component {
  constructor (props) {
    super(props)
    document.title = 'Book & Food'
    this.state = {
      isLogin: 0
    }
    this.setIsLogin = this.setIsLogin.bind(this)
  }

  setIsLogin (setTO) {
    this.setState({
      isLogin: setTO
    })
  }

  componentDidMount () {
    if (cookie.get('ujang')) {
      this.setState({
        isLogin: 1
      })
    }
  }

  render () {
    return (
      <Router>
        <Switch>
          <GuestRoute
            exact
            path='/'
            component={Home}
            title='Home'
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
          <GuestRoute
            exact
            path='/login'
            title='Login'
            component={Login}
            layout={MinimalLayout}
            isLogin={this.state.isLogin}
            setIsLogin={this.setIsLogin}
          />
          <GuestRoute
            exact
            path='/logout'
            title='Logout'
            component={Logout}
            layout={MinimalLayout}
            isLogin={this.state.isLogin}
            setIsLogin={this.setIsLogin}
          />
          <GuestRoute
            exact
            path='/register'
            title='Registrasi'
            component={Register}
            layout={MinimalLayout}
            isLogin={this.state.isLogin}
          />
          <GuestRoute
            exact
            path='/items'
            title='Items'
            component={ShowItems}
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
          <GuestRoute
            exact
            path='/items/:id'
            title='Items'
            component={DetailItem}
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
          <UserRoute
            exact
            path='/carts'
            title='Cart'
            component={ShowCarts}
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
          <UserRoute
            exact
            path='/profile'
            title='Profile'
            component={Profile}
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
          {/* <SuperAdminRoute
            exact
            path='/admin'
            title='DashBoard'
            component={DashboardAdmin}
            layout={Dashboard}
            isLogin={this.state.isLogin}
          />
          <SuperAdminRoute
            exact
            path='/admin/:page'
            title='DashBoard'
            component={DashboardAdmin}
            layout={Dashboard}
            isLogin={this.state.isLogin}
          /> */}
          <GuestRoute
            title='403 Forbidden'
            exact
            path='/403'
            component={Page403}
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
          <GuestRoute
            title='404 Not Found'
            component={Page404}
            layout={MainLayout}
            isLogin={this.state.isLogin}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
