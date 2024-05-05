"use client";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  color: black;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 150px auto;
`;

export const ModalComponentContainer = styled.div`
  width: 100%;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  boder-radius: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  overflow: auto;
  min-height:150px;
  max-height: 600px;

  &::-webkit-scrollbar {
    width: 10px; /* Adjust scrollbar width */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db; /* Change thumb color */
    // border-radius: 2px; /* Adjust thumb border radius */
  }
`;

export const ModalChildrenContainer = styled.div`
  width: 100%;
`;

export const ModalButton = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;
  // margin-bottom: 25px;
  width: 100%;
  max-width: 826px;
`;

export const CancelButton = styled.button`
  border: 1px solid #00858e;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  border-radius: 6px;
  color: #00858e;
  outline: none;
  width: 106px;
  cursor: pointer;
`;

export const AddButton = styled.button`
  background-color: #00858e;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  border-radius: 6px;
  color: white;
  border: none;
  outline: none;
  min-width: 106px;
  cursor: pointer;
`;
