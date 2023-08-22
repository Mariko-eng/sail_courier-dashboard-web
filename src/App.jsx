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

const apiKey = 'AIzaSyB9j-AnmMNOwRK6OHLTzKmhvz4p5xMWLpw'; // Replace with your API key
const libraries = ['places'];

function App() {
  const customization = useSelector((state) => state.customization);

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
  
  export default App
  