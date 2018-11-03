import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { push } from 'gatsby';
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
  const url = `${config.API_URL}/login/`;
  console.log('url', url);
  fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(password)
  })
    .then(res => {
      if (res.status !== 200) {
        setErrors({
          password:
            'Väärä salasana',
        });
        setSubmitting(false);
      }
      return null;
    })
    .then((res) => {
      if (!res) {
        return;
      }
      
      setSubmitting(false);
      // push(`/varmistus?email=${urlSafeEmail}`);
    })
    .catch(error => {
      console.error(error);
      setErrors({
        password: 'Palvelussa on vikaa. Yritä myöhemmin uudelleen.',
      });
      setSubmitting(false);
    });
};

const LoginPage = () => (
  <Layout>
    <Content justifyContent="center" alignItems="center">
      <LoginForm handleSubmit={handleSubmit} />
    </Content>
  </Layout>
);

LoginPage.propTypes = PropTypes;
LoginPage.defaultProps = DefaultProps;

export default LoginPage;
