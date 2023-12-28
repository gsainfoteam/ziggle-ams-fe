import React from "react";
import styled from "styled-components";

import { WidgetTypes } from "../FormConstructor";

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

const DatePicker = styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-weight: 700;
  &:focus {
    border: 1px solid #eb6263;
    outline: 1px solid #eb6263;
  }
  &:hover {
    cursor: pointer;
  }
`;

export interface DurationInputWidgetData {
  id: string;
  widgetType: WidgetTypes.DurationInput;
  start: {
    name: "start";
    placeholder: string;
    value: string;
  };
  end: {
    name: "end";
    placeholder: string;
    value: string;
  };
}

export interface DurationInputProps extends DurationInputWidgetData {
  key: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DurationInput = (props: DurationInputProps) => {
  const { id, start, end, onChange } = props;

  return (
    <Container id={id}>
      <Title>모집 기간</Title>
      <DatePicker type="date" id={id} {...start} onChange={onChange} />
      ~
      <DatePicker type="date" id={id} {...end} onChange={onChange} />
    </Container>
  );
};

export default DurationInput;
