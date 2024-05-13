import React, { Component } from 'react';
import { Route } from 'react-router';
import { ROUTES } from '../constants';
import HomePage from '../pages/Home';

const IPAPage = React.lazy(() => import('../pages/IPA'));
const CommunicationPhrase = React.lazy(() => import('../pages/CommunicationPhrase'));

const routes = [
  {
    path: ROUTES.HOME,
    exact: true,
    isProtect: false,
    component: () => <HomePage />,
  },
  {
    path: ROUTES.IPA,
    exact: true,
    isProtect: false,
    component: () => <IPAPage />,
  },
  {
    path: ROUTES.COMMUNICATION_PHRASE,
    exact: true,
    isProtect: false,
    component: () => <CommunicationPhrase />,
  },
];

const renderRoutes = (routes, isAuth = false) => {
  return routes.map((route, index) => {
    const { path, exact, component, isProtect } = route;
    //   const loginComponent = () => <LoginPage />;
    const componentRender = !isProtect ? component : isAuth ? component : null;

    return (
      <Route
        path={path}
        exact={exact}
        key={index}
        Component={componentRender}
      />
    );
  });
};

export default {
  routes,
  renderRoutes,
};
