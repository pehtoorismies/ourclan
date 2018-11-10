import React from 'react';
import { Router } from '@reach/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AlbumsContainer from '../containers/AlbumsContainer';
import AlbumContainer from '../containers/AlbumContainer';
import MembersMainContainer from '../containers/MembersMainContainer';
import LayoutContainer from '../containers/LayoutContainer';
import LoginContainer from '../containers/LoginContainer';
import PrivateRoute from '../components/PrivateRoute';

const App = () => (
  <LayoutContainer>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <Router>
      <PrivateRoute path="/jasenet/albumit" component={AlbumsContainer} />
      <PrivateRoute path="/jasenet/albumit/:uid" component={AlbumContainer} />
      <PrivateRoute path="/jasenet" component={MembersMainContainer} />
      <LoginContainer path="/jasenet/kirjaudu" />
    </Router>
  </LayoutContainer>
);

export default App;
