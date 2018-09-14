import React from 'react';
import { bool } from 'prop-types';
import styled, { css } from 'styled-components';

const PropTypes = {
  isOpen: bool.isRequired,
};
const DefaultProps = {};

const rotate1st = css`
  /* transform: rotate(-45deg) translate(-9px, 6px); */
  transform: rotate(-45deg) translate(-7px, 7px);
`;
const hide2nd = css`
  opacity: 0;
`;
const rotate3rd = css`
  transform: rotate(45deg) translate(-8px, -8px);
`;

const Beef = styled('div')`
  width: 35px;
  height: 5px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
`;

const Hamburger = ({ isOpen }) => (
  <div>
    <Beef className={isOpen ? rotate1st : null} />
    <Beef className={isOpen ? hide2nd : null} />
    <Beef className={isOpen ? rotate3rd : null} />
  </div>
);

Hamburger.propTypes = PropTypes;
Hamburger.defaultProps = DefaultProps;

export default Hamburger;
