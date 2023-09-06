import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="contents">
        <div>로고</div>
        <h2>GIST AMS</h2>
        <nav className="navigation">
          <ul>
            <li>
              <a href ='service'>서비스 소개</a>
            </li>
            <li>
              <a href ='method'>사용법</a>
            </li>
            <li>
              <a href ='profile'>이름</a>
            </li>
          </ul>
        </nav>
      </div>
      
    </header>
  )
}

export default Header