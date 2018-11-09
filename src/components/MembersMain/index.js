import React from 'react';
import { func } from 'prop-types';
import { Flex, Button } from 'rebass';

const PropTypes = {
  onGotoAlbums: func.isRequired,
};
const DefaultProps = {};

const MembersMain = props => {
  const { onGotoAlbums } = props;

  return (
    <Flex alignItems="center" justifyContent="center" m={3} p={3}>
      <Button onClick={onGotoAlbums}>Selaa valokuvia</Button>
    </Flex>
  );
};

MembersMain.propTypes = PropTypes;
MembersMain.defaultProps = DefaultProps;

export default MembersMain;
