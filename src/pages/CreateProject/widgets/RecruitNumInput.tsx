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

const RadioInput = styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: 700;
`;

const Label = styled.label`
  display: flex;
  font-weight: 700;
`;

const NoLimitSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const NumInput = styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: 700;
  width: 3em;
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
      <NoLimitSelector>
        <RadioInput
          type="checkbox"
          id="isNoLimit"
          checked={isNoLimit}
          onChange={onChange}
        />
        <Label>제한 없음</Label>
      </NoLimitSelector>
      <NumInput
        type="number"
        id="recruitNum"
        value={recruitNum}
        onChange={onChange}
      />
    </Container>
  );
};

export default RecruitNumInput;
