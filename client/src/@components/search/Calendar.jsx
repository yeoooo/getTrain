import React, { useState } from 'react';
import '../../style/calendar.css'
import styled from 'styled-components';

function Calendar(props){
    // 첫 화면은 현재 날짜를 선택하고 있음
    const current = new Date();
    const nowDate = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
    const nowMonth = `${current.getMonth()+1}`;
    // 달력의 요일 출력
    const DAYS_LIST = [
        {id: 0, data: 'SUN'},
        {id: 1, data: 'MON'},
        {id: 2, data: 'TUE'},
        {id: 3, data: 'WED'},
        {id: 4, data: 'THU'},
        {id: 5, data: 'FRI'},
        {id: 6, data: 'SAT'},
    ];
    // 달력의 날짜 출력
    function DateCount(){
        var thirty_first = [];
        for(var i=0; i<31; i++){
            thirty_first.push(i+1);
        }
        return thirty_first
    }

    return(
        <div className='calendar-wrapper'>
            <p>{nowMonth}월</p>

            {/* 달력 */}
            <div className='calendar-box'>
                {/* 요일 */}
                <div className='days-box'> 
                    {DAYS_LIST?.map((DAYS_LIST, key) => (
                        <p>{DAYS_LIST.data}</p>
                    ))}
                </div>
                {/* 날짜 */}
                {/* 위에 나타내는 월을 감지하여 30일/31일 출력하기 */}
                <div className='date-box'>
                    {DateCount().map((date) => (
                        <a href='#'><p key={date}>{date}</p></a>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Calendar