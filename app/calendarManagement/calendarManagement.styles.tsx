"use client";
import styled from "styled-components";

export const CalendarManagementContainer = styled.div`
  // box-shadow: 0px 4px 10px 0px #00000014;
  //  margin: 30px 20px;
  padding: 35px 30px;

  display: flex;
  flex-direction: column;
  gap: 35px;

  .react-calendar {
    width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar__navigation {
    margin: 20px 0;
    display: none;
  }

  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #0e0404;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    background: #e7f6f0;

    padding: 10px 0;
  }

  .react-calendar__month-view__days {
    height: 500px;
  }
  /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #0e0404;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #e7f6f0;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #e7f6f0;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #e7f6f0;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #e7f6f0;
    color: #226c4c;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #e7f6f0;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #e7f6f0;
    color: #0e0404;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #e7f6f0;
    color: #0e0404;
  }
`;

export const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 0.25px solid #706d6d;
  background: #fff;
`;

export const Header = styled.div``;

export const DropdownContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;
