import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'

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
        <Route path="/" component={SurveyList} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
