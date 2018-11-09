import { compose, withProps } from 'recompose';
import { navigate } from 'gatsby';
import MembersMain from '../components/MembersMain';

export default compose(
  withProps({
    onGotoAlbums: () => navigate('/jasenet/albumit/'),
  }),
)(MembersMain);
