import React, { useState } from 'react';
import '../../../style/searchForm.css'
import styled from 'styled-components';

function CheckBox(props){
    // 선택 목록
    const CATEGORY_LIST = [
        {id: 0, data: 'ALL', display: '전체'},
        {id: 1, data: 'KTX', display: 'KTX'},
        {id: 2, data: 'ITX', display: 'ITX-새마을/마음'},
        {id: 4, data: 'MUGUNGWHA', display: '무궁화'},

    ];

    // 선택값이 들어갈 빈 배열
    const [checkItem, setCheckedItem] = useState(''); 

    // 단일 선택
    const onCheckedElement = (id) => {
        if(checkItem === id){
            setCheckedItem(null);
        } else {
            setCheckedItem(id);
            const selectedItemData = CATEGORY_LIST.find(item => item.id === id)?.data;
            // const selectedItemData = 
            //     id === 0 ? 'TOTAL' :
            //     id === 1 ? 'KTX' :
            //     id === 2 ? 'ITX' :
            //     id === 3 ? 'MUGUNGHWA' :
            //     CATEGORY_LIST.find(item => item.id === id)?.data;
            props.handleSelectedItem(selectedItemData);
            console.log(selectedItemData);
        }
    }

    return(
        <CheckBoxWrapper open={props.isOpen}>
            {CATEGORY_LIST?.map((CATEGORY_LIST, key) => (
            <div key={key} className='checkBox-wrap'>
                <input 
                    type='checkbox' 
                    name={`select-${CATEGORY_LIST.id}`}
                    // onCheckedElement 실행
                    onChange={() => onCheckedElement(CATEGORY_LIST.id)}

                    // checked는 id형태로 반환
                    checked = {checkItem === CATEGORY_LIST.id}
                    />
                    
                <p>{CATEGORY_LIST.display}</p>
            </div> 
            ))}
        </CheckBoxWrapper>
        
        
    );
}

const CheckBoxWrapper = styled.div `
    display: flex;
    opacity: ${({ open }) => (open ? '1' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    max-height: ${({ open }) => (open ? '3rem' : '0')};
    transition: opacity 0.1s, visibility 0.3s, max-height 0.3s;
    justify-content: space-around;
`;
export default CheckBox