import React, { useState } from 'react';
import '../../style/searchForm.css'
import styled from 'styled-components';

function CheckBox(){
    // 선택 목록
    const CATEGORY_LIST = [
        {id: 0, data: '전체'},
        {id: 1, data: 'KTX/SRT'},
        {id: 2, data: 'ITX-청춘'},
        {id: 3, data: '새마을ITX-새마을'},
        {id: 4, data: '무궁화/누리로'},
        {id: 5, data: '통근열차'},
    ];

    // 선택값이 들어갈 빈 배열
    const [checkItem, setCheckedItem] = useState(null); 
    // onChange함수를 사용하여 이벤트 감지 후 값 가져오기
    // checked는 boolean형태로 반환
    // 복수 선택
    // const onCheckedElement = (checked, id) => {
    //     if(checked){
    //         setCheckedList(prev => [...prev, id]);
    //     } else if (!checked){
    //         setCheckedList(checkItems.filter((el) => el !== id));
    //     } else if(checkItems.length > 1){
    //         checkItems.splice(0, 1);
    //     }
    //     console.log(checkItems.length);
    // };

    // 단일 선택
    const onCheckedElement = (id) => {
        if(checkItem === id){
            setCheckedItem(null);
        } else {
            setCheckedItem(id);
        }

        
    }

    return(
        <CheckBoxWrapper>
            {CATEGORY_LIST?.map((CATEGORY_LIST, key) => (
            <div key={key} className='checkBox-wrap'>
                <input 
                    type='checkbox' 
                    name={`select-${CATEGORY_LIST.id}`}
                    // onCheckedElement 실행
                    // onChange={(e) => onCheckedElement(e.target.checked, CATEGORY_LIST.id)}
                    onChange={() => onCheckedElement(CATEGORY_LIST.id)}

                    // checked는 boolean형태로 반환
                    // checked={checkItem.includes(CATEGORY_LIST.id) ? true : false} 
                    checked = {checkItem === CATEGORY_LIST.id}
                    />
                <p>{CATEGORY_LIST.data}</p>
            </div>
            ))}
        </CheckBoxWrapper>
        
        
    );
}

const CheckBoxWrapper = styled.div `
    display: flex;
    justify-content: space-around;
`;
export default CheckBox