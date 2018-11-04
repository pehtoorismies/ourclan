import React from 'react';
import { Router } from '@reach/router';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.min.css';
import AlbumsContainer from '../containers/AlbumsContainer';
import Layout from '../components/Layout';
import LoginContainer from '../containers/LoginContainer';
import PrivateRoute from '../components/PrivateRoute';


const Main = () => <div>Nothing here</div>;

const App = () => (
  <Layout>
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
      <PrivateRoute path="/jasenet/albumi" component={AlbumsContainer} />
      <PrivateRoute path="/jasenet" component={Main} />
      <LoginContainer path="/jasenet/kirjaudu" />
    </Router>
  </Layout>
);

export default App;
