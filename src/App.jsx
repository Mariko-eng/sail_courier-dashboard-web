import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import { getUserData } from './pages/Auth/Login/store/extra_reducers';

import { setIsLoading, setUser, clearUser } from './pages/Auth/Login/store';

// routing
import Router from './Router';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

import { LoadScript } from '@react-google-maps/api';

// import { useNavigate, useLocation } from 'react-router-dom';

const apiKey = 'AIzaSyB9j-AnmMNOwRK6OHLTzKmhvz4p5xMWLpw'; // Replace with your API key
const libraries = ['places'];

function App() {
  const customization = useSelector((state) => state.customization);
  // const store = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  // const location = useLocation();

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

  // useEffect(() => {
  //   if (store.isLoading === false) {
  //     if (Object.keys(store.user).length === 0) {
  //       if (location.pathname !== '/login') {
  //         navigate('/login');
  //       }
  //     }
  //   }
  // }, [store, location.pathname, navigate]);

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
