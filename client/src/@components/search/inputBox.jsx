import React from 'react'
import '../../style/searchForm.css'
import styled from 'styled-components';
import CheckBox from './checkBox'

function InputBox(props){
    return(
        <div className='input-warpper'>
            <div className='input-box'>
                <div className='input-box-header'>
                    <img src={props.icon} className='train-icon' alt='train icon'/>
                    <h3>{props.title}</h3>
                    <img src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' />
                </div>
                <CheckBox />
            </div>
        </div>
    );
}

const StyledTable = styled.table `
    
`;
export default InputBox