import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { push } from 'gatsby';
import * as Reb from 'rebass';
import MailInputForm from '../components/MailInputForm';
import Layout from '../components/Layout';
import webAuth from '../util/auth';
import config from '../config';

const PropTypes = {};
const DefaultProps = {};

const Content = styled(Reb.Flex)`
  width: 100%;
`;
// 
const handleSubmit = (email, setSubmitting, setErrors) => {
  const url = `${config.EMAIL_VALIDATOR_URL}/verify/${encodeURIComponent(
    email,
  )}`;
  fetch(url, { mode: 'cors' })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Wrong status');
      }
      return res.json();
    })
    .then(({ valid }) => {
      console.log('valid', valid);
      if (!valid) {
        setErrors({
          email:
            'Kyseistä sähköpostiosoitetta ei ole käyttäjien listalla. Ota yhteyttä antti (a) tuomaala.fi',
        });
        setSubmitting(false);
        return;
      }
      webAuth.passwordlessStart(
        {
          connection: 'email',
          send: 'code',
          email,
        },
        (err, res) => {
          // eslint-disable-line
          setSubmitting(false);
          if (err) {
            console.log('Webauth error', err);
            setErrors({
              email: 'Lähetys epäonnistui, kokeile hetken päästä uudelleen',
            });
            return;
          }
          const urlSafeEmail = encodeURIComponent(email);
          push(`/varmistus?email=${urlSafeEmail}`);
        },
      );
    })
    .catch(error => {
      console.error(error);
      setErrors({
        email: 'Validointi epäonnistui. Kokeile hetken kuluttua uudelleen.',
      });
      setSubmitting(false);
    });
};

const LoginPage = () => (
  <Layout>
    <Content justifyContent="center" alignItems="center">
      <MailInputForm handleSubmit={handleSubmit} />
    </Content>
  </Layout>
);

LoginPage.propTypes = PropTypes;
LoginPage.defaultProps = DefaultProps;

export default LoginPage;
