import React from 'react';
import { compose, lifecycle, renderComponent, branch } from 'recompose';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import * as R from 'ramda';
import { toast } from 'react-toastify';
import Album from '../components/Album';
import { getAxiosInstance } from '../util';

const srcSetArray = image => [
  `${image.xlarge.url} 1600w`,
  `${image.large.url} 1024w`,
  `${image.medium.url} 800w`,
  `${image.small.url} 500w`,
];

const LoadWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const mapPhoto = imageObj => ({
  caption: 'cap', // imageObj.imagetitle.text,
  src: imageObj.image.small.url,
  width: imageObj.image.dimensions.width,
  height: imageObj.image.dimensions.height,
  srcSet: srcSetArray(imageObj.image),
  sizes: '(min-width: 1400px) 499px, 100vw',
});

const parseAlbum = a => ({
  photos: R.map(mapPhoto, a.images),
  title: a.title,
});

export default compose(
  lifecycle({
    state: { loading: true },
    componentDidMount() {
      const axios = getAxiosInstance(`albums/${this.props.uid}`);
      axios
        .get()
        .then(result => {
          const { data } = result;
          const album = parseAlbum(data);
          this.setState({ album, loading: false });
        })
        .catch(error => {
          console.log('error', error);

          if (error.response) {
            const { status } = error.response;
            if (status === 401) {
              toast.warn('Kirjaudu uudelleen sisään');
              navigate('/jasenet/login');
            }
          } else {
            toast.error('Palvelussa ruuhkaa, yritä myöhemmin uudelleen');
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
  }),
  branch(
    ({ loading }) => loading,
    renderComponent(() => (
      <LoadWrap>
        <Spinner name="ball-scale-ripple" />
      </LoadWrap>
    )),
  ),
)(Album);
