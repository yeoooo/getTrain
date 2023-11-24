import React from 'react'
import { styled } from 'styled-components'

function LoadingAnime(){
    return(
        <AnimeWrapper>
            <AnimeBox>
                <Track/>
                <Train/>
            </AnimeBox>
        </AnimeWrapper>
    )
}

const AnimeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5rem 0;
`

const AnimeBox = styled.div`
    position: relative;
`

const Track = styled.div`
    position: relative;
    overflow: hidden;
    width: 60px;
    height: 100px;
    border-left: 3px solid #595959;
    transform: skew(-10deg) rotateX(45deg);

    &:before {
        content:"";
        position: absolute;
        height: 3px;
        width: 60px;
        background-color: #595959;
        top: 90px;
        box-shadow: 0 0 #595959, 0 -10px #595959, 0 -20px #595959, 0 -30px #595959, 0 -40px #595959, 0 -50px #595959, 0 -50px #595959, 0 -60px #595959,0 -70px #595959, 0 -80px #595959, 0 -90px #595959, 0 -100px #595959, 0 -110px #595959, 0 -120px #595959, 0 -130px #595959, 0 -140px #595959;
        animation: track 1s linear infinite;
    }

    @keyframes track {
        0% {transform: translateY(70px) rotateX(45deg);}
        100% {transform: translateY(0px) rotateX(45deg);}
    }

    &:after {
        content:"";
        position: absolute;
        transform: rotate(-15deg);
        width: 60px;
        height: 120px;
        background-color: #fff;
        border-left: 3px solid #595959;
        left: 30px;
        top: -10px;
      }
`

const Train = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: #315A52;
    border-radius: 16px;
    top:0;
    left:-13px;
    transform-origin: bottom;
    animation: rotate 1s linear infinite;

    &:before {
        content:"";
        position: absolute;
        background-color: #f7f7f7;
        width:20px;
        height:15px;
        left:9px;
        top:15px;
        box-shadow: 22px 0 #f7f7f7;
    }

    &:after {
        content:"";
        position: absolute;
        background-color: #f7f7f7;
        border-radius:50%;
        height: 7px;
        width: 7px;
        top:45px;
        left: 12px;
        box-shadow: 30px 0px #f7f7f7;
    }

    @keyframes rotate {
        0% {transform: rotate(0);}
        25% {transform: rotate(2deg);}
        50% {transform: rotate(0);}
        75% {transform: rotate(-2deg);}
        100% {transform: rotate(0);}
    }
`



export default LoadingAnime