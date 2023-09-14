import { Link } from "react-router-dom";
import icon from "src/assets/icon.png";
import styled from "styled-components";

const Container = styled.header`
  background-color: white;
  display: flex;
  padding: 0.5rem 1rem;
  color: #eb6263;
  justify-content: space-between;
  align-items: center;
  padding: 3px 10px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 60px;
  }

  h1 {
    margin: 0;
  }
`;

const LeftHeader = styled.div`
  display: flex;
  justify-content: space-between;

  ul {
    list-style: none;
    display: flex;
    font-size: 1.5rem;
    gap: 1.8em;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1.8em;
  
`;

const Header = () => {
  return (
    <Container>
      <LeftHeader>
        <Logo>
          <img src={icon} alt="ams icon" />
          <h1>AMS</h1>
        </Logo>
        <nav>
          <ul>
            <li>
              <Link to="/">서비스 소개</Link>
            </li>
            <li>
              <Link to="/">AMS 매뉴얼</Link>
            </li>
          </ul>
        </nav>
      </LeftHeader>
      <Actions>
        <div>name</div>
        <div>profile image</div>
      </Actions>
    </Container>
  );
};

export default Header;
