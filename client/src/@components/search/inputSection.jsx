import React from 'react'
import '../../style/searchForm.css'
import CheckBox from './checkBox';
import Station from './Station';
import DepartureDate from './departureDate';

function InputSection(props){
    var requestTitle = props.title;
    if(requestTitle == '열차 종류를 선택해주세요'){
        return <CheckBox /> 
    }else if(requestTitle == '출발역 → 도착역'){
        return <Station />
    }else if(requestTitle == '출발일을 선택해주세요'){
        return <DepartureDate />;
    }

        

}

export default InputSection