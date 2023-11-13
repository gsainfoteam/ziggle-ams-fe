import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Accordion from "./Accordion";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  /* background-color: lightgray; */
  margin: 3rem;
  margin-left: 8rem;
  margin-right: 8rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0rem 0.2rem 1.2rem -0.1rem gray;
`;

const Row = styled.div`
  /* background-color: lightgray; */
  padding: 1em;
  display: flex;
  flex-direction: row;
  margin: 1rem;
  border: none;
  border-radius: 0.5rem;
  margin-left: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

const Column = styled.div`
  /* background-color: gray; */
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: rgba(255, 250, 250, 1);
  padding: 1em;
  display: flex;
  /* border: none; */
  border-color: rgba(235, 98, 99, 1);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 8px;
  margin-left: 12px;
`;

const MoreButton = styled.button`
  background-color: rgba(255, 250, 250, 1);
  /* border: none; */
  border-color: rgba(235, 98, 99, 1);
  padding: 8px 16px;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 30px;
  color: #222222;
  width: 100%;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 6px;
  padding-left: 6px;
  position: relative;
  background: none;
  box-sizing: border-box;

  :focus {
    outline: none;
  }
  /* font-weight: 600; */
  &::placeholder {
    font-weight: 600;
  }
`;

const InputEx = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  color: #222222;
  width: 100%;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 4px;
  padding-left: 6px;
  position: relative;
  background: none;
  box-sizing: border-box;

  :focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  margin: 0.5rem 0;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 0%;
    will-change: width;
    border-bottom: 1px solid rgba(235, 98, 99, 1);
    position: absolute;
    bottom: 0;
    transition: width 0.3s ease-in-out;
    left: 50%;
    transform: translateX(-50%);
  }
  &:has(input:focus)::after {
    width: 100%;
  }
`;

const Button = styled.button`
  border: none;
  padding: 1rem;
`;

const InputDay = styled.input`
  display: flex;
  /* border: none; */
  border: solid #aaaaaa 1px;
  font-size: 16px;
  position: relative;
  padding: 5px;
  text-align: center;
  font-size: 12px;
  outline: none;
  border-radius: 0.5rem;
`;

const OptionSelect = styled.select`
  display: flex;
  border: solid #aaaaaa 1px;
  border-radius: 0.5rem;
  font-size: 16px;
  position: relative;
  padding: 7px;
  text-align: center;
  font-size: 12px;
  outline: none;
  margin: 2px;
  margin-right: 10px;
`;

const InputNumber = styled.input`
  border: solid #aaaaaa 1px;
  border-radius: 0.5rem;
  /* background-color: lightgray; */
  /* box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2); */
  outline: none;
  padding: 7px;
  font-size: 16px;
  position: relative;
  padding-left: 12px;
  font-size: 12px;
  display: flex;
  width: 38px;
`;

const InputElement = styled.input`
  border: none;
  border-bottom: solid #aaaaaa 1px;
  outline: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  border-radius: 0.5rem;
  margin: 0.5rem;
`;

const AddButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  position: relative;
  display: flex;
  margin: 0 auto;
  /* align-self: center; */
`;

const Label = styled.div`
  padding: 2px;
  padding-left: 0;
  margin-right: 4px;
  margin-left: 4px;
  font-size: 14px;
`;

