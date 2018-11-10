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

const PasswordInput = styled(Reb.Input)`
  max-width: 400px;
`;
const Bold = styled.span`
  font-weight: 800;
`;
const Content = styled(Reb.Flex)`
  width: 100%;
`;

const sendText = 'Kirjaudu';

const LoginForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const errorMsg = errors.password ? (
    <Reb.Text color="red" m={2}>
      {errors.password}
    </Reb.Text>
  ) : null;

  return (
    <Content justifyContent="center" alignItems="center">
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
              Anna salasana ja paina <Bold>{sendText}</Bold>
            </Reb.Text>
            <Reb.Text lineHeight={[1, 2]} fontSize={[0, 1, 1]} />
          </Reb.Box>
          <PasswordInput
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Salasana"
            my={3}
          />
          {errorMsg}
          <Reb.Button type="submit" disabled={isSubmitting} m={2}>
            {sendText}
          </Reb.Button>
        </FormBox>
      </form>
    </Content>
  );
};

const LoginInputForm = withFormik({
  mapPropsToValues: () => ({ password: '' }),
  validate: values => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Anna salasana';
    }
    return errors;
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    props.handleSubmit(values.password, setSubmitting, setErrors);
  },
})(LoginForm);

LoginForm.propTypes = PropTypes;
LoginForm.defaultProps = DefaultProps;

export default LoginInputForm;
