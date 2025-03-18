import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import NavigationScroll from './components/Navigation/NavigationScroll';

import { Loader } from '@googlemaps/js-api-loader';

// defaultTheme
import themes from './themes';

import Router from './router';
import { refreshAccessToken } from './pages/Auth/store/extra_reducers';

function App() {
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_API_KeY,
      version: "weekly",
      libraries: ["places"]
    });

    loader.importLibrary('places')

    // Call refreshAccessToken on mount
    const refreshToken = async () => {
      try {
        const token = await refreshAccessToken(); // Assuming refreshAccessToken is working as intended
        console.log('Access token refreshed!');
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    refreshToken();
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Router />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App