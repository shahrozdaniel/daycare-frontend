"use client";
import styled from "styled-components";

export const ClassroomActionContainer = styled.div`
// box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08),
// 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
margin: 25px 32px;
padding: 35px 45px;
gap: 35px;

 
`;

export const SliderContainer = styled.div``;

export const TableContainer = styled.div`
  margin-top: 50px;
`;

export const SliderBox = styled.div`
  border: 2px solid #E2E2E2;
  border-radius: 16px;
  width:100%;
  max-width: 160px;
  height: 170px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  gap: 15px !important;
  padding: 15px 0px 0px 0px !important;
  cursor: pointer;
   transition: border-color 0.3s;
  // background-color:white;

  &:hover,
  &:focus {
    border-color: ##CEEEE2; /* Green color */
    outline: none; /* Remove default focus outline */
  }
  box-shadow: 0px 4px 10px 0px #00000014;
`;

export const IconBox = styled.div``;
