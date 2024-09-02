import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

import NavigationScroll from './layout/NavigationScroll';

import { LoadScript } from '@react-google-maps/api';

// defaultTheme
import themes from './themes';

import Router from './router';
import { auth } from "./config/firebase"

import { getUserData } from './pages/Auth/Login/store/extra_reducers';

import { setIsLoading, setUser, clearUser } from './pages/Auth/Login/store';


const apiKey = import.meta.env.VITE_GOOGLE_API_KeY; // Replace with your API key
const libraries = ['places'];

function App() {
  const customization = useSelector((state) => state.customization);

    const dispatch = useDispatch();
  
    useEffect(() => {
      // Subscribe to Firebase Authentication state changes
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // console.log(user);
  
          try {
            dispatch(setIsLoading(true));
            const userData = await getUserData(user.uid);
            const data = {
              accessToken: user.accessToken,
              user: userData
            };
            // console.log(data);
            dispatch(setUser(data));
          } catch (e) {
            console.log(e);
            dispatch(clearUser());
          }
          dispatch(setIsLoading(false));
        } else {
          // User is signed out
          // dispatch(clearUser());
        }
      });
    }, [dispatch]);


  return (
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
  )
}

export default App
