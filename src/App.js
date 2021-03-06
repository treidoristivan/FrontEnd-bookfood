import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import SuperAdminRoute from './components/SuperAdminRoute'
import AdminRoute from './components/AdminRoute'
import UserRoute from './components/UsersRoute'
import MainLayout from './layouts/Main'
import MinimalLayout from './layouts/Minimal'
import LayoutSuper from './layouts/LayoutSuper'
import LayoutAdmin from './layouts/LayoutAdmin'
import Home from './views/Home'
import Login from './views/Login'
import Profile from './views/Profile'
import Logout from './views/Logout'
import Register from './views/Register'
import ForgotPassword from './views/ForgotPassword'
import ShowItems from './views/ShowItems'
import DetailItem from './views/ShowItems/DetailItem'
import ShowCarts from './views/Carts'
import DashboardSuperr from './views/DashboardSuperr'
import DashboardAdminn from './views/DashboardAdminn'
import Page404 from './views/Page404'
import Page403 from './views/Page403'

function App (props) {
  return (
    <Router basename={(process.env.PUBLIC_URL || '/')}>
      <Switch>
        <GuestRoute
          exact
          path='/'
          component={Home}
          title='Home'
          isHome={1}
          layout={MainLayout}
        />
        <GuestRoute
          exact
          path='/login'
          title='Login'
          component={Login}
          layout={MinimalLayout}
        />
        <GuestRoute
          exact
          path='/logout'
          title='Logout'
          component={Logout}
          layout={MinimalLayout}
        />
        <GuestRoute
          exact
          path='/register'
          title='Registrasi'
          component={Register}
          layout={MinimalLayout}
        />
    <GuestRoute
          exact
          path='/forgot-password'
          title='Forgot Password'
          component={ForgotPassword}
          layout={MainLayout}
        />
        <GuestRoute
          exact
          path='/items'
          title='Items'
          component={ShowItems}
          layout={MainLayout}
        />
        <GuestRoute
          exact
          path='/items/:id'
          title='Items'
          component={DetailItem}
          layout={MainLayout}
        />
        <UserRoute
          exact
          path='/carts'
          title='Cart'
          component={ShowCarts}
          layout={MainLayout}
        />
        <UserRoute
          exact
          path='/profile'
          title='Profile'
          component={Profile}
          layout={MainLayout}
        />


                    {/* START SUPER ADMIN */}
                    <SuperAdminRoute
                      exact
                      path='/admin'
                      title='DashBoard'
                      component={DashboardSuperr}
                      layout={LayoutSuper}
                    />
                    <SuperAdminRoute
                      exact
                      path='/admin/:page'
                      title='DashBoard'
                      component={DashboardSuperr}
                      layout={LayoutSuper}
                    />
                    {/* END SUPER ADMIN */}


                              {/* START Admin Restaurant */}
                              <AdminRoute
                                exact
                                path='/restaurant/admin'
                                title='DashBoard'
                                component={DashboardAdminn}
                                layout={LayoutAdmin}
                              />
                              <AdminRoute
                                exact
                                path='/restaurant/admin/:page'
                                title='DashBoard'
                                component={DashboardAdminn}
                                layout={LayoutAdmin}
                              />
                              {/* END Admin Restaurant */}


                              <GuestRoute
                                title='403 Forbidden'
                                exact
                                path='/403'
                                component={Page403}
                                layout={MainLayout}
                              />
                              <GuestRoute
                                title='404 Not Found'
                                component={Page404}
                                layout={MainLayout}
                              />
        </Switch>
      </Router>
    )
  }


export default App
