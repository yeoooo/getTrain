import React, { useState } from 'react'
import '../../style/searchForm.css'
import TrainTypeInputBox from './trainType/trainTypeInputBox'
import StationInputBox from './station/stationInputBox'
import DateInputBox from './date/dateInpuBox'
import styled from 'styled-components';
import { parseISO, format, setHours, setMinutes } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function SearchForm(){
    // 입력값 받아오기
    const [trainType, setTrainType] = useState(null);
    const [departStation, setDepartStation] = useState(null);
    const [arrivalStation, setArrivalStation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    // 선택 날짜 포맷
    const DatetoString = new Date(selectedDate).toISOString();
    const parsedDate = parseISO(DatetoString, 'yyyyMMddHHmmss');
    // 출발일: 00시로 할당 ('20230822000000' 형식)
    const timeFrom = format(parsedDate, 'yyyyMMddHHmmss');
    // 조회하는 탐색 열차 시간을 해당 날짜 23시 59분까지 탐색 ('20230822235900' 형식)
    const parsedTimeUtil = setHours(parsedDate, 23);
    const parsedTimeUtilMinutes = setMinutes(parsedTimeUtil, 59);
    const timeUtil = format(parsedTimeUtilMinutes, 'yyyyMMddHHmmss');
    
    

    // 조회 버튼 클릭 시 입력값 유효성 검사
    const handleSearch = async (event) => {
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
            window.alert('조회를 실행하겠습니다 :)');
        }

        // 열차 타입 재할당
        if (trainType === '전체') {
            setTrainType('ALL');
        } else if (trainType === 'KTX/SRT') {
            setTrainType('KTX');
        } else if (trainType === 'ITX-청춘') {
            setTrainType('ITX');
        } else if (trainType === '새마을ITX-새마을') {
            setTrainType('ITX');
        } else if (trainType === '무궁화/누리로') {
            setTrainType('MUGUNGHWA');
        } else {
            console.log(trainType);
        }
        // console.log(trainType);
        
        event.preventDefault();

        
        try {
            const response = await fetch('/api/v1/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        req: {
                            trainType: trainType,
                            from: departStation,
                            to: arrivalStation,
                            time_from: timeFrom,
                            time_until: timeUtil,
                        }
                    } 
                }),
            });
            if (response.status === 200) {
                // 추후 추가 코드 작성 예정
                navigate('/searching');  

            } else {
                window.alert("조회가 불가능 합니다.");
            }
        } catch(error){
            console.log(error.message);
        }
        
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