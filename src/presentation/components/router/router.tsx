import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={factory.makeLogin} exact />
        <Route path="/signup" component={factory.makeSignUp} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
