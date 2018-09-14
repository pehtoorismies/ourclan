import React from 'react';
import { bool, func, object } from 'prop-types';
import * as Reb from 'rebass';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { FormBox } from '../Elements';

const PropTypes = {
  values: object.isRequired, // eslint-disable-line
  errors: object.isRequired,// eslint-disable-line
  // touched: bool.isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  handleSubmit: func.isRequired,
  isSubmitting: bool.isRequired,
};
const DefaultProps = {};

const EmailInput = styled(Reb.Input)`
  max-width: 400px;
`;


const sendText = 'Lähetä kirjautumiskoodi';

const MailForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {

  const errorMsg = errors.email ? (
    <Reb.Text color="red" m={2}>
      {errors.email}
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
          <Reb.Heading fontWeight="bold" fontSize={[2,3]} my={2} textAlign="center">
            Ohje
          </Reb.Heading>
          <Reb.Text lineHeight={[1, 2]} py={2} textAlign="center" fontSize={[0, 1, 1]}>
            Kirjautuminen on mahdollista ainoastaan ennakkoon määritellyille
            sähköpostiosoitteille.
          </Reb.Text>
          <Reb.Text lineHeight={[1, 2]} fontSize={[0, 1, 1]}>
            <ul>
              <li>
                Syötä sähköpostiosoitteesi ja paina <i>{sendText}</i>
              </li>
              <li>
                Jos sinut on lisätty listalle saat sähköpostiisi kirjautumiskoodin
              </li>
              <li> Syötä kirjautumiskoodi</li>
            </ul>
          </Reb.Text>
        </Reb.Box>
        <EmailInput
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="Sähköpostiosoite"
          my={3}
        />
        {errorMsg}
        <Reb.Button type="submit" disabled={isSubmitting} m={2}>
          LÄHETÅ KIRJAUTUMISKOODI
        </Reb.Button>
      </FormBox>
    </form>
  );
};

const MailInputForm = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.handleSubmit(values.email, setSubmitting, setErrors);
  },
})(MailForm);

MailForm.propTypes = PropTypes;
MailForm.defaultProps = DefaultProps;

export default MailInputForm;
