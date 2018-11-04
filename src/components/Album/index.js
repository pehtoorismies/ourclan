import React from 'react';
import { arrayOf, func, shape, bool, number, string } from 'prop-types';
import { Heading } from 'rebass';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { withReducer } from 'recompose';

const PropTypes = {
  album: shape({
    caption: string,
    width: number,
    height: number,
    srcSet: arrayOf(string),
  }).isRequired,
  dispatch: func.isRequired,
  lightBoxState: shape({
    isOpen: bool,
    currentImageIdx: number,
  }).isRequired,
};
const DefaultProps = {
};

const GalleryTemplate = props => {
  const {
    album,
    lightBoxState,
    dispatch,
  } = props;

  return (
    <React.Fragment>
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
