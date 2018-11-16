import { compose, lifecycle, withProps } from 'recompose';
import { navigate } from 'gatsby';
import * as R from 'ramda';
import Albums from '../components/Albums';
import { getAxiosInstance, axiosErrorHandler } from '../util';
import loadingSpinner from '../hoc/loadingHoc';

const albumsMapper = a => ({
  id: a.id,
  imageUrl: a.mainImage.small.url,
  slug: a.uid,
  title: a.title,
  order: a.order || 1000,
});

const parseAlbums = R.pipe(
  R.map(albumsMapper),
  R.sortBy(R.prop('order')),
);

export default compose(
  lifecycle({
    state: { loading: true },
    componentDidMount() {
      const axios = getAxiosInstance('albums');
      axios
        .get()
        .then(result => {
          const { data } = result;
          const albums = parseAlbums(data);
          this.setState({ albums, loading: false });
        })
        .catch(error => {
          this.setState({ loading: false });
          axiosErrorHandler(error);
        });
    },
  }),
  withProps({
    onSelect: uid => navigate(`/jasenet/albumit/${uid}`),
  }),
  loadingSpinner(({ loading }) => loading),
)(Albums);
