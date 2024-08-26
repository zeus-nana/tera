import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function Settings() {
  return (
    <StyledSettings>
      {/*<Row type="horizontal">*/}
      {/*  <Heading type="h1">Settings</Heading>*/}
      {/*</Row>*/}
      <Outlet />
    </StyledSettings>
  );
}

export default Settings;
