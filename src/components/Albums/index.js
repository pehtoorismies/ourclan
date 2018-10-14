import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const PropTypes = {
};
const DefaultProps = {};

const Wrapper = styled.div`
`;

const Albums = (props) => {
  const {
  } = props;
  return (
    <Wrapper>
      Albums
    </Wrapper>
  );
};

Albums.propTypes = PropTypes;
Albums.defaultProps = DefaultProps;

export default Albums;
