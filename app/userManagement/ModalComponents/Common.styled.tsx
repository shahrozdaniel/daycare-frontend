import styled from "styled-components";

export const ModalDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
`;

export const FormContainer = styled.form`
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
  display: flex;
  gap: 15px;
  width: 100%;
`;
