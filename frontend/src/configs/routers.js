import React, { Component } from 'react';
import { Route } from 'react-router';
import { ROUTES } from '../constants';
import HomePage from '../pages/Home';

const IPAPage = React.lazy(() => import('../pages/IPA'));
const CommunicationPhrase = React.lazy(() => import('../pages/CommunicationPhrase'));
const ChallengesPage = React.lazy(() => import('../pages/Challenges'));
const CorrectWordPage = React.lazy(() => import('../pages/Challenges/CorrectWord'));
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
  {
    path: ROUTES.CHALLENGES.HOME,
    exact: true,
    isProtect: false,
    component: () => <ChallengesPage />,
  },
  {
    path: ROUTES.CHALLENGES.CORRECT_WORD,
    exact: true,
    isProtect: false,
    component: () => <CorrectWordPage />,
  },
  {
    path: ROUTES.CHALLENGES.WORD_MATCHING,
    exact: true,
    isProtect: false,
    // component: () => <WordMatchGamePage />,
  },
  {
    path: ROUTES.CHALLENGES.FAST_WORD,
    exact: false,
    isProtect: false,
    // component: () => <FastGamePage />,
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
