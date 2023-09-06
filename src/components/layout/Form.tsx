import { useState } from "react"
import './Form.css'

const Form = () => {
  const options = Array.from({length:50}, (v, i)=>i+1);
  return(
    <div className="main">
      <div className="form">
        <input type="text" name="project" placeholder="프로젝트 이름" />
        </div>
      <div className="form">
        <h2>모집 기간</h2>
        <input 
          type="date"
          name="dateFrom"
          placeholder="YY/MM/DD"/>
        <h2>~</h2>
        <input 
          type="date"
          name="dateTo"
          placeholder="YY/MM/DD"/>
      </div>
      <div className="form">
        <h2>모집 인원</h2>
        <select>{options}</select>
      </div>

      <div className="box">
        <div className="title">
         <h3>🔥 혹시 지글(Ziggle)에 공지를 올리셨나요?</h3>
        <button>X</button>
        </div>
        <div className="title">
          <div>image</div>
          <p>지글(Ziggle)은 지스트대학 통합 공지 및 단체 홍보, 모집 서비스입니다.<br></br>
            여러분은 Ziggle에 모집 공고, 행사 홍보를 위한 글을 사진과 함께 작성할 수 있습니다.<br></br>
            지글은 지스트 학생이라면 누구나 이용 가능하고, 뛰어난 접근성을 갖추고 있습니다.<br></br>
            지금 바로 Ziggle에 공지를 작성해보세요!</p>
        </div>
        <button className="title">🔥 지글(ziggle)에 공지 작성하기</button>
      </div>
      
      <div className="box">
        <div className="title">
          <h3>📚 템플릿으로 빠르게 시작하기</h3>
        </div>
        <div className="title">

        </div>
        <button className="title">📚 템플릿 불러오기</button>
      </div> 
    </div>
  )
}

export default Form