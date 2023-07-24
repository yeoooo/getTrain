import React from 'react'
import '../../style/searchForm.css'
import CheckBox from './trainType/checkBox';
import Station from './station/Station';
import DepartureDate from './date/departureDate';

function InputSection(props){
    const requestTitle = props.title;
    // 체크박스 선택 항목 값 넘겨주기
    const {handleSelectedItem, isOpen} = props;

    if(requestTitle == '열차 종류를 선택해주세요'){
        return <CheckBox handleSelectedItem={handleSelectedItem} isOpen={isOpen}/> 
    } else if(requestTitle == '출발역 → 도착역'){
        return <Station handleSelectedItem={handleSelectedItem} isOpen={isOpen}/>
    } else if(requestTitle == '출발일을 선택해주세요'){
        return <DepartureDate />;
    } 

}

export default InputSection