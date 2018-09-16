import React from 'react';
import { graphql } from 'gatsby';
import { push } from 'gatsby-link';
import * as R from 'ramda';
import styled from 'styled-components';
import { Box, Text, Heading, Flex } from 'rebass';
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
  width: 500px;
  background: ${props => getBgImg(props.bgImgUrl)};
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

const toAlbumObj = node => ({
  id: R.prop('id', node),
  slug: R.prop('uid', node),
  title: R.path(['data', 'albumtitle', 'text'], node),
  imageUrl: R.path(['data', 'mainimage', 'small', 'url'], node),
});

const albumsFromData = R.pipe(
  R.path(['allPrismicAlbum', 'edges']),
  R.map(R.prop('node')),
  R.map(toAlbumObj),
);

const renderAlbum = a => (
  <GalleryBox
    onClick={() => push(`/album/${a.slug}`)}
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
const PhotoPage = ({ data }) => {
  const albums = albumsFromData(data);

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
      <Flex flexWrap="wrap">{R.map(renderAlbum, albums)}</Flex>
    </Layout>
  );
};

export default PhotoPage;

export const query = graphql`
  query allPrismicAlbumsQuery {
    allPrismicAlbum {
      edges {
        node {
          id
          uid
          data {
            albumtitle {
              text
            }
            mainimage {
              small {
                url
              }
            }
            images {
              imagetitle {
                text
              }
            }
          }
        }
      }
    }
  }
`;
