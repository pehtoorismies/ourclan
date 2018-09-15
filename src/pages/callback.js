import React from 'react';
import { string, shape } from 'prop-types';
import { push } from 'gatsby';
import qs from 'query-string';
import * as Reb from 'rebass';
import Layout from '../components/Layout';
import { FormBox } from '../components/Elements';
import config from '../config';
import webAuth from '../util/auth';

const PropTypes = {
  location: shape({
    hash: string,
  }).isRequired,
};
const DefaultProps = {};

const getErrorText = () => (
  <React.Fragment>
    <Reb.Text textAlign="center" lineHeight={2}>
      Olethan varma, että sähköpostiosoitteesi on lisätty käyttäjiin?
      Tarkistitko, että tunnistaumiskoodi on oikein?
    </Reb.Text>
    <Reb.Text m={3} textAlign="center">
      Lähetä pyyntö antti (a) tuomaala.fi
    </Reb.Text>
    <Reb.Button onClick={() => push('/kirjaudu')}>
      TAKAISIN KIRJAUTUMISEEN
    </Reb.Button>
  </React.Fragment>
);

const CallbackPage = props => {
  const {
    location: { hash },
  } = props;

  const { access_token: accessToken, error } = qs.parse(hash);

  /*
  Some of your code references “browser globals” like window or document.
  If this is your problem you should see an error above like “window is not defined”.
  To fix this, find the offending code and either a) check before calling the code if window is defined so the code doesn’t run while gatsby is building
  */
  if (typeof window !== 'undefined') { // 
    webAuth.parseHash({ hash }, (err1, authResult) => {
      if (err1) {
        return console.log(err1);
      }
      console.log('authResult', authResult);
      webAuth.client.userInfo(authResult.accessToken, (err2, user) => {
        if (err2) {
          return console.log(err2);
        }
        console.log('user', user);
        // DO something
  
  
      });
    });
  }
  



  // if (!error) {
  //   localStorage.setItem(config.ACCESS_TOKEN, accessToken);
  // }

  const heading = error
    ? 'Kirjautuminen epäonnistui'
    : 'Olen kirjautunut sisään';
  const msg = error ? getErrorText() : null;

  return (
    <Layout>
      <Reb.Flex justifyContent="center">
        <FormBox
          bg="white"
          p={4}
          m={4}
          justifyContent="space-around"
          flexDirection="column"
          alignItems="center"
        >
          <Reb.Heading
            fontWeight="bold"
            fontSize={[2, 3]}
            my={2}
            textAlign="center"
          >
            {heading}
          </Reb.Heading>
          {msg}
        </FormBox>
      </Reb.Flex>
    </Layout>
  );
};

CallbackPage.propTypes = PropTypes;
CallbackPage.defaultProps = DefaultProps;

export default CallbackPage;
