import React from 'react';
import LoadingAnime from '../@components/searching/loadingAnime';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../util.jsx";

function SearchingPage() {
  const apiURL = "http://localhost:8080/api/v1/reserve/stop?email=" + sessionStorage.getItem("email");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    checkAccess(navigate);
    setIsDarkMode(darkModeMediaQuery.matches);

    const darkModeChangeListener = (e) => {
      setIsDarkMode(e.matches);
    };
    darkModeMediaQuery.addListener(darkModeChangeListener);

    return () => {
      darkModeMediaQuery.removeListener(darkModeChangeListener);
    };
  }, []);

  const handleStopButton = async () => {
    window.alert("조회 중단을 실행하겠습니다.");
    try {
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());
      if (response.status === 'OK') {
        window.alert('조회가 중단되었습니다.');
      } else {
        window.alert(response.data);
      }
      navigate('/search');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <SearchingPageWrapper isDarkMode={isDarkMode}>
      <SearchingText isDarkMode={isDarkMode}>조회중</SearchingText>
      <LoadingAnime/>
      <SearchingCaption isDarkMode={isDarkMode}>열차를 열심히 찾고 있어요!</SearchingCaption>
      <StopButton onClick={handleStopButton} isDarkMode={isDarkMode}><span>조회중단</span></StopButton>
    </SearchingPageWrapper>
  );
}

const SearchingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.isDarkMode ? '#333' : '#f7f7f7'};
`;

const SearchingText = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  letter-spacing: 3rem;
  color: ${props => props.isDarkMode ? '#fff' : '#000000'};
  margin: 4rem 0;
`;

const SearchingCaption = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.7rem;
  color: ${props => props.isDarkMode ? '#fff' : '#000000'};
  margin: 0.7rem 0 2rem 0;
`;

const StopButton = styled.button`
  background-color: ${props => props.isDarkMode ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#fff' : '#000000'};
  padding: 1.3rem 3rem;
  margin: 0 2rem 0 0;
  border: 1px solid ${props => props.isDarkMode ? '#e3371d' : '#000000'};
  border-radius: 15px;
  transition: transform 0.1s;

  &:hover {
    background-color: ${props => props.isDarkMode ? '#e3371d' : '#ffffff'};
    border: 1px solid ${props => props.isDarkMode ? '#fff' : '#e3371d'};
    color: ${props => props.isDarkMode ? '#fff' : '#fff'};
    transform: scale(1.05);
  }

  span {
    letter-spacing: 0.3rem;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }
};
`

export default SearchingPage;