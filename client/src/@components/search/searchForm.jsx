import React, { useState } from 'react'
import '../../style/searchForm.css'
import TrainTypeInputBox from './trainType/trainTypeInputBox'
import StationInputBox from './station/stationInputBox'
import DateInputBox from './date/dateInpuBox'
import styled from 'styled-components';

function SearchForm(props){
    // 입력값 받아오기
    const [trainType, setTrainType] = useState(null);
    const [departStation, setDepartStation] = useState(null);
    const [arrivalStation, setArrivalStation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);


    // 조회 버튼 클릭 시 입력값 유효성 검사
    const handleSearch = () => {
        if( !trainType ) {
            window.alert('열차 종류를 선택해주세요!');
        } else if(!departStation){
            window.alert('출발역을 입력해주세요!');
        } else if(!arrivalStation){
            window.alert('도착역을 입력해주세요!');
        } else if(!selectedDate){
            window.alert('출발 날짜를 선택해주세요!');
        } else{
            // 조회 요청
            window.alert('조회 요청!!');
        }
        console.log(trainType);
    }

    return(
        <SearchFormWrapper>
            <header>
                <h1>열차 정보 조회</h1>
                <p>찾으실 열차 정보를 입력해주세요.</p>
            </header>
            
            <section>
                <TrainTypeInputBox 
                    icon='../../src/assets/train.png' 
                    title='열차 종류를 선택해주세요' 
                    handleSelectedItem = {setTrainType}/>
                <StationInputBox 
                    icon='../../src/assets/train.png' 
                    title='출발역 → 도착역'
                    handleDepartStationsItem={setDepartStation}
                    handleArrivalStationsItem={setArrivalStation}/>
                <DateInputBox 
                    icon='../../src/assets/calendar.png' 
                    title='출발일을 선택해주세요'
                    handleSelectedItem={setSelectedDate}/>
            </section>

            <SearchButton >
                <button onClick={handleSearch}><span>조회하기</span></button>
            </SearchButton>
            
        </SearchFormWrapper>
    );
}

const SearchFormWrapper = styled.div``

const SearchButton = styled.div`
    display: flex;
    justify-content: center;
    margin: 10rem 0;

    button{
        padding: 2rem 12rem;
        background-color: #315A52;
        border: none;
        
        &:hover{
            background-color: #094337;
        }
        span{
            font-size: 1.5rem;
            font-weight: 600;
            color: #ffffff;
        }
    }

`

export default SearchForm