import React, { useState } from 'react'
import '../../../style/searchForm.css'
import styled from 'styled-components';
import InputSection from '../inputSection'
import { format } from 'date-fns';


function DateInputBox(props){
    // 아코디언 감지 (기본은 열려있는 상태)
    const [isOpen, setIsOpen] = useState(true);
    // 달력에서 선택한 날짜를 자식 컴포넌트에서 가져오기
    const [selectedItem, setSelectedItem] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [untilTime, setUntilTime] = useState(null);

    // 아코디언 토글 (달력 날짜 선택)
    const handleSelectedItem = (item) => {
        setSelectedItem(item);
        handleAccordionToggle();
        props.handleSelectedItem(item);
    }

    const handleFromTime = (fromTime) =>{
        setFromTime(fromTime);
        props.handleFromTime(fromTime);
    }

    const handleUntilTime = (untilTime) => {
        setUntilTime(untilTime)
        props.handleUntilTime(untilTime);
    }

    // 화살표 아이콘 클릭 시 아코디언 상태 변경
    const handleAccordionToggle = () => {
        setIsOpen((preOpen) => !preOpen);
    };

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    }

    // 기본 상태 (아코디언이 열려있는 상태)
    if(isOpen && selectedItem === null){
        return(
            <InputWrapper className='input-wrapper'>
                <DateInputBoxSection className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{props.title}</h3>
                        <a href='#'><ArrowIcon src='./assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
                    </div>


                    <InputSection title={props.title} fromTime={props.fromTime} untilTime={props.untilTime} handleSelectedItem={handleSelectedItem} handleFromTime={handleFromTime} handleUntilTime={handleUntilTime} isOpen={isOpen}/>
                </DateInputBoxSection>
            </InputWrapper>
        );
    }
    else if(!isOpen && selectedItem === null){
        return(
          <InputWrapper className='input-wrapper'>
              <DateInputBoxSection className='input-box'>
                  <div className='input-box-header'>
                      <img src={props.icon} className='train-icon' alt='icon'/>
                      <h3>{props.title}</h3>
                      <a href='#'><ArrowIcon src='./assets/arrow.png' className='arrow-icon' alt='arrow icon' style={{transform: 'rotate(180deg)'}} onClick={handleAccordionToggle}/></a>
                  </div>
                  <InputSection title={props.title} fromTime={props.fromTime} untilTime={props.untilTime} handleSelectedItem={handleSelectedItem} handleFromTime={handleFromTime} handleUntilTime={handleUntilTime} isOpen={isOpen}/>
              </DateInputBoxSection>
          </InputWrapper>
        );
    }
    // 입력값을 넣은 후 아코디언이 접혀져 있는 상태
    else if(!isOpen && selectedItem !== null) {
        return(
            <InputWrapper className='input-wrapper'>
                <DateInputBoxSection className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{format(selectedItem, 'MM월 dd일')}</h3>
                        <a href='#'><ArrowIcon src='./assets/arrow.png' className='arrow-icon' alt='arrow icon' style={{transform: 'rotate(180deg)'}} onClick={handleAccordionToggle}/></a>
                    </div>
                    <InputSection title={props.title} fromTime={props.fromTime} untilTime={props.untilTime} handleSelectedItem={handleSelectedItem} handleFromTime={handleFromTime} handleUntilTime={handleUntilTime} isOpen={isOpen}/>
                </DateInputBoxSection>
            </InputWrapper>
        );
    }
    // 입력 후 아코디언을 여는 상태
    else if(isOpen && selectedItem !== null){
        return(
            <InputWrapper className='input-wrapper'>
                <DateInputBoxSection className='input-box'>
                    <div className='input-box-header'>
                        <img src={props.icon} className='train-icon' alt='icon'/>
                        <h3>{format(selectedItem, 'MM월 dd일')}</h3>
                        <a href='#'><ArrowIcon src='./assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
                    </div>
                    <InputSection title={props.title} fromTime={props.fromTime} untilTime={props.untilTime} handleSelectedItem={handleSelectedItem} handleFromTime={handleFromTime} handleUntilTime={handleUntilTime} isOpen={isOpen}/>
                </DateInputBoxSection>
            </InputWrapper>
        );
    }
    
    
}

const InputWrapper = styled.div``

const DateInputBoxSection = styled.div`
    align-content: center;
    font-size: 1.7rem;
`
const ArrowIcon = styled.img`
    width: 3rem;
    height: 1.8rem;
    position: absolute;
    bottom: 0.1rem;
    cursor: pointer;
    margin-left: 1rem;
    transition: all 0.35s ease;
`



export default DateInputBox