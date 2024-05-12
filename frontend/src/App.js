import { ThemeProvider } from '@mui/material/styles';

import React, { Suspense, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Element } from 'react-scroll';

import Navigation from './components/Navigation';
import GlobalLoading from './components/UI/GlobalLoading';

// import useTheme from './hooks/useTheme';
// import useVoice from './hooks/useVoice';
import { getUserInfo } from './redux/slices/useInfoSlice';
import theme from './configs/theme';
import routerConfig from './configs/routers';

import HomePage from './pages/Home';

const { routes, renderRoutes } = routerConfig;

function App() {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  // const { isAuth } = useSelector((state) => state.userInfo);

  // get and set theme
  // useTheme();

  // get window voice and set custom voice
  // useVoice();

  // get user info
  // useEffect(() => {
  //   dispatch(getUserInfo());
  //   setLoading(false);
  //   return () => {};
  // }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
          <Router>
            <div className="luckclover-app">
              <Element name="scrollTop" />
              <Navigation />

              {/* routes */}
              <HomePage/>

              {/* common component */}
              {/* <div id="_overlay"></div>
              <Message />
              <SpeedDials /> */}
            </div>
          </Router>
        </ThemeProvider>
    </>
  );
}

export default App;

