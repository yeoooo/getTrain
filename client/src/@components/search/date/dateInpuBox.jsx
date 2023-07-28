import React, { useState } from 'react'
import '../../../style/searchForm.css'
import styled from 'styled-components';
import InputSection from '../inputSection'


function DateInputBox(props){
    // 아코디언 감지 (기본은 열려있는 상태)
    const [isOpen, setIsOpen] = useState(true);
    // console.log(isOpen);
    // 열차 선택 체크박스에서 선택한 항목을 자식 컴포넌트에서 가져오기
    const [selectedItem, setSelectedItem] = useState(null);

    // 아코디언 토글 (열차 선택 체크박스)
    const handleSelectedItem = (item) => {
        setSelectedItem(item);
        handleAccordionToggle();
    }

    // 화살표 아이콘 클릭 시 아코디언 상태 변경
    const handleAccordionToggle = () => {
        setIsOpen((preOpen) => !preOpen);
    };

    // 기본 상태 (아코디언이 열려있는 상태)
    if(isOpen && selectedItem === null){
        return(
            <div className='input-warpper'>
                <div className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{props.title}</h3>
                        <a href='#'><img src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
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

export default DateInputBox