import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components';
import { Box, Border, Text } from 'rebass';

const PropTypes = {
  children: node.isRequired,
};
const DefaultProps = {};

const PopupBox = styled(Box)`
  cursor: pointer;
  user-select: none;
  &:hover {
    background: white;
    color: black;
    };
  }
`;

const PopupLink = props => (
  <PopupBox width={1}>
    <Border border={0} borderBottom={1}>
      <Text textAlign="center" m={3} fontWeight="medium" fontSize={2}>
        {props.children}
      </Text>
    </Border>
  </PopupBox>
);

PopupLink.propTypes = PropTypes;
PopupLink.defaultProps = DefaultProps;

export default PopupLink;
