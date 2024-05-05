"use client";
import styled from "styled-components";

export const MainPageContainer = styled.div`
  box-shadow: 0px 4px 10px 0px #00000014;
  box-shadow: 0px 1px 4px 0px #0000000a;
  margin: 20px;
  padding: 35px 45px;
  display: flex;
  flex-direction: column;
  gap: 35px;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;
