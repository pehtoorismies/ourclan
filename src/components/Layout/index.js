import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
import { StaticQuery, graphql } from 'gatsby';
import * as Reb from 'rebass';
import Header from '../Header';
import config from '../../config';

const Content = styled(Reb.Flex)`
  max-width: 1200px;
  margin: 0 auto;
`;
const FullHeight = styled.div`
  min-height: calc(100vh - ${config.HEADER_HEIGHT}px);
`;

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
`;
/* eslint-enable */

const Layout = ({ children, data }) => (
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
      <Fragment>
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

        <Reb.Provider theme={config.THEME}>
          <Content flexDirection="column" justifyContent="center" bg="white">
            <Header
              siteTitle={data.site.siteMetadata.title}
              height={config.HEADER_HEIGHT}
              menuItems={config.MENU_ITEMS}
            />
            <FullHeight>{children}</FullHeight>
          </Content>
        </Reb.Provider>
      </Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // fullHeight: PropTypes.bool,
};
Layout.defaultProps = {
  // fullHeight: false,
};

export default Layout;
