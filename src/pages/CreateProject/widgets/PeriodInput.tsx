import React from "react";
import styled from "styled-components";

import { WidgetTypes } from "../FormConstructor";

export interface PeriodInputProps {
  id: string;
  widgetType: WidgetTypes;
  start: {
    id: string;
    placeholder: string;
    required: boolean;
    value: string;
  };
  end: {
    id: string;
    placeholder: string;
    required: boolean;
    value: string;
  };
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

const PeriodInput = (
  props: PeriodInputProps & {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
) => {
  const { id, start, end, onChange } = props;

  return (
    <Container id={id}>
      <Title>모집 기간</Title>
      <DatePicker type="date" {...start} onChange={onChange} />
      ~
      <DatePicker type="date" {...end} onChange={onChange} />
    </Container>
  );
};

export default PeriodInput;
