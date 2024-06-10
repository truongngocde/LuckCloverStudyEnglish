import React, { Component } from 'react';
import { Route } from 'react-router';
import { ROUTES } from '../constants';
import HomePage from '../pages/Home';
import Logout from '../components/Logout';

const Register = React.lazy(() => import('../pages/Register'))
const Login = React.lazy(() => import('../pages/Login'))
const UserAccount = React.lazy(() => import('../pages/UserAccount'))

const IPAPage = React.lazy(() => import('../pages/IPA'));
const CommunicationPhrase = React.lazy(() => import('../pages/CommunicationPhrase'));
const Flashcard = React.lazy(() => import('../pages/Flashcard'));
const IrregularVerbPage = React.lazy(() => import('../pages/IrregularVerb'));
const GrammarPage = React.lazy(() => import('../pages/Grammar'));
const DictionaryPage = React.lazy(() => import('../pages/Dictionary'));
const FavoriteDictionaryPage = React.lazy(() => import('../pages/FavoriteDictionary'));
const Contribution = React.lazy(() => import('../pages/Contribution'));
const LeaderBoard = React.lazy(() => import('../pages/LeaderBoard'));

const ChallengesPage = React.lazy(() => import('../pages/Challenges'));
const CorrectWordPage = React.lazy(() => import('../pages/Challenges/CorrectWord'));
const FastWordPage = React.lazy(() => import('../pages/Challenges/FastWord'));
const MatchWordGPage = React.lazy(() => import('../pages/Challenges/MatchWord'));
const MatchSentenceGPage = React.lazy(() => import('../pages/Challenges/MatchSentence'));


const routes = [
  {
    path: ROUTES.HOME,
    exact: true,
    isProtect: false,
    component: () => <HomePage />,
  },
  {
    path: ROUTES.REGISTER,
    exact: true,
    isProtect: false,
    component: () => <Register />,
  },
  {
    path: ROUTES.LOGIN,
    exact: true,
    isProtect: false,
    component: () => <Login />,
  },
  {
    path: ROUTES.LOGOUT,
    exact: true,
    isProtect: false,
    component: () => <Logout />,
  },
  {
    path: ROUTES.USER_ACCOUNT,
    exact: false,
    isProtect: true,
    component: () => <UserAccount />,
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
    path: ROUTES.GRAMMAR,
    exact: false,
    isProtect: false,
    component: () => <GrammarPage />,
  },
  {
    path: ROUTES.LUCKCLOVER_DICTIONARY,
    exact: false,
    isProtect: false,
    component: () => <DictionaryPage isTOEIC={false}/>,
  },
  {
    path: ROUTES.TOEIC_DICTIONARY,
    exact: false,
    isProtect: false,
    component: () => <DictionaryPage isTOEIC={true}/>,
  },
  {
    path: ROUTES.FAVORITE,
    exact: false,
    isProtect: false,
    component: () => <FavoriteDictionaryPage/>,
  },
  {
    path: ROUTES.FLASHCARD,
    exact: true,
    isProtect: false,
    component: () => <Flashcard />,
  },
  {
    path: ROUTES.IRREGULAR,
    exact: false,
    isProtect: false,
    component: () => <IrregularVerbPage />,
  },
  {
    path: ROUTES.CONTRIBUTION,
    exact: false,
    isProtect: false,
    component: () => <Contribution />,
  },
  {
    path: ROUTES.LEADERBOARD,
    exact: false,
    isProtect: false,
    component: () => <LeaderBoard />,
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
    path: ROUTES.CHALLENGES.FAST_WORD,
    exact: true,
    isProtect: false,
    component: () => <FastWordPage />,
  },
  {
    path: ROUTES.CHALLENGES.WORD_MATCHING,
    exact: true,
    isProtect: false,
    component: () => <MatchWordGPage />,
  },
  {
    path: ROUTES.CHALLENGES.SENTENCE_MATCHING,
    exact: true,
    isProtect: false,
    component: () => <MatchSentenceGPage />,
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
