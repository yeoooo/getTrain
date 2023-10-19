import React, { useEffect, useState } from 'react';
import '../../../style/searchForm.css'
import styled from 'styled-components';
import { STATION_DATA } from '../../../core/stationData';

function Station(props){
    // 입력값 자동완성 기능 (출발역)
    const [inputValue, setInputValue] = useState('');                   // 입력값
    const [isHaveInputValue, setIsHaveInputValue] = useState(false);    // 입력값 인지
    const [dropDownList, setDropDownList] = useState([]);               // 입력값에 해당하는 역 이름 목록 출력
    const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

    const showDropDownList = () => {
        if(inputValue === ''){
            setIsHaveInputValue(false);
            setDropDownList([]);
        } else{
            // 입력한 값과 해당하는 값을 STATION_DATA에서 찾은 후 selectedItem에 할당
            // find가 아닌 filter로 사용하여 한글자만 입력해도 관련 데이터를 찾을 수 있도록
            const selectedItem = STATION_DATA.filter(
                station => station.data.includes(inputValue)
            );
            setDropDownList(selectedItem.map(station => station.data));
        }
    }

    // 입력값 실시간 갱신
    const changeInputValue = event => {
        setInputValue(event.target.value);
        setIsHaveInputValue(true);
    }

    // 해당 데이터 클릭 시 입력값 갱신
    const clickDropDownItem = clickedItem => {
        if(arrivalInputValue !== clickedItem){
            setInputValue(clickedItem);
        setIsHaveInputValue(false);
        props.handleDepartStationsItem(clickedItem);
        } else{
            alert("출발역과 도착역이 같아요!");
        }
        
    }

    // 입력값이 변할 때 마다 반복해서(hook) 입력값에 해당하는 데이터를 갱신하여 보여준다.
    // 입력값 입력 시 계속해서 showDropDownList 실행
    useEffect(showDropDownList, [inputValue])

    // 입력값 자동완성 기능 (도착역)
    const [arrivalInputValue, setArrivalInputValue] = useState('');
    const [isHaveArrivalInputValue, setIsHaveArrivalInputValue] = useState(false);
    const [arrivalDropDownList, setArrivalDropDownList] = useState([]);
    const [arrivalDropDownItemIndex, setArrivalDropDownItemIndex] = useState(-1);

    const showArrivalDropDownList = () => {
        if(arrivalInputValue === ''){
            setIsHaveArrivalInputValue(false);
            setArrivalDropDownList([]);
        } else{
            // 입력한 값과 해당하는 값을 STATION_DATA에서 찾은 후 selectedItem에 할당
            const selectedArrivalItem = STATION_DATA.filter(
                arrivalStation => arrivalStation.data.includes(arrivalInputValue)
            );
            setArrivalDropDownList(selectedArrivalItem.map(arrivalStation => arrivalStation.data));
        }
    }

    const changeArrivalInputValue = event => {
        setArrivalInputValue(event.target.value);
        setIsHaveArrivalInputValue(true);
    }

    const clickArrivalDropDownItem = clickedItem => {
        if(inputValue !== clickedItem){
            setArrivalInputValue(clickedItem);
            setIsHaveArrivalInputValue(false);
            props.handleArrivalStationsItem(clickedItem);
        } else {
            alert("출발역과 도착역이 같아요!");
        }
    }

    useEffect(showArrivalDropDownList, [arrivalInputValue]);
    
    return(
        <StationWrapper open={props.isOpen}>
            <StationInputContainer>
                {/* 출발역 입력 */}
                <p>출발역</p>
                <StationInputBox>
                    <input 
                        type='text' 
                        name='departure' 
                        placeholder=' 출발역을 입력해주세요.'
                        value={inputValue}
                        onChange={changeInputValue} />

                    {/* 자동완성 드롭다운 */}
                    {isHaveInputValue && (
                        <DropDownBox>
                            {/* 해당하는 값이 없을 경우 */}
                            {dropDownList.length === 0 && (
                                <DropDownItem>해당하는 역은 없습니다</DropDownItem>
                            )}
                            {/* 해당하는 값이 있을 경우 드롭다운으로 보여주기 */}
                            {dropDownList.map((dropDownItem, dropDownIndex) => {
                                return (
                                    <DropDownItem
                                        key={dropDownIndex}
                                        onClick={() => clickDropDownItem(dropDownItem)}
                                        onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                                        className={dropDownItemIndex === dropDownIndex ? 'selected' : ''}>
                                        
                                        {dropDownItem}
                                    </DropDownItem>
                                )
                            })}
                        </DropDownBox>
                    )}

                </StationInputBox>
            </StationInputContainer>
            
            <StationInputContainer>
                {/* 도착역 입력 */}
                <p>도착역</p>
                <StationInputBox>
                    <input 
                        type='text' 
                        name='arrival' 
                        placeholder=' 도착역을 입력해주세요.'
                        value={arrivalInputValue}
                        onChange={changeArrivalInputValue}/>
                    {/* 자동완성 드롭다운 */}
                    {isHaveArrivalInputValue && (
                        <DropDownBox>
                            {/* 해당하는 값이 없을 경우 */}
                            {arrivalDropDownList.length === 0 && (
                                <DropDownItem>해당하는 역은 없습니다</DropDownItem>
                            )}
                            {/* 해당하는 값이 있을 경우 드롭다운으로 보여주기 */}
                            {arrivalDropDownList.map((arrivalDropDownItem, arrivalDropDownIndex) => {
                                return (
                                    <DropDownItem
                                        key={arrivalDropDownIndex}
                                        onClick={() => clickArrivalDropDownItem(arrivalDropDownItem)}
                                        onMouseOver={() => setArrivalDropDownItemIndex(arrivalDropDownItem)}
                                        className={arrivalDropDownItemIndex === arrivalDropDownIndex ? 'selected' : ''}>
                                        
                                        {arrivalDropDownItem}
                                    </DropDownItem>
                                )
                            })}
                        </DropDownBox>
                    )}
                </StationInputBox>
            </StationInputContainer>
            
            
        </StationWrapper>

    );
}

const StationWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 3rem 0 0 0;
    justify-content: space-evenly;

    opacity: ${({ open }) => (open ? '1' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    max-height: ${({ open }) => (open ? '3rem' : '0')};
    transition: opacity 0.1s, visibility 0.3s, max-height 0.3s;
`
const StationInputContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;

  p {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.8rem 1.5rem 0 0; 
  }
`;

const StationInputBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    input{
        appearance: none;
        border: 1px solid #315A52;
        border-radius: 1rem;
        width: 17rem;
        height: 3.2rem;
        padding: 0.5rem 0.8rem;
        background-color: #ffffff;
    }

`

const DropDownBox = styled.ul`
    color: #000;
    display: block;
    width: 16rem;
    padding: 0.8rem 1rem;
    background-color: #ffffff;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: #b3b3b3 1px 2px 2px;
    list-style-type: none;
    z-index: 3;

    position: absolute;
    top: 3.2rem;
    left: 0;
`
const DropDownItem = styled.li`
  padding: 0 1rem;
  font-size: 1.3rem;
  margin: 0.7rem 0;

  &.selected {
    background-color: #eaeaea;
    border-radius: 0.3rem;
    color: #000000;
  }
`
export default Station