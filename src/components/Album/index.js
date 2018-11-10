import React from 'react';
import { arrayOf, func, shape, bool, number, string } from 'prop-types';
import { Heading, Button } from 'rebass';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { withReducer } from 'recompose';

const PropTypes = {
  album: shape({
    title: string,
    photos: arrayOf(
      shape({
        caption: string,
        src: string,
        width: number,
        height: number,
        srcSet: arrayOf(shape({})),
        sizes: string,
      }),
    ),
  }).isRequired,
  dispatch: func.isRequired,
  lightBoxState: shape({
    isOpen: bool,
    currentImageIdx: number,
  }).isRequired,
  onAll: func.isRequired,
};
const DefaultProps = {};

const GalleryTemplate = props => {
  const { album, lightBoxState, dispatch, onAll } = props;

  const backButton = (
    <Button m={3} onClick={onAll} alignSelf="start">
      Takaisin albumeihin
    </Button>
  );

  return (
    <React.Fragment>
      {backButton}

      <Heading m={3} textAlign="center" fontSize={[2, 2, 3, 4, 5]}>
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
      {backButton}
    </React.Fragment>
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
