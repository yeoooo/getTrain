import React, { useState, useEffect } from 'react'
import '../../../style/searchForm.css'
import styled from 'styled-components';
import InputSection from '../inputSection'


function StationInputBox(props){
    // 아코디언 감지 (기본은 열려있는 상태)
    const [isOpen, setIsOpen] = useState(true);

    // 출발역-도착역 입력값 가져오기
    const [selectedDepartStation, setSelectedDepartStation] = useState('출발역');
    const [selectedArrivalStation, setSelectedArrivalStation] = useState('도착역');

    // 출발역 입력값 가져오기
    const handleDepartStationsItem = (depart) => {
        setSelectedDepartStation(depart);
        props.handleDepartStationsItem(depart);
    }

    // 도착역 입력값 가져오기
    const handleArrivalStationsItem = (arrival) => {
        setSelectedArrivalStation(arrival);
        props.handleArrivalStationsItem(arrival);
    }

    // 화살표 아이콘 클릭 시 아코디언 상태 변경
    const handleAccordionToggle = () => {
        setIsOpen((preOpen) => !preOpen);
    };

    // 변경 감지 후 비동기적 상태 업데이트
    useEffect(() => {

        const triggers = {'출발역':1, '도착역':1, '':1};

        if (!(selectedDepartStation in triggers || selectedArrivalStation in triggers)) {
            handleAccordionToggle();
        }
    }, [selectedDepartStation, selectedArrivalStation]);

    const arrowDirection = {
        transform: 'rotate(' + 180 * !isOpen + 'deg)'
    }

    // 기본 상태 (아코디언이 열려있는 상태)
    return(
      <div className='input-wrapper'>
          <div className='input-box'>
              <div className='input-box-header'>
                  <img src={props.icon} className='train-icon' alt='icon'/>
                  <h3>{selectedDepartStation} → {selectedArrivalStation}</h3>
                  <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle} style={arrowDirection}/></a>
              </div>
              <InputSection title={props.title} handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
          </div>
      </div>
    );
    // if(isOpen && selectedDepartStation === '' && selectedArrivalStation === ''){
    //     return(
    //         <div className='input-wrapper'>
    //             <div className='input-box'>
    //                 <div className='input-box-header'>
    //                     <img src={props.icon} className='train-icon' alt='icon'/>
    //                     <h3>{props.title}</h3>
    //                     <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
    //                 </div>
    //                 <InputSection title={props.title} handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
    //             </div>
    //         </div>
    //     );
    // }
    // else if(!isOpen && selectedDepartStation === '' && selectedArrivalStation === ''){
    //     return(
    //       <div className='input-wrapper'>
    //           <div className='input-box'>
    //               <div className='input-box-header'>
    //                   <img src={props.icon} className='train-icon' alt='icon'/>
    //                   <h3>{props.title}</h3>
    //                   <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' style={{transform: 'rotate(180deg)'}} onClick={handleAccordionToggle}/></a>
    //               </div>
    //               <InputSection title={props.title} handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
    //           </div>
    //       </div>
    //     );
    // }
    // // 출발역 입력값을 넣은 후 아코디언이 아직 펼쳐져 있는 상태 (출발역만 입력한 상태)
    // else if(isOpen && selectedDepartStation !== '' && selectedArrivalStation === '') {
    //     return(
    //         <div className='input-wrapper'>
    //             <div className='input-box'>
    //                 <div className='input-box-header'>
    //                     <img src={props.icon} className='train-icon' alt='icon'/>
    //                     {/* <h3>{selectedDepartStations !== null && selectedArrivalStations === null ? `${selectedDepartStations} → ` : ""}</h3> */}
    //                     <h3>{selectedDepartStation} → </h3>
    //                     {/* {selectedDepartStation !== '' && selectedArrivalStation === '' ? <h3>{selectedStations.depart} → </h3> : <h3>{props.title}</h3>} */}
    //
    //                     <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
    //                 </div>
    //                 <InputSection title={props.title}  handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
    //             </div>
    //         </div>
    //     );
    // }
    // // 입력값을 넣은 후 아코디언이 접혀져 있는 상태 (출발역 && 도착역 모두 입력한 상태)
    // else if(!isOpen && selectedDepartStation !== '' && selectedArrivalStation !== '') {
    //     return(
    //         <div className='input-wrapper'>
    //             <div className='input-box'>
    //                 <div className='input-box-header'>
    //                     <img src={props.icon} className='train-icon' alt='icon'/>
    //                     <h3>{selectedDepartStation} → {selectedArrivalStation}</h3>
    //                     <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' style={{transform: 'rotate(180deg)'}} onClick={handleAccordionToggle}/></a>
    //                 </div>
    //                 <InputSection title={props.title} handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
    //             </div>
    //         </div>
    //     );
    // }
    // // 입력 후 아코디언을 여는 상태
    // else if(isOpen && selectedDepartStation !== '' && selectedArrivalStation !== ''){
    //     return(
    //         <div className='input-wrapper'>
    //             <div className='input-box'>
    //                 <div className='input-box-header'>
    //                     <img src={props.icon} className='train-icon' alt='icon'/>
    //                     <h3>{selectedDepartStation} → {selectedArrivalStation}</h3>
    //                     <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
    //                 </div>
    //                 <InputSection title={props.title} handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
    //             </div>
    //         </div>
    //     );
    // }
    // else{// 기본 상태 (아코디언이 열려있는 상태)
    //     return(
    //         <div className='input-wrapper'>
    //             <div className='input-box'>
    //                 <div className='input-box-header'>
    //                     <img src={props.icon} className='train-icon' alt='icon'/>
    //                     <h3>{props.title}</h3>
    //                     <a href='#'><ArrowIcon src='../../src/assets/arrow.png' className='arrow-icon' alt='arrow icon' onClick={handleAccordionToggle}/></a>
    //                 </div>
    //                 <InputSection title={props.title} handleDepartStationsItem={handleDepartStationsItem} handleArrivalStationsItem={handleArrivalStationsItem} isOpen={isOpen}/>
    //             </div>
    //         </div>
    //     );
    // }
}
const ArrowIcon = styled.img`
    width: 3rem;
    height: 1.8rem;
    position: absolute;
    bottom: 0.1rem;
    cursor: pointer;
    margin-left: 1rem;
    transition: all 0.35s ease;
`
export default StationInputBox