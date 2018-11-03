import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { push } from 'gatsby';
import axios from 'axios';
import * as Reb from 'rebass';
import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import config from '../config';

const PropTypes = {};
const DefaultProps = {};

const Content = styled(Reb.Flex)`
  width: 100%;
`;

const handleSubmit = (password, setSubmitting, setErrors) => {
  const url = `${config.API_URL}/login`;
  console.log('url:', url);
  console.log('password:', password);
  console.log('JSON.stringify(password)', JSON.stringify({ password }));
  axios
    .post(url, {
      password,
    })
    .then(res => {
      setSubmitting(false);

      if (res.status === 200) {
        console.log('res', res);
        // push(`/varmistus?email=${urlSafeEmail}`);
      }
    })
    .catch(error => {
      setSubmitting(false);
      if (error.response) {
        const { status } = error.response;
        console.log('error.response.status', error.response.status);
        console.log('statuts', status);
        if (status === 401) {
          setErrors({
            password: 'Väärä salasana',
          });
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setErrors({
          password: 'Palvelussa on vikaa. Yritä myöhemmin uudelleen.',
        });
      }
    });
};

const LoginPage = () => (
  <Content justifyContent="center" alignItems="center">
    <LoginForm handleSubmit={handleSubmit} />
  </Content>
);

LoginPage.propTypes = PropTypes;
LoginPage.defaultProps = DefaultProps;

export default LoginPage;
