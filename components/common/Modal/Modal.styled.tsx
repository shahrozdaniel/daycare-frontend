"use client";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
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
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  max-height: 600px;
  overflow: auto;
`;

export const SmallModalComponentContainer = styled.div`
  width: 20%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  max-height: 600px;
  overflow: auto;
  padding: 20px;
  border-radius: 10px;
`;

export const ModalChildrenContainer = styled.div`
  width: 100%;
  overflow-y: auto;
`;
export const ConfirmationComponentContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  max-height: 600px;
  overflow: auto;
  padding: 20px;
  border-radius: 10px;
`;
export const ConfirmationModalChildrenContainer = styled.div`
  width: 100%;
  overflow-y: hidden;
  overflow-y: hidden;
`;
export const ModalButton = styled.div`
  display: flex;
  background-color: #f5f5f5;
  justify-content: end;
  width: 100%;
  gap: 15px;
`

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
  height:40px;
`;

// export const AddButton = styled.button`
//   background-color: #00858e;
//   padding: 8px 16px;
//   font-size: 16px;
//   font-weight: 500;
//   line-height: 24px;
//   letter-spacing: 0em;
//   text-align: center;
//   border-radius: 6px;
//   color: white;
//   border: none;
//   outline: none;
//   width: 106px;
//   cursor: pointer;
//   height:40px;

// `;
export const AddButton = styled.button`
  background-color: ${props => props.disabled ? '#ccc' : '#00858e'};
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
  width: 106px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  height: 40px;
  
  &:hover {
    background-color: ${props => !props.disabled && '#007278'};
  }
`;
