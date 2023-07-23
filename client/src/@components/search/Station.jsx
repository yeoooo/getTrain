import React, { useEffect, useState } from 'react';
import '../../style/searchForm.css'
import styled from 'styled-components';
import { STATION_DATA } from '../../core/stationData';

function Station(){
    // 입력값 자동완성 기능
    const [inputValue, setInputValue] = useState('');
    const [isHaveInputValue, setIsHaveInputValue] = useState(false);
    const [dropDownList, setDropDownList] = useState([]);
    const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

    const showDropDownList = () => {
        if(inputValue === ''){
            setIsHaveInputValue(false);
            setDropDownList([]);
        } else{
            // 입력한 값과 해당하는 값을 STATION_DATA에서 찾은 후 selectedItem에 할당
            const selectedItem = STATION_DATA.filter(
                station => station.data.includes(inputValue)
            );
            setDropDownList(selectedItem.map(station => station.data));
        }
    }

    const changeInputValue = event => {
        setInputValue(event.target.value);
        setIsHaveInputValue(true);
    }

    const clickDropDownItem = clickedItem => {
        setInputValue(clickedItem);
        setIsHaveInputValue(false);
    }

    useEffect(showDropDownList, [inputValue])

    return(
        <div>
            <div className='station-wrap'>
                <p>출발역</p>
                <input 
                    type='text' 
                    name='departure' 
                    placeholder='  출발역을 입력해주세요.'
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
            </div>
            <div className='station-wrap'>
                <p>도착역</p>
                <input type='text' name='departure' placeholder='  도착역을 입력해주세요.'/>
            </div>
        </div>
    );
}

const DropDownBox = styled.ul`
    display: block;
    width: 17rem;
    margin: 0 auto;
    padding: 8px 0;
    background-color: white;
    border: 1px solid #315A52;
    border-top: none;
    border-radius: 0 0 1rem 1rem;
    box-shadow: #b3b3b3 1px 2px 2px;
    list-style-type: none;
    z-index: 3;
    right: 10rem;
`
const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: #b3b3b3;
  }
`
export default Station