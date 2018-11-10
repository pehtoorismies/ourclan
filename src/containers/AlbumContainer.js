import { compose, lifecycle, withProps } from 'recompose';
import { navigate } from 'gatsby';
import * as R from 'ramda';
import { toast } from 'react-toastify';
import Album from '../components/Album';
import { getAxiosInstance } from '../util';
import loadingSpinner from '../hoc/loadingHoc';

const srcSetArray = image => [
  `${image.xlarge.url} 1600w`,
  `${image.large.url} 1024w`,
  `${image.medium.url} 800w`,
  `${image.small.url} 500w`,
];

const mapPhoto = ({ image, imagetitle }) => ({
  caption: imagetitle[0].text,
  src: image.small.url,
  width: image.dimensions.width,
  height: image.dimensions.height,
  srcSet: srcSetArray(image),
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
  withProps({
    onAll: () => navigate('/jasenet/albumit/'),
  }),
  loadingSpinner(({ loading }) => loading),
)(Album);
