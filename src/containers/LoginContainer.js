import { compose, withProps } from 'recompose';
import { navigate } from 'gatsby';
import axios from 'axios';
import config from '../config';
import LoginForm from '../components/LoginForm';
import { saveToken } from '../util';

const handleSubmit = (password, setSubmitting, setErrors) => {
  axios
    .post(`${config.API_URL}/login`, {
      password,
    })
    .then(result => {
      setSubmitting(false);
      const { data } = result;
      if (result.status === 200) {
        saveToken(data);
        navigate(`/jasenet/albumit`);
      } else {
        console.error(result);
        setErrors({
          password: 'Palvelussa on vikaa. Yritä myöhemmin uudelleen.',
        });
      }
    })
    .catch(error => {
      setSubmitting(false);
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          setErrors({
            password: 'Väärä salasana',
          });
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        setErrors({
          password: 'Palvelussa on vikaa. Yritä myöhemmin uudelleen.',
        });
      }
    });
};

export default compose(
  withProps({
    handleSubmit,
  }),
)(LoginForm);
