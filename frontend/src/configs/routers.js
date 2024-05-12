import React from 'react';
import { Route } from 'react-router';
import { ROUTES } from '../constants';
import HomePage from '../pages/Home';

const routes = [
  {
    path: ROUTES.HOME,
    exact: true,
    isProtect: false,
    component: () => <HomePage />,
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
        component={componentRender}
      />
    );
  });
};

export default {
  routes,
  renderRoutes,
};
