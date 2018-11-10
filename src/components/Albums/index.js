import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import * as R from 'ramda';
import { Box, Text, Heading, Flex } from 'rebass';

const PropTypes = {
  albums: arrayOf(
    shape({
      id: string,
      imageUrl: string,
      slug: string,
      title: string,
    }),
  ),
  onSelect: func.isRequired,
};
const DefaultProps = {
  albums: [],
};

const GalleryBox = Flex.extend`
  height: 300px;
  width: 500px;
  background: url(${props => props.bgImgUrl});
  background-size: cover;
  user-select: none;
  cursor: pointer;
`;
const ShadowedHeading = Heading.extend`
  text-shadow: 2px 2px 6px #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
`;

const renderAlbum = onSelect => a => (
  <GalleryBox
    onClick={() => onSelect(a.slug)}
    key={a.id}
    m={1}
    color="white"
    width={1}
    alignItems="center"
    justifyContent="center"
    bg="red"
    bgImgUrl={a.imageUrl}
  >
    <ShadowedHeading fontSize={3}>{a.title}</ShadowedHeading>
  </GalleryBox>
);

const Albums = ({ albums, onSelect }) => (
  <React.Fragment>
    <Box py={3}>
      <Text
        color="black"
        textAlign="center"
        fontSize={2}
        fontWeight="bold"
        p={3}
      >
        Valokuva-albumit
      </Text>
    </Box>
    <Flex justifyContent="center" flexWrap="wrap">
      {R.map(renderAlbum(onSelect), albums)}
    </Flex>
  </React.Fragment>
);

Albums.propTypes = PropTypes;
Albums.defaultProps = DefaultProps;

export default Albums;
