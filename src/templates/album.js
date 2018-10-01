import React from 'react';
import { object, func, shape, bool, number } from 'prop-types';
import { graphql } from 'gatsby';
import { Heading } from 'rebass';
import * as R from 'ramda';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { withReducer } from 'recompose';
import Layout from '../components/Layout';

const PropTypes = {
  data: object.isRequired, // eslint-disable-line
  dispatch: func.isRequired,
  lightBoxState: shape({
    isOpen: bool,
    currentImageIdx: number,
  }).isRequired,
};
const DefaultProps = {};

const randomHex = () => Math.floor(Math.random() * 16777215).toString(16);
const randoms = R.times(randomHex, 50);
console.log('randoms', randoms);

const srcSetArray = (image) => [
  `${image.xlarge.url} 1600w`,
  `${image.large.url} 1024w`,
  `${image.medium.url} 800w`,
  `${image.small.url} 500w`,
];

const mapPhoto = (imageObj) => ({
  caption: imageObj.imagetitle.text,
  src: imageObj.image.small.url,
  width: imageObj.image.dimensions.width,
  height: imageObj.image.dimensions.height,
  srcSet: srcSetArray(imageObj.image),
  sizes: '(min-width: 1400px) 499px, 100vw',

});

const parseAlbum = prismicAlbum => ({
  id: prismicAlbum.id,
  photos: R.map(mapPhoto, prismicAlbum.data.images),
  title: prismicAlbum.data.albumtitle.text,
});

const GalleryTemplate = props => {
  const {
    data: { prismicAlbum },
    lightBoxState,
    dispatch,
  } = props;

  const album = parseAlbum(prismicAlbum);

  return (
    <Layout>
      <Heading textAlign="center" fontSize={[2, 2, 3, 4, 5]}>
        {album.title}
      </Heading>
      <Gallery
        photos={album.photos}
        onClick={(event, obj) =>
          dispatch({ type: 'open', imageIdx: obj.index })
        }
      />
      <Lightbox
        width={1600}
        images={album.photos}
        onClose={() => dispatch({ type: 'close' })}
        onClickPrev={() => dispatch({ type: 'prev' })}
        onClickNext={() => dispatch({ type: 'next' })}
        currentImage={lightBoxState.currentImageIdx}
        isOpen={lightBoxState.isOpen}
      />
    </Layout>
  );
};

GalleryTemplate.propTypes = PropTypes;
GalleryTemplate.defaultProps = DefaultProps;

const enhance = withReducer(
  'lightBoxState',
  'dispatch',
  (state, action) => {
    switch (action.type) {
      case 'open':
        return {
          ...state,
          isOpen: true,
          currentImageIdx: action.imageIdx,
        };
      case 'close':
        return {
          ...state,
          isOpen: false,
          currentImageIdx: 0,
        };
      case 'prev':
        return {
          ...state,
          currentImageIdx: state.currentImageIdx - 1,
        };
      case 'next':
        return {
          ...state,
          currentImageIdx: state.currentImageIdx + 1,
        };

      default:
        return state;
    }
  },
  {
    isOpen: false,
    currentImageIdx: 0,
  },
);

export default enhance(GalleryTemplate);

export const query = graphql`
  query GetAlbum($slug: String!) {
    prismicAlbum(uid: { eq: $slug }) {
      id
      uid
      data {
        albumtitle {
          text
        }
        images {
          imagetitle {
            text
          }
          image {
            dimensions {
              width
              height
            }
            small {
              url
            }
            medium {
              url
            }
            large {
              url
            }
            xlarge {
              url
            }
          }
        }
      }
    }
  }
`;
