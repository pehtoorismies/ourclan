import React from 'react';
import { number, bool, shape, arrayOf, func, string } from 'prop-types';
import * as Reb from 'rebass';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { withState } from 'recompose';
import * as R from 'ramda';
import config from '../../config';
import Hamburger from '../Hamburger';
import PopupLink from './PopupLink';

const PropTypes = {
  height: number,
  menuItems: arrayOf(
    shape({
      title: string,
      link: string,
      id: number,
      private: bool,
    }),
  ),
  isMenuOpen: bool.isRequired,
  setMenuOpen: func.isRequired,
  authToken: string,
};
const DefaultProps = {
  height: 200,
  menuItems: [],
  authToken: null,
};

const Wrapper = styled(Reb.Toolbar)`
  height: ${props => props.height}px;
`;

const OverlayMenu = styled(Reb.Fixed)`
  width: 100vw;
  height: calc(100vh - 80px);
  transition: 0.4s;
  opacity: 0;
  transition-timing-function: ease-in;
  opacity: ${props => (props.menuOpen ? '1' : '0')};
  pointer-events: ${props => (props.menuOpen ? 'auto' : 'none')};
`;

const NavLinkMobHidden = styled(Reb.NavLink)`
  @media screen and (min-width: 40em) {
    display: none;
  }
`;
const NavLinkDesktop = styled(Reb.NavLink)`
  @media screen and (max-width: 40em) {
    display: none;
  }
`;

const renderPopupMenuItem = mi => (
  <PopupLink key={mi.id}>{mi.title} </PopupLink>
);
const renderMenuItem = firstId => mi => {
  const ml = mi.id === firstId ? 'auto' : null;
  const props = {
    key: mi.id,
    onClick: () => navigate(mi.link),
    ml,
  };

  return <NavLinkDesktop {...props}>{mi.title}</NavLinkDesktop>;
};

const isHidden = authToken => mi => {
  if (mi.private) {
    return false;
  }
  if (mi.private && authToken) {
    return false;
  }
  return true;
};

const get1stId = R.pipe(
  R.head,
  R.prop('id'),
);
const mapIndexed = R.addIndex(R.map);

const Header = props => {
  const { height, isMenuOpen, setMenuOpen, menuItems, authToken } = props;
  const getShownItems = R.pipe(
    R.filter(isHidden(authToken)),
    mapIndexed((x, idx) => ({
      ...x,
      id: idx,
    })),
  );

  const items = getShownItems(menuItems);
  const firstId = get1stId(items);

  return (
    <Wrapper bg="blue" color="palewhite" py={3} height={height}>
      <OverlayMenu
        p={3}
        bg="black"
        zIndex={1}
        right={0}
        top={config.HEADER_HEIGHT}
        menuOpen={isMenuOpen}
      >
        <Reb.Flex flexDirection="column" alignItems="center">
          {R.map(renderPopupMenuItem, items)}
        </Reb.Flex>
      </OverlayMenu>
      <Reb.NavLink onClick={() => push('/')}>Tuomaala.fi</Reb.NavLink>
      {R.map(renderMenuItem(firstId), items)}
      <NavLinkMobHidden ml="auto" onClick={() => setMenuOpen(!isMenuOpen)}>
        <Hamburger isOpen={isMenuOpen} />
      </NavLinkMobHidden>
    </Wrapper>
  );
};

Header.propTypes = PropTypes;
Header.defaultProps = DefaultProps;

const menuEnhance = withState('isMenuOpen', 'setMenuOpen', false);

export default menuEnhance(Header);
