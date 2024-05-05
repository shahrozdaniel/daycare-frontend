"use client";
import styled from "styled-components";

export const DailyReportContainer = styled.div`
  box-shadow: 0px 4px 10px 0px #00000014;
  margin: 20px;
  padding: 35px 45px;
  display: flex;
  gap: 20px;
  background: #2e3f3f;
`;

export const ProfileContainer = styled.div`
  background: white;
  border-radius: 28px;
  width: 100%;
  max-width: 270px;
  height: 36rem;
  box-shadow: 0px 24px 60px 0px #0000001f;
  box-shadow: 0px 8px 20px 0px #0000000f;
  padding-top: 15px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ImgContainer = styled.div``;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

export const ProfileName = styled.div`
  width: 203px;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  background: #fff0be;
  border-radius: 16px;
  margin-top: 10px;
`;

export const ProfileButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const ButtonInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: start;
  align-items: center;
  border: 1px solid #3a70e2;
  padding: 10px 15px;
  background-color: white;
  cursor: pointer;
`;

export const IconContainer = styled.div``;

export const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  overflow-y: scroll;
  padding-right: 25px;
  height: 36rem;

  // ::-webkit-scrollbar {
  //   width: 20px;
  // }

  // /* Track */
  // ::-webkit-scrollbar-track {
  //   box-shadow: inset 0 0 5px grey;
  //   border-radius: 10px;
  // }

  // /* Handle */
  // ::-webkit-scrollbar-thumb {
  //   background: red;
  //   border-radius: 10px;
  // }

  // /* Handle on hover */
  // ::-webkit-scrollbar-thumb:hover {
  //   background: #b30000;
  // }
`;

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`;

export const HeaderBar = styled.div`
  // background: #F7F7F7;
  border-radius: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 35px 0px 15px;

 
`;

export const ActivityInfo = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 8px;
  margin-bottom: 15px;
`;

export const ActivityContainer = styled.div`
  box-shadow: 0px 4px 10px 0px #00000014;
  box-shadow: 0px 1px 4px 0px #0000000a;
  padding: 8px 8px 10px 8px;
  margin-top: 10px;
`;

export const ActivityDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const NameTimeDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Description = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0 0 25px;
`;
