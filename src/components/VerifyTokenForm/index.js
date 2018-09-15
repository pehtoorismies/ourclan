import React from 'react';
import { bool, func, object, string } from 'prop-types';
import * as Reb from 'rebass';
import { withFormik } from 'formik';
import { FormBox } from '../Elements';

const PropTypes = {
  values: object.isRequired, // eslint-disable-line
  errors: object.isRequired, // eslint-disable-line
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  handleSubmit: func.isRequired,
  isSubmitting: bool.isRequired,
  email: string.isRequired,
};
const DefaultProps = {};

const VerifyForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  email,
}) => {
  const errorMsg = errors.token ? (
    <Reb.Text color="red" m={2}>
      Väärä koodi
    </Reb.Text>
  ) : null;

  return (
    <form onSubmit={handleSubmit}>
      <FormBox
        bg="white"
        p={4}
        m={4}
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
      >
        <Reb.Box>
          <Reb.Heading
            fontWeight="bold"
            fontSize={[2, 3]}
            my={2}
            textAlign="center"
          >
            Varmista koodi
          </Reb.Heading>
          <Reb.Text
            lineHeight={[1, 2]}
            py={2}
            textAlign="center"
            fontSize={[0, 1, 1]}
          >
            Osoitteeseen <b>{email}</b> on lähetetty kirjautumiskoodi.
          </Reb.Text>
          <Reb.Text lineHeight={[1, 2]} fontSize={[0, 1, 1]}>
            <ul>
              <li>
                Jos et saanut sähköpostia, niin sinua ei ole todennäköisesti
                lisätty käyttäjien joukkoon. Pyydä tunnusta lähetättämällä
                viesti antti (a) tuomaala.fi
              </li>
            </ul>
          </Reb.Text>
        </Reb.Box>
        <Reb.Input
          name="token"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.token}
          placeholder="Anna tunnistautumisnumero"
        />
        {errorMsg}
        <Reb.Button type="submit" disabled={isSubmitting} m={2}>
          Kirjaudu
        </Reb.Button>
      </FormBox>
    </form>
  );
};

const VerifyTokenForm = withFormik({
  mapPropsToValues: props => ({ token: '' }),
  validate: (values, props) => {
    const { token } = values;
    const errors = {};
    if (!token) {
      errors.token = 'Required';
    } else if (token.length !== 6) {
      errors.token = 'Invalid token';
    }
    return errors;
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const { token } = values;
    const { email } = props;
    props.submitHandler(email, token, setSubmitting, setErrors);
  },
})(VerifyForm);

VerifyForm.propTypes = PropTypes;
VerifyForm.defaultProps = DefaultProps;

export default VerifyTokenForm;
