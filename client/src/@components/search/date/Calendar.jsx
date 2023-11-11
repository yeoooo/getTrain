import React, { useEffect, useState } from "react";
import '../../../style/calendar.css'
import styled from 'styled-components';
import { format, addMonths, subMonths, 
         isSameDay, isSameMonth, addDays, 
         parse, startOfMonth, endOfMonth , 
         startOfWeek, endOfWeek, isBefore } from 'date-fns';

const RenderMonth = ({ currentMonth, prevMonth, nextMonth }) => {

    return(
        <div>
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

    const [fromTime, setFromTime] = useState(props.fromTime); // until
    const [untilTime, setUntilTime] = useState(props.untilTime); // from

    const handleFromTime = (event) => {
        const newTime = event.target.value + ":00"; // 사용자가 선택한 새 시간
        setFromTime(newTime); // 선택된 시간을 상태로 업데이트

        let newFromTime = parse((newTime).replaceAll(":", ""),'HHmmss', new Date());
        let formattedUntilTime = parse((untilTime).replaceAll(":", ""),'HHmmss', new Date());
        // 출발 시간이 도착시간에 비해 같거나 늦는 경우 도착시간을 출발 시간 + 1 시간으로 수정
        if (newFromTime.getHours() >= formattedUntilTime.getHours()) {
            setUntilTime(((newFromTime.getHours()+1) % 24).toString().padStart(2, '0')+ ':' + newFromTime.getMinutes().toString().padStart(2, '0') + ':' + '00');
        }
        props.handleFromTime(newTime+':00');
    };
    const handleUntilTime = (event) => {
        const newTime = event.target.value+":00"; // 사용자가 선택한 새 시간
        setUntilTime(newTime); // 선택된 시간을 상태로 업데이트
        let formattedFromTime = parse((fromTime).replaceAll(":", ""),'HHmmss', new Date());
        let newUntilTime = parse((newTime).replaceAll(":", ""),'HHmmss', new Date());

        // 출발 시간이 도착시간에 비해 같거나 늦는 경우 도착시간을 출발 시간 + 1 시간으로 수정
        if ((formattedFromTime.getHours() > newUntilTime.getHours() || (formattedFromTime.getHours() >= newUntilTime.getHours() && formattedFromTime.getMinutes() >= newUntilTime.getMinutes()))){
            let hours = ((formattedFromTime.getHours()+1) % 24).toString().padStart(2, '0');
            let minutes = newUntilTime.getMinutes().toString().padStart(2, '0');
            let seconds = '00';

            setUntilTime(hours + ':' + minutes + ':' + seconds);
            alert("출발 시간이 도착 시간과 같거나 늦습니다.");
        }

        props.handleUntilTime(newTime+':00');
    };

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
        // const formattedDay = format(date, 'yyyyMMddHHmmss');
        // const parsedDay = parse(formattedDay, 'yyyyMMddHHmmss', new Date());
        const formattedDay = format(date, 'yyyyMMdd');
        const parsedDay = parse(formattedDay, 'yyyyMMdd', new Date());
        setSelectedDate(parsedDay);
        props.handleSelectedItem(parsedDay);
        // console.log(formattedDay);
    };


    return(
        <CalendarWrapper className='calendar-wrapper' open={props.isOpen}>
            <TimeInputWrapper>
                <TimeInput type={"time"} value={fromTime} onChange={handleFromTime}/> &nbsp;~&nbsp; <TimeInput type={"time"} onChange={handleUntilTime} value={untilTime}/>
            </TimeInputWrapper>
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
const TimeInput = styled.input`
    color: #ffffff;
`

const TimeInputWrapper = styled.div`
    align: "center";
    height: 3rem;
`
export default Calendar