"use client";
import styled from "styled-components";

export const ModalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 600px;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  // border-bottom: 0.25px solid #000000;
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  color: #4b4b4b;
  background-color: #eefcfc;
  z-index: 20;
`;

export const ModalInputContainer = styled.div`
  display: flex;
  width: 100%;
  // gap: 12px;
  row-gap: 1.25rem;
  column-gap: 1rem;
`;

export const FormButton = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
`;

export const ScrollableFormContainer = styled.div`
  width: 100%;
  flex-grow: 1; /* Takes up all available space between header and footer */
  overflow-y: auto; /* Enables vertical scrolling */
`;

export const FormContainer = styled.form`
  padding: 18px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

export const ButtonContainer = styled.form`
  padding: 18px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

export const TwoInputContainer = styled.div`
  display: flex !important;
  // gap: 15px !important;
  row-gap: 1.25rem;
  column-gap: 1rem;
  width: 100% !important;
  color: "black" !important;
  margin: 2px 2px;
`;
