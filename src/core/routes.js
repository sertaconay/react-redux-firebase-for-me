import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import HomePage from 'pages/Home';
// import ManagementPage from 'pages/Management';
// import LoginPage from 'pages/Login';
// import NotFoundPage from 'pages/errors/404';
// import MaintenancePage from 'pages/Maintenance';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    {/*<Route path="login" component={LoginPage} />*/}
    {/*<Route path="management" component={ManagementPage} />*/}
    {/*<Route path="*" component={NotFoundPage} />*/}
  </Route>
);

export default routes;
