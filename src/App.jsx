// import { Suspense } from "react";
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Router from './router/Router';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

function App() {
    const customization = useSelector((state) => state.customization);
  
  return (
    <>
      {/* <Suspense fallback={null}> */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Router />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
      {/* </Suspense> */}
    </>
  );
  }
  
  export default App
  