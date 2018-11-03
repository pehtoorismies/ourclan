import React from 'react';
import { bool, func, object } from 'prop-types';
import * as Reb from 'rebass';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { FormBox } from '../Elements';

const PropTypes = {
  values: object.isRequired, // eslint-disable-line
  errors: object.isRequired, // eslint-disable-line
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
const Bold = styled.span`
  font-weight: 800;
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
          <Reb.Heading
            fontWeight="bold"
            fontSize={[2, 3]}
            my={2}
            textAlign="center"
          >
            Kirjautuminen
          </Reb.Heading>
          <Reb.Text
            lineHeight={[1, 2]}
            py={2}
            textAlign="center"
            fontSize={[0, 1, 1]}
          >
            Kirjautuminen (login) on mahdollista ainoastaan ennakkoon
            määritellyille sähköpostiosoitteille. Jos sinut on lisätty listalle
            saat sähköpostiisi kirjautumiskoodi.
          </Reb.Text>
          <Reb.Text lineHeight={[1, 2]} fontSize={[0, 1, 1]}>
            Syötä sähköpostiosoitteesi ja paina <Bold>{sendText}</Bold>
          </Reb.Text>
          <Reb.Text lineHeight={[1, 2]} fontSize={[0, 1, 1]} />
        </Reb.Box>
        <EmailInput
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          placeholder="Salasana"
          my={3}
        />
        {errorMsg}
        <Reb.Button type="submit" disabled={isSubmitting} m={2}>
          KIRJAUDU
        </Reb.Button>
      </FormBox>
    </form>
  );
};

const MailInputForm = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validate: values => {
    const errors = {};
    if (!values.password) {
      errors.email = 'Anna salasana';
    }
    return errors;
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.handleSubmit(values.password, setSubmitting, setErrors);
  },
})(MailForm);

MailForm.propTypes = PropTypes;
MailForm.defaultProps = DefaultProps;

export default MailInputForm;
