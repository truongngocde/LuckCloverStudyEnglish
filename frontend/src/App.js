import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Element } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import Navigation from './components/Navigation';
import GlobalLoading from './components/UI/GlobalLoading';

import { getUserInfo } from './redux/slices/useInfoSlice';
import theme from './configs/theme';
import routerConfig from './configs/routers';
import useTheme from './hooks/useTheme';
import useVoice from './hooks/useVoice';

const { routes, renderRoutes } = routerConfig;


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userInfo);

  
  // get and set theme
  useTheme();

  // get window voice and set custom voice
  useVoice();

  // get user info
  useEffect(() => {
    dispatch(getUserInfo());
    //setLoading(false);
    return () => {};
  }, []);

  return (
    <>   
        <ThemeProvider theme={theme}>
          <Router>
            <div className="luckclover-app">
              <Element name="scrollTop" />
              <Navigation />

              {/* routes */}
              <Suspense >
                <Routes>
                  {renderRoutes(routes, isAuth)}
                  
                  <Route>
                    {/* <NotFoundPage /> */}
                  </Route>
                </Routes>
              </Suspense>

              {/* common component */}
              <div id="_overlay"></div>
              {/* <Message /> */}
              {/* <SpeedDials /> */}
            </div>
          </Router>
        </ThemeProvider>
      
    </>
  );
}

export default App;
