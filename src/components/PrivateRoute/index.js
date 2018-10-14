import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../../util';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/jasenet/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/jasenet/login`);
    return null;
  }

  return <Component {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line
};

export default PrivateRoute;
