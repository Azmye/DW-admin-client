import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import React, { useContext, useEffect, useState } from 'react';
import Auth from './pages/Auth';
import { DropdownContextProvider } from './context/DropdownContext';
import Navbar from './components/header/Navbar';
import Shows from './pages/Shows';
import Movies from './pages/Movies';
import MovieForm from './pages/MovieForm';
import ShowForm from './pages/ShowForm';
import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from './Routes/PrivateRoutes';
import { API, setAuthToken } from './config/Api';
import { UserContext } from './context/UserContext';

const App = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (userState.isLogin === false) {
        navigate('/auth');
      }
    }
  }, [isLoading]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      let payload = response.data.data;

      payload.token = localStorage.token;

      userDispatch({
        type: 'USER_SUCCESS',
        payload,
      });

      setIsLoading(false);
    } catch (err) {
      console.log('check user failed : ', err);
      userDispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <DropdownContextProvider>
        <Navbar />
      </DropdownContextProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<PrivateRouteLogin />}>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/movie-form-update/:id" element={<MovieForm />} />
            <Route path="/movie-form-create" element={<MovieForm isCreateMovie={true} />} />
            <Route path="/show-form-update/:id" element={<ShowForm />} />
            <Route path="/show-form-create" element={<ShowForm isCreateMovie={true} />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
