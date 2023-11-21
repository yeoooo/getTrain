import React, { useState } from 'react'
import '../../../style/searchForm.css'
import InputSection from '../inputSection'
import styled from 'styled-components';


function TrainTypeInputBox(props){
    // 아코디언 감지 (기본은 열려있는 상태)
    const [isOpen, setIsOpen] = useState(true);
    // console.log(isOpen);
    // 열차 선택 체크박스에서 선택한 항목을 자식 컴포넌트에서 가져오기
    const [selectedItem, setSelectedItem] = useState(null);

    // 아코디언 토글 (열차 선택 체크박스)
    const handleSelectedItem = (item) => {
        setSelectedItem(item);
        handleAccordionToggle();
        props.handleSelectedItem(item);
    }

    // 화살표 아이콘 클릭 시 아코디언 상태 변경
    const handleAccordionToggle = () => {
        setIsOpen((preOpen) => !preOpen);
    };
    const arrowDirection = {
        transform: 'rotate(' + 180 * !isOpen + 'deg)'
    }

    return(
          <div className='input-wrapper'>
              <div className='input-box'>
                  <div className='input-box-header'>
                      <img src={props.icon} className='train-icon' alt='icon'/>
                      <h3>{selectedItem === null ? props.title : selectedItem}</h3>
                      <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' style={arrowDirection} onClick={handleAccordionToggle}/></a>
                  </div>
                  <InputSection title={props.title} handleSelectedItem={handleSelectedItem} isOpen={isOpen}/>
              </div>
          </div>
        );

}
const ArrowIcon = styled.img`
    width: 3rem;
    height: 1.8rem;
    position: absolute;
    bottom: 0.1rem;
    cursor: pointer;
    transition: all 0.35s ease;
    margin-left: 1rem;
`
export default TrainTypeInputBox