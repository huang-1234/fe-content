import React from 'react';
import { BrowserRouter, Route,Redirect } from 'react-router-dom';
import AdminIndex from '../../components/AdminIndex';
import Login from '../../components/Login';

export default function Main() {
  return (
    <BrowserRouter>
      <Route  path="/"exact component={Login} />
      <Route  path="/index/"exact component={AdminIndex} />
      {/* <Redirect path="/index/"exact component={AdminIndex} /> */}
    </BrowserRouter>
  )
}
