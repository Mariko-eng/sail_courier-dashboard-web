import { useEffect } from 'react';
// import { Suspense } from "react";
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Router from './Router';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

import { LoadScript } from '@react-google-maps/api';

import { useNavigate, useLocation } from 'react-router-dom';

const apiKey = 'AIzaSyB9j-AnmMNOwRK6OHLTzKmhvz4p5xMWLpw'; // Replace with your API key
const libraries = ['places'];

function App() {
  const customization = useSelector((state) => state.customization);
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(auth.user).length === 0) {
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [auth, location.pathname, navigate]);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
              <Router />
            </LoadScript>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
