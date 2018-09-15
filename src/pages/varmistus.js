import React from 'react';
import { string, shape } from 'prop-types';
import qs from 'query-string';
import styled from 'styled-components';
import * as Reb from 'rebass';
import Layout from '../components/Layout';
import VerifyTokenForm from '../components/VerifyTokenForm';
import webAuth from '../util/auth';

const PropTypes = {
  location: shape({
    search: string,
  }).isRequired,
};
const DefaultProps = {};

const Content = styled(Reb.Flex)`
  width: 100%;
`;

const handleSubmit = (email, verificationCode, setSubmitting, setErrors) => {
  console.log('email', email);
  console.log('verificationCode', verificationCode);
  webAuth.passwordlessLogin(
    {
      connection: 'email',
      email,
      verificationCode,
    },
    (err, res) => {
      setSubmitting(false);
      if (err) {
        console.log('err', err);
        setErrors({ token: 'Väärä tunnistaumiskoodi' });
        return;
      }
      console.log('success', res);
    },
  );
};

const VerifyPage = props => {
  const {
    location: { search },
  } = props;

  const { email } = qs.parse(search);

  return (
    <Layout>
      <Content justifyContent="center" alignItems="center">
        <VerifyTokenForm submitHandler={handleSubmit} email={email} />
      </Content>
    </Layout>
  );
};

VerifyPage.propTypes = PropTypes;
VerifyPage.defaultProps = DefaultProps;

export default VerifyPage;
