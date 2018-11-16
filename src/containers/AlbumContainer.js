import { compose, lifecycle, withProps } from 'recompose';
import { navigate } from 'gatsby';
import * as R from 'ramda';
import Album from '../components/Album';
import { getAxiosInstance, axiosErrorHandler } from '../util';
import loadingSpinner from '../hoc/loadingHoc';

const sizeNames = ['xlarge', 'large', 'medium', 'small'];
const sizeWidth = ['1600w', '1024w', '800w', '500w'];

const getSrcSetArray = R.pipe(
  R.prop('image'),
  R.props(sizeNames),
  R.map(R.prop('url')),
  R.zip(sizeWidth),
  R.map(R.reverse),
  R.map(R.join(' ')),
);

const getSrc = R.path(['image', 'small', 'url']);
const getW = R.path(['image', 'dimensions', 'width']);
const getH = R.path(['image', 'dimensions', 'height']);

const getImageTitle = R.pathOr('', ['imageTitle', 0, 'text']);

const mapPhoto = R.applySpec({
  caption: getImageTitle,
  src: getSrc,
  width: getW,
  height: getH,
  srcSet: getSrcSetArray,
  sizes: R.always('(min-width: 1400px) 499px, 100vw'),
});

const parseAlbum = R.applySpec({
  photos: R.pipe(
    R.prop('images'),
    R.map(mapPhoto),
  ),
  title: R.propOr('--missing--', 'title'),
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
        .catch(error => axiosErrorHandler(error));
    },
  }),
  withProps({
    onAll: () => navigate('/jasenet/albumit/'),
  }),
  loadingSpinner(({ loading }) => loading),
)(Album);
