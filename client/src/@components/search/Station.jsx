import React from 'react';
import '../../style/searchForm.css'
import styled from 'styled-components';

function Station(){
    return(
        <div>
            <div className='station-wrap'>
                <p>출발역</p>
                <input type='text' name='departure' placeholder='  출발역을 입력해주세요.'/>
            </div>
            <div className='station-wrap'>
                <p>도착역</p>
                <input type='text' name='departure' placeholder='  도착역을 입력해주세요.'/>
            </div>
        </div>
    );
}

export default Station