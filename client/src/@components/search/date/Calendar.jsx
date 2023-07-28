import React, { useState } from 'react';
import '../../../style/calendar.css'
import styled from 'styled-components';
import { format, addMonths, subMonths } from 'date-fns';
import { isSameDay, isSameMonth, addDays, parse } from 'date-fns';
import { startOfMonth, endOfMonth ,startOfWeek, endOfWeek } from 'date-fns';

const RenderMonth = ({ currentMonth, prevMonth, nextMonth }) => {
    return(
        <div >
            <div>
                {format(currentMonth, 'M')}월
                {format(currentMonth, 'yyyy')}
            </div>
            {/* 이전 다음달 아이콘 */}
            <div>

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
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate){
        for(let i = 0; i < 7; i++){
            formattedDate = format(day, 'd');
            const copyDay = day;
            days.push(
                <div className={`col cell ${ !isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                        ? 'selected'
                        : format(currentMonth, 'M') !== format(day, 'M')
                        ? 'non-valid' 
                        : 'valid'
                    }`}
                    key={day}
                    onClick={() => onClickDate(parse(copyDay))}
                >
                    <span className={ format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'text not-valid' : ''
                    }>
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
        setSelectedDate(date);
    };

    return(
        <div className='calendar-wrapper'>
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
        </div>
    );
}

export default Calendar