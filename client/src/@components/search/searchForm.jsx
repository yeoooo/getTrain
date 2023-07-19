import React from 'react'
import '../../style/searchForm.css'
import InputBox from './inputBox'

function SearchForm(props){
    return(
        <div>
            <header>
                <h1>열차 정보 조회</h1>
                <p>찾으실 열차 정보를 입력해주세요.</p>
            </header>
            
            <section>
                <InputBox icon='../../src/assets/train.png' title='열차 종류를 선택해주세요'/>
                <InputBox icon='../../src/assets/train.png' title='출발역 → 도착역'/>
                <InputBox icon='../../src/assets/calendar.png' title='출발일을 선택해주세요'/>
            </section>
            
        </div>
    );
}

export default SearchForm