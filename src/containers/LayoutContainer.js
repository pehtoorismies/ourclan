import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { injectGlobal } from 'styled-components';
import { navigate } from '@reach/router';
import reset from 'styled-reset';
import * as R from 'ramda';
import { node } from 'prop-types';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { isLoggedIn, removeToken } from '../util';

const defaultHelmet = (
  <StaticQuery
    query={graphql`
      query SiteTitleQueryOld {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: 'Suku Tuomaala valokuvia ja sukupuu',
          },
          { name: 'keywords', content: 'tuomaala, sukupuu' },
        ]}
      >
        <html lang="en" />
      </Helmet>
    )}
  />
);

const PropTypes = {
  helmet: node,
  children: node.isRequired,
};
const DefaultProps = {
  helmet: defaultHelmet,
};

const downColor = '#d3daea';
const upColor = '#7fa9bc';

/* eslint-disable */
injectGlobal`
  ${reset}
  * { box-sizing: border-box; }
  
  body {
    background: ${downColor};
    background: linear-gradient(to bottom, ${upColor} 0%,${downColor} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=${upColor}, endColorstr=${downColor},GradientType=0 );
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  strong {
    font-weight: 800;
  }
  p {
    margin-top: 10px;
  }
`;
/* eslint-enable */

const MENU_ITEMS = [
  {
    title: 'Jäsenet',
    action: () => {
      navigate('/jasenet');
    },
    id: 1,
    membersOnly: false,
  },
  {
    title: 'Valokuvat',
    action: () => {
      navigate('/jasenet/albumit');
    },
    id: 2,
    membersOnly: true,
  },
  {
    title: 'Kirjaudu ulos',
    action: () => {
      removeToken();
      navigate('/');
    },
    id: 3,
    membersOnly: true,
  },
];

const filterMenu = loggedIn => ({ membersOnly }) => loggedIn === membersOnly;

const LayoutContainer = ({ helmet, children }) => {
  const loggedIn = isLoggedIn();
  const menuItems = R.filter(filterMenu(loggedIn), MENU_ITEMS);
  return (
    <Layout menuItems={menuItems} helmet={helmet}>
      {children}
    </Layout>
  );
};

LayoutContainer.propTypes = PropTypes;
LayoutContainer.defaultProps = DefaultProps;

export default LayoutContainer;
