import { compose, lifecycle } from 'recompose';
import { navigate } from 'gatsby';
import { toast } from 'react-toastify';
import * as R from 'ramda';
import Albums from '../components/Albums';
import { getAxiosInstance } from '../util';

const albumsMapper = a => ({
  id: a.id,
  imageUrl: a.mainImage.small.url,
  slug: a.uid,
  title: a.title,
});

export default compose(
  lifecycle({
    componentDidMount() {
      const axios = getAxiosInstance('albums');
      axios
        .get()
        .then(result => {
          const { data } = result;
          const albums = R.map(albumsMapper, data);
          this.setState({ albums });
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
)(Albums);
