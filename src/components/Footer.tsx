import { Link } from "react-router-dom";
import styled from "styled-components";

import githubLogo from "../assets/githubLogo.svg";
import infoteamText from "../assets/infoteamText.svg";
import instagramLogo from "../assets/instagramLogo.svg";

const Container = styled.footer`
  display: flex;
  height: 250px;
  padding: 0 290px;
  justify-content: space-around;
  border-top: 1px solid #eb6263;
`;

const FooterSection = styled.section`
  width: 300px;
  height: 100%;
  padding: 30px 0;
  color: #eb6263;
  box-sizing: border-box;

  h3 {
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    list-style: none;
    font-weight: 500;
    padding: 0.2em 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const InfoteamTextLogo = styled.div`
  margin-top: 10px;
  img {
    width: 210px;
  }
  p {
    margin: 0;
    font-weight: 500;
    line-height: 50%;
    font-size: 12px;
  }
`;

const SocialLinksContainer = styled.div`
  margin: 15px 0;

  ul {
    overflow: auto;
    li {
      float: left;
      margin-right: 10px;
      img {
        width: 30px;
      }
    }
  }
`;

const Copyright = styled.p`
  padding-top: 30px;
  font-size: 12px;
`;

const Footer = () => {
  return (
    <Container>
      <FooterSection>
        <InfoteamTextLogo>
          <img src={infoteamText} />
          <p>지스트대학 총학생회 산하 정보국</p>
        </InfoteamTextLogo>
        <SocialLinksContainer>
          <ul>
            <li>
              <Link to="/">
                <img src={instagramLogo} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src={githubLogo} />
              </Link>
            </li>
          </ul>
        </SocialLinksContainer>
        <Copyright>ⓒ 2023. INFOTEAM. All rights reserved.</Copyright>
      </FooterSection>
      <FooterSection>
        <h3>소개</h3>
        <ul>
          <li>
            <Link to="/">인포팀 소개</Link>
          </li>
        </ul>
      </FooterSection>
      <FooterSection>
        <h3>약관</h3>
        <ul>
          <li>
            <Link to="/">서비스 이용 약관</Link>
          </li>
          <li>
            <Link to="/">개인정보 처리 방침</Link>
          </li>
          <li>
            <Link to="/">문의</Link>
          </li>
        </ul>
      </FooterSection>
      <FooterSection>
        <h3>바로가기</h3>
        <ul>
          <li>
            <Link to="/">Ziggle(지글)</Link>
          </li>
          <li>
            <Link to="/">GIST 홈페이지</Link>
          </li>
        </ul>
      </FooterSection>
    </Container>
  );
};

export default Footer;
