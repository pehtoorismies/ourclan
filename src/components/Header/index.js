import React from 'react';
import { number, bool, shape, arrayOf, func, string } from 'prop-types';
import * as Reb from 'rebass';
import { navigate } from 'gatsby';
import styled from 'styled-components';
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
  siteTitle: string,
};
const DefaultProps = {
  height: 200,
  menuItems: [],
  siteTitle: '',
};

const Wrapper = styled(Reb.Toolbar)`
  height: ${props => props.height}px;
`;

const OverlayMenu = styled(Reb.Fixed)`
  width: 100vw;
  height: calc(100vh - 80px);
  transition: opacity 0.4s ease-in;
  opacity: 0;
  opacity: ${props => (props.menuOpen ? '1' : '0')};
  pointer-events: ${props => (props.menuOpen ? 'auto' : 'none')};
  @media screen and (min-width: 40em) {
    display: none;
  }
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
  <PopupLink key={mi.id} onClick={mi.action}>
    {mi.title}
  </PopupLink>
);
const renderMenuItem = firstId => mi => {
  const ml = mi.id === firstId ? 'auto' : null;
  const props = {
    key: mi.id,
    onClick: mi.action,
    ml,
  };

  return <NavLinkDesktop {...props}>{mi.title}</NavLinkDesktop>;
};

const get1stId = R.pipe(
  R.head,
  R.prop('id'),
);

const Header = props => {
  const { height, isMenuOpen, setMenuOpen, menuItems, siteTitle } = props;

  const firstId = get1stId(menuItems);

  return (
    <Wrapper
      bg="blue"
      color="palewhite"
      py={3}
      height={height}
      menuOpen={isMenuOpen}
    >
      <OverlayMenu
        id="overlay"
        p={3}
        bg="black"
        zIndex={1}
        right={0}
        top={config.HEADER_HEIGHT}
        menuOpen={isMenuOpen}
      >
        <Reb.Flex flexDirection="column" alignItems="center">
          {R.map(renderPopupMenuItem, menuItems)}
        </Reb.Flex>
      </OverlayMenu>
      <Reb.NavLink onClick={() => navigate('/')}>{siteTitle}</Reb.NavLink>
      {R.map(renderMenuItem(firstId), menuItems)}
      <NavLinkMobHidden ml="auto" onClick={() => setMenuOpen(!isMenuOpen)}>
        <Hamburger isOpen={isMenuOpen} />
      </NavLinkMobHidden>
    </Wrapper>
  );
};

Header.propTypes = PropTypes;
Header.defaultProps = DefaultProps;

export default Header;
