import React, { Fragment } from 'react';
import { string, node, arrayOf, object } from 'prop-types';
import styled from 'styled-components';
import * as Reb from 'rebass';
import Header from '../Header';
import config from '../../config';

const Content = styled(Reb.Flex)`
  max-width: 1600px;
  margin: 0 auto;
`;
const FullHeight = styled.div`
  min-height: calc(100vh - ${config.HEADER_HEIGHT}px);
`;

const Layout = ({ children, helmet, siteTitle, menuItems }) => (
  <Fragment>
    {helmet}
    <Reb.Provider theme={config.THEME}>
      <Content flexDirection="column" justifyContent="center" bg="white">
        <Header
          siteTitle={siteTitle}
          height={config.HEADER_HEIGHT}
          menuItems={menuItems}
        />
        <FullHeight>{children}</FullHeight>
      </Content>
    </Reb.Provider>
  </Fragment>
);

Layout.propTypes = {
  children: node.isRequired,
  helmet: node,
  siteTitle: string,
  menuItems: arrayOf(object),
};
Layout.defaultProps = {
  helmet: null,
  siteTitle: 'Tuomaala.fi',
  menuItems: [].ma,
};

export default Layout;
