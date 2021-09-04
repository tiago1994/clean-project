import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin} exact />
        <Route path="/signup" component={SignUp} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
