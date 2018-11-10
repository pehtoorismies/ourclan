import React from 'react';
import { renderComponent, branch } from 'recompose';
import Spinner from 'react-spinkit';
import styled from 'styled-components';

const LoadWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const loadingSpinner = isLoading =>
  branch(
    isLoading,
    renderComponent(() => (
      <LoadWrap>
        <Spinner name="ball-scale-ripple" />
      </LoadWrap>
    )),
  );

export default loadingSpinner;
