"use client";
import styled from "styled-components";

export const SubscriptionManagementContainer = styled.div`
  box-shadow: 0px 4px 10px 0px #00000014;
  margin: 20px;
  padding: 35px 45px;
  display: flex;
  gap: 35px;
`;

export const SubscriptionContainer = styled.div`
  background: #fff7e1b2;
  border-radius: 28px;
  width: 100%;
  max-width: 318px;
  height: 500px;
  box-shadow: 0px 24px 60px 0px #0000001f;
  box-shadow: 0px 8px 20px 0px #0000000f;
  padding: 40px 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 31px;

  @media screen and (max-width: 1024px) {
    width: auto;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 31px;
`;

export const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const ModuleContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 242px;
  height: 64px;
  background: var(--neutral-1, #fff);

  /* Elevation 3 */
  box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.08),
    0px 2px 20px 0px rgba(0, 0, 0, 0.04);
`;

export const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  overflow-y: scroll;
  padding-right: 25px;
  height: 600px;
`;

export const HeaderBar = styled.div`
  background: #f7f7f7;
  border-radius: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 35px 10px 25px;
`;

export const ActivityInfo = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  background: white;
`;

export const ActivityContainer = styled.div`
  box-shadow: 0px 4px 10px 0px #00000014;
  box-shadow: 0px 1px 4px 0px #0000000a;
  padding: 8px 8px 10px 8px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 21px;
  /* justify-content: space-around; */
  align-items: center;
`;
