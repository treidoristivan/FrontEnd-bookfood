import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Sign from './Sign'



function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        < Home/>
      </Route>
      <Route exact path="/register">
        < Sign />
      </Route>
    </Switch>
  </BrowserRouter>

  )
}

export default App;