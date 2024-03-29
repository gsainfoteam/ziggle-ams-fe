import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import accountIcon from "../assets/accountIcon.svg";
import iconTextLogo from "../assets/iconTextLogo.svg";

const Container = styled.header`
  display: flex;
  padding: 0.2em 0.5em;
  color: #eb6263;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eb6263;
`;

const HomeLogo = styled(Link)`
  display: flex;
  align-items: center;

  img {
    width: 7rem;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    font-size: 1.2rem;
    gap: 2rem;

    a {
      color: inherit;
      text-decoration: none;
      font-weight: 500;
    }
  }
`;

const LoginButton = styled(Link)`
  border: 1px solid #eb6263;
  border-radius: 8px;
  background-color: white;
  padding: 0.2em 0.6em;
  font-weight: 500;
  font-size: 0.8rem;
  color: #eb6263;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #eb6263;
    color: white;
  }
  &:active {
    box-shadow: none;
  }
`;

const AccountButton = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #eb6263;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 40px;
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginState = () => {
    setIsLoggedIn((loginState) => !loginState);
  };

  return (
    <Container>
      <Actions>
        <HomeLogo to="/">
          <img src={iconTextLogo} alt="ams icon and text logo" />
        </HomeLogo>
        <nav>
          <ul>
            <li>
              <Link to="/">서비스 소개</Link>
            </li>
            <li>
              <Link to="/">사용법</Link>
            </li>
          </ul>
        </nav>
      </Actions>
      {isLoggedIn ? (
        <LoginButton to="/" onClick={toggleLoginState}>
          로그인
        </LoginButton>
      ) : (
        <AccountButton to="/" onClick={toggleLoginState}>
          crowntheking
          <img src={accountIcon} alt="account icon" />
        </AccountButton>
      )}
    </Container>
  );
};

export default Header;
