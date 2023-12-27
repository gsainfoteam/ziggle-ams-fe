import React from "react";
import styled from "styled-components";

import { WidgetTypes } from "../FormConstructor";

export interface RecruitNumInputProps {
  id: string;
  widgetType: WidgetTypes;
  recruitNum: string;
  isNoLimit: boolean;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  gap: 15px;
`;

const Title = styled.label`
  display: flex;
  font-size: 1.5em;
  font-weight: 700;
`;

const CheckBox = styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: flex;
  font-weight: 700;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const NumInput = styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: 700;
  width: 3em;
  &:focus {
    border: 1px solid #eb6263;
    outline: 1px solid #eb6263;
  }
`;

const RecruitNumInput = (
  props: RecruitNumInputProps & {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
) => {
  const { id, isNoLimit, recruitNum, onChange } = props;

  return (
    <Container id={id}>
      <Title>모집 인원</Title>
      <Label>
        <CheckBox
          type="checkbox"
          id="isNoLimit"
          checked={isNoLimit}
          onChange={onChange}
        />
        제한 없음
      </Label>
      {!isNoLimit && (
        <NumInput
          type="number"
          id="recruitNum"
          min={0}
          value={recruitNum}
          onChange={onChange}
        />
      )}
    </Container>
  );
};

export default RecruitNumInput;
