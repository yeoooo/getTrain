import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const ModalWrapper = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media (prefers-color-scheme: dark){
    background-color: #121212;
    color: #ffffff;
  }
`;

const LoadingText = styled.p`
  margin-left: 10px;
  margin-top: 10px;
  font-size: 1.5rem;
`;

const DonutSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
  margin: 0 auto;
`;

const LoadingModal = ({ visible, loadingText }) => {
  return (
    <ModalWrapper visible={visible}>
      <DonutSpinner />
      <LoadingText>{loadingText}</LoadingText>
    </ModalWrapper>
  );
};

export default LoadingModal;
