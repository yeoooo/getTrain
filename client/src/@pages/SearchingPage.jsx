import React from 'react';
import LoadingAnime from '../@components/searching/loadingAnime';
import { styled } from 'styled-components';

function SearchingPage(){
    const handleStopButton = async () => {
        const email = 'user@gamil.com';

        try {
            const response = await fetch('api/v1/reserve/stop', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email }),
            });
        } catch(error) { 
            console.log(error.message);
        }

    }

    return(
        <SearchingPageWrapper>
            <SearchingText>조회중</SearchingText>
            <SearchingCaption>열차를 열심히 찾고 있어요!</SearchingCaption>
            <LoadingAnime/>
            <StopButton onClick={handleStopButton}><span>조회중단</span></StopButton>
        </SearchingPageWrapper>
    )
}

const SearchingPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100vh;
`

const SearchingText = styled.h1`
    font-size: 8rem;
    font-weight: 700;
    letter-spacing: 3rem;
    color: #000000;
    margin: 4rem 0;
`

const SearchingCaption = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.7rem;
    color: #000000;
    margin: 0.7rem 0 2rem 0;
`

const StopButton = styled.button`
    background-color: #ffffff;
    color: #000000;
    padding: 1.3rem 3rem;
    margin: 0 2rem 0 0;

    border: 1px solid #e3371d;
    border-radius: 15px;
    transition: transform 0.1s;

    &:hover {
        background-color: #e3371d;
        border: 1px solid #e3371d;
        color: #ffffff;
        transform: scale(1.05);
    }

    span{
        letter-spacing: 0.3rem;
        font-size: 1.5rem;
        font-weight: 600;
        text-align: center;

    }

`

export default SearchingPage