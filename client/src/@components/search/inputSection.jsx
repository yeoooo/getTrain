import React from 'react'
import '../../style/searchForm.css'
import CheckBox from './checkBox';
import InputStation from './inputStation';

function InputSection(props){
    var requestTitle = props.title;
    if(requestTitle == '열차 종류를 선택해주세요'){
        return <CheckBox /> 
    }else if(requestTitle == '출발역 → 도착역'){
        return <InputStation/>
    }else{
        return null;
    }

        

}

export default InputSection