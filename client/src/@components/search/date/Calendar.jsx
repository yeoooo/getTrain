import React, { useState } from 'react';
import '../../../style/calendar.css'
import styled from 'styled-components';
import { format, addMonths, subMonths, 
         isSameDay, isSameMonth, addDays, 
         parse, startOfMonth, endOfMonth , 
         startOfWeek, endOfWeek, isBefore } from 'date-fns';

const RenderMonth = ({ currentMonth, prevMonth, nextMonth }) => {
    return(
        <div >
            {/* 이전 다음달 아이콘 */}
            <div className='month-header'>
                <img src='../../src/assets/calendar_arrow.png' onClick={prevMonth} style={{transform: 'rotate(180deg)', margin: '0 0 1rem 0'}}/>
                <div className='month'>
                    <span> {format(currentMonth, 'M')}월 </span>
                    {format(currentMonth, 'yyyy')}
                </div>
                <img src='../../src/assets/calendar_arrow.png' onClick={nextMonth} style={{margin: '0 0 1.3rem 0'}}/>
            </div>
        </div>
    )
}

// 달력의 날짜 출력
const RenderDate = ({ currentMonth, selectedDate, onClickDate }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    const today = new Date(); // 오늘 날짜 할당
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate){
        for(let i = 0; i < 7; i++){
            // 1 ~ 31 숫자로 포맷
            formattedDate = format(day, 'd');
            const copyDay = day;

            days.push(
                <div className={`col ${ 
                        !isSameMonth(day, monthStart) ? 'disabled'
                        : isSameDay(day, selectedDate) ? 'selected' // 현재 날짜 표시 
                        : isBefore(day, today) ? 'not-valid' // 오늘 날짜 기준 이전 날짜는 선택할 수 없음
                        : format(currentMonth, 'M') !== format(day, 'M') ? 'non-valid' 
                        : 'valid'
                    }`}
                    key={day}
                    onClick={() => onClickDate(copyDay)}
                >
                    <span className={ format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'text not-valid' : ''
                    }>
                    {/* 각 날짜 표시 */}
                    {formattedDate}
                    </span>
                </div>,
                
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className='date-box'>{rows}</div>;
};


function Calendar(props){
    // 기본화면은 현재 날짜를 선택
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    
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


    // 다음 달로 이동
    const prevMonth= () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    // 이전 달로 이동
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    // 날짜 선택
    const onClickDate = (date) => {
        const formattedDay = format(date, 'yyyyMMddHHmmss');
        const parsedDay = parse(formattedDay, 'yyyyMMddHHmmss', new Date());
        setSelectedDate(parsedDay);
        props.handleSelectedItem(parsedDay);
        // console.log(formattedDay);
    };


    return(
        <CalendarWrapper className='calendar-wrapper' open={props.isOpen}>
            {/* 달 */}
            <RenderMonth currentMonth={currentMonth}
                         prevMonth={prevMonth}
                         nextMonth={nextMonth}
            />

            {/* 달력 */}
            <div className='calendar-box'>
                {/* 요일 */}
                <div className='days-box'> 
                    {DAYS_LIST?.map((DAYS_LIST, key) => (
                        <p>{DAYS_LIST.data}</p>
                    ))}
                </div>
                {/* 날짜 */}                
                <RenderDate currentMonth={currentMonth}
                            selectedDate={selectedDate}
                            onClickDate={onClickDate}
                />
            </div>
        </CalendarWrapper>
    );
}

const CalendarWrapper = styled.div`
    opacity: ${({ open }) => (open ? '1' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    max-height: ${({ open }) => (open ? '60rem' : '0')};
    transition: opacity 0.1s, visibility 0.3s, max-height 0.7s;
`

export default Calendar