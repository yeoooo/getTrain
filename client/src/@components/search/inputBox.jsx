import React, { useState } from 'react'
import '../../style/searchForm.css'
import styled from 'styled-components';
import InputSection from './inputSection'


function InputBox(props){
    // 아코디언 감지 (기본은 열려있는 상태)
    const [isOpen, setIsOpen] = useState(true);
    console.log(isOpen);
    // 체크박스에서 선택한 항목을 자식 컴포넌트에서 가져오기
    const [selectedItem, setSelectedItem] = useState(null);

    // 아코디언 토글
    const handleSelectedItem = (item) => {
        setSelectedItem(item);
        console.log("setIsOpen 상태 변함")
        handleAccordionToggle();
    }

    const handleAccordionToggle = () => {
        setIsOpen((preOpen) => !preOpen);
        console.log("selectedItem :" + selectedItem);
    };


    // 기본 상태 (아코디언이 열려있는 상태)
    if(isOpen && selectedItem === null){
        return(
            <div className='input-warpper'>
                <div className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{props.title}</h3>
                        <a href='#'><img src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon'/></a>
                    </div>
                    <InputSection title={props.title} handleSelectedItem={handleSelectedItem} isOpen={isOpen}/>
                </div>
            </div>
        );
    } 
    // 입력값을 넣은 후 아코디언이 접혀져 있는 상태
    else if(!isOpen && selectedItem !== null) {
        return(
            <div className='input-warpper'>
                <div className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{selectedItem}</h3>
                        <a href='#'><img src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' style={{transform: 'rotate(180deg)'}} onClick={handleAccordionToggle}/></a>
                    </div>
                    <InputSection title={props.title} handleSelectedItem={handleSelectedItem} isOpen={isOpen}/>
                </div>
            </div>
        );
    }
    // 입력 후 아코디언을 여는 상태
    else if(isOpen && selectedItem !== null){
        return(
            <div className='input-warpper'>
                <div className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{selectedItem}</h3>
                        <a href='#'><img src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
                    </div>
                    <InputSection title={props.title} handleSelectedItem={handleSelectedItem} isOpen={isOpen}/>
                </div>
            </div>
        );
    }
    
    
}

export default InputBox