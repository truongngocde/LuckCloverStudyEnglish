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

const { routes, renderRoutes } = routerConfig;


function App() {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  const { isAuth } = false;
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
