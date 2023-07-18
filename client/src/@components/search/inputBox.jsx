import React from 'react'
import '../../style/searchForm.css'
import styled from 'styled-components';
import InputSection from './inputSection'

function InputBox(props){
    return(
        <div className='input-warpper'>
            <div className='input-box'>
                <div className='input-box-header'>
                    <img src={props.icon} className='train-icon' alt='icon'/>
                    <h3>{props.title}</h3>
                    <a href='#'><img src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' /></a>
                </div>
                <InputSection title={props.title}/>
            </div>
        </div>
    );
}

const StyledTable = styled.table `
    
`;
export default InputBox