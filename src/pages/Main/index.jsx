import React from 'react';
import { BrowserRouter, Route,Redirect,Switch } from 'react-router-dom';
import AdminIndex from '../../components/AdminIndex';
import Login from '../../components/Login';

export default function Main() {
  return (
    <BrowserRouter>
      <Switch>
        <Route  path="/login/"exact component={Login} />
        <Route  path="/index/"exact component={AdminIndex} />
        <Redirect to="/login/" exact component={Login} />
      </Switch>
    </BrowserRouter>
  )
}
