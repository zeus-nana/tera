import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";
import Menus from "./Menus.jsx";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <StyledHeader>
      <Menus>
        <UserAvatar />
        <HeaderMenu />
      </Menus>
    </StyledHeader>
  );
}

export default Header;