const Addelement = styled.div`
  background-color: lightgray;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Arrow = styled.div``;

interface FormData {
  id: number;
  projectName: string;
  applicationDeadline: string;
  recruitmentTarget: string;
  applicationElements: Element[];
  recruitmentNumber: number;
}

interface Notice {
  text: string;
  image: string;
  expanded: boolean;
}

interface Element {
  text: string;
  options: string[];
}

interface MoreBoxProps {
  initialText: string;
  moreText: string;
}

const MoreBox = ({ initialText, moreText }: MoreBoxProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      {expanded ? moreText : initialText}
      <MoreButton onClick={toggleExpansion}>{expanded ? "▽" : "△"}</MoreButton>
    </Box>
  );
};

const CreateProjectPage = () => {
  const [formData, setFormData] = useState<FormData>({
    id: 1,
    projectName: "",
    applicationDeadline: "",
    recruitmentTarget: "",
    applicationElements: [],
    recruitmentNumber: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      recruitmentNumber: !Number.isNaN(e.target.valueAsNumber)
        ? e.target.valueAsNumber
        : 0,
    });
  };

  const handleAddElement = () => {
    const newElement: Element = {
      text: "",
      options: [],
    }; // 새 지원서 요소 초기화
    setFormData({
      ...formData,
      applicationElements: [...formData.applicationElements, newElement],
    });
  };

  const handleAddOption = (elementIndex: number) => {
    const updatedElements = [...formData.applicationElements];
    updatedElements[elementIndex].options.push(""); // Add an empty option
    setFormData({
      ...formData,
      applicationElements: updatedElements,
    });
  };

  const handleRemoveOption = (elementIndex: number, optionIndex: number) => {
    const updatedElements = [...formData.applicationElements];
    updatedElements[elementIndex].options.splice(optionIndex, 1); // Remove the option
    setFormData({
      ...formData,
      applicationElements: updatedElements,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 서버로 전송하거나 다른 필요한 작업을 수행
    console.log(formData);
  };

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleRemoveElement = (index: number) => {
    const updatedElements = [...formData.applicationElements];
    updatedElements.splice(index, 1); // 해당 인덱스의 요소를 제거
    setFormData({
      ...formData,
      applicationElements: updatedElements,
    });
  };

  const handleRecruitmentOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedOption = e.target.value;
    setFormData({
      ...formData,
      recruitmentTarget:
        selectedOption === "direct input" ? selectedOption : "",
    });
  };

  return (
    <>
      <Container>
        <Column>
          <InputWrapper>
            <Input placeholder="프로젝트 이름" />
          </InputWrapper>
          <InputWrapper>
            <InputEx placeholder="프로젝트 설명" />
          </InputWrapper>
        </Column>
        <Row>
          <Label>모집 기간: </Label>
          <InputDay
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
          <Label>~</Label>
          <InputDay
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </Row>
        <Row>
          <Label>모원 인원:</Label>
          <OptionSelect
            name="recruitmentOption"
            onChange={handleRecruitmentOptionChange}
          >
            <option value="select default" selected disabled hidden>
              --선택--
            </option>
            <option value="direct input">직접 입력</option>
            <option value="no limit">제한 없음</option>
          </OptionSelect>
          <form>
            {formData.recruitmentTarget === "direct input" && (
              <InputNumber
                type="number"
                placeholder="숫자 입력"
                name="recruitmentTarget"
                value={formData.recruitmentNumber}
                onChange={handleChange}
                required
              />
            )}
          </form>
        </Row>
        <Box>
          <Accordion
            contents={
              <div>
                <Row>
                  <Row
                    style={{
                      flexBasis: "374px",
                      flexShrink: "0",
                      height: "177px",
                      backgroundColor: "lightgray",
                      borderRadius: "0.5rem",
                    }}
                  >
                    img
                  </Row>
                  <Row>
                    지글(Ziggle)은 지스트대학 통합 공지 및 단체 홍보, 모집
                    서비스입니다. 여러분은 Ziggle에 모집 공고, 행사 홍보를 위한
                    글을 사진과 함께 작성할 수 있습니다. 지글은 지스트
                    학생이라면 누구나 이용 가능하고, 뛰어난 접근성을 갖추고
                    있습니다. 지금 바로 Ziggle에 공지를 작성해보세요!
                  </Row>
                </Row>
              </div>
            }
          />
        </Box>

        <Box>template</Box>
        <Column>
          <form onSubmit={handleSubmit}>
            {formData.applicationElements.map((element, elementIndex) => (
              <div key={elementIndex}>
                <InputElement
                  placeholder={`지원서 요소 ${elementIndex + 1}`}
                  name={`element_${elementIndex}`}
                  value={element.text}
                  onChange={(e) => {
                    const updatedElements = [...formData.applicationElements];
                    updatedElements[elementIndex].text = e.target.value;
                    setFormData({
                      ...formData,
                      applicationElements: updatedElements,
                    });
                  }}
                />
                <Button onClick={() => handleRemoveElement(elementIndex)}>
                  삭제
                </Button>

                {element.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <InputElement
                      placeholder={`옵션 ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedElements = [
                          ...formData.applicationElements,
                        ];
                        updatedElements[elementIndex].options[optionIndex] =
                          e.target.value;
                        setFormData({
                          ...formData,
                          applicationElements: updatedElements,
                        });
                      }}
                    />
                    <Button
                      onClick={() =>
                        handleRemoveOption(elementIndex, optionIndex)
                      }
                    >
                      삭제
                    </Button>
                  </div>
                ))}

                <Button onClick={() => handleAddOption(elementIndex)}>
                  옵션 추가
                </Button>
              </div>
            ))}
            <Column>
              <AddButton onClick={handleAddElement}>
                지원서 요소 추가하기
              </AddButton>
            </Column>
          </form>
        </Column>

        <Column>
          <Button type="submit">제출</Button>
        </Column>
      </Container>
    </>
  );
};

export default CreateProjectPage;
