import { Link } from "react-router-dom";
import icon from "src/assets/icon.png";
import styled from "styled-components";

const Container = styled.header`
  background-color: #eb6263;
  display: flex;
  padding: 0.5rem 1rem;
  color: white;
  justify-content: space-between;
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

const Actions = styled.div`
  display: flex;
  align-items: center;

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

const Header = () => {
  return (
    <Container>
      <Logo>
        <img src={icon} alt="ams icon" />
        <h1>GIST AMS</h1>
      </Logo>
      <Actions>
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
        <button>로그인</button>
      </Actions>
    </Container>
  );
};

export default Header;
