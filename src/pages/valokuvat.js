import React from 'react';
import { graphql } from 'gatsby';
import { push } from 'gatsby-link';
import * as R from 'ramda';
import styled from 'styled-components';
import { Box, Text, Heading, BackgroundImage, Flex } from 'rebass';
import Layout from '../components/Layout';

// const authImage = (url) => {
//   const token = localStorage.getItem('heritageAuthToken');
//   if (token) {
//     return `${url}?token=${token}`;
//   }
//   return url;
// }

const getBgImg = bgImgUrl => `url(${bgImgUrl})`;

const GalleryBox = Flex.extend`
  height: 300px;
  width: 300px;
  background: ${props => getBgImg(props.bgImgUrl)};
  background-size: cover;
  cursor: pointer;
`;

const toAlbumObj = node => ({
  id: R.prop('id', node),
  slug: R.prop('uid', node),
  image: {
    url: R.path(['data', 'image', 'medium', 'url'], node),
    title: R.path(['data', 'title', 'text'], node),
  },
});

const albumsFromData = R.pipe(
  R.path(['allPrismicAlbum', 'edges']),
  R.map(R.prop('node')),
  R.map(toAlbumObj),
);

const renderAlbum = g => (
  <GalleryBox
    onClick={() => push(`/album/${g.slug}`)}
    key={g.id}
    m={1}
    color="white"
    width={1}
    alignItems="center"
    justifyContent="flex-end"
    bg="red"
    bgImgUrl={g.image.url}
  >
    <Heading fontSize={3}>{g.title}</Heading>
  </GalleryBox>
);
const PhotoPage = ({ data }) => {
  const albums = albumsFromData(data);
  console.log('albums', albums);
  return (
    <Layout>
      <Box py={3}>
        <Text
          color="black"
          textAlign="center"
          fontSize={2}
          fontWeight="bold"
          p={3}
        >
          Valokuvat
        </Text>
      </Box>
      <Flex flexWrap="wrap">
        {R.map(renderAlbum, albums)}
      </Flex>
    </Layout>
  );
};

export default PhotoPage;

export const query = graphql`
  query PrismicAlbumQuery {
    allPrismicAlbum {
      edges {
        node {
          id
          uid
          type
          data {
            image {
              medium {
                url
              }
            }
            title {
              text
            }
          }
        }
      }
    }
  }
`;
