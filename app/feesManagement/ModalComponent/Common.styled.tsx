import styled from "styled-components";

export const ModalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 40px;
  padding-bottom: 80px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 0.25px solid #000000;
  width: 100%;
  text-align: center;
`;

export const FormContainer = styled.div`
  padding: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 826px;
`;

export const TwoInputContainer = styled.div`
  display: flex !important;
  gap: 15px !important;
  width: 100% !important;
  color: "black" !important;
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
