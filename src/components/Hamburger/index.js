import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';

const PropTypes = {
  isOpen: bool.isRequired,
};
const DefaultProps = {};

const getTransform = twist => {
  if (!twist) {
    return 'none';
  }
  if (twist === 'left') {
    return 'rotate(45deg) translate(-8px, -8px)';
  }
  return 'rotate(-45deg) translate(-7px, 7px)';
};

const Beef = styled('div')`
  width: 35px;
  height: 5px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => getTransform(props.transform)};
`;

const Hamburger = ({ isOpen }) => {
  const rTrans = isOpen ? 'right' : null;
  const lTrans = isOpen ? 'left' : null;
  return (
    <div>
      <Beef isVisible transform={rTrans} />
      <Beef isVisible={!isOpen} />
      <Beef isVisible transform={lTrans} />
    </div>
  );
};

Hamburger.propTypes = PropTypes;
Hamburger.defaultProps = DefaultProps;

export default Hamburger;
