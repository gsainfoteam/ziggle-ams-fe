import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { calendarWidth, hourCellHeight, TimeLabelWidth } from "./cssConst";

const Line = styled.div<{ minute: number }>`
  left: ${TimeLabelWidth};
  width: 100%;
  height: 1px;
  background-color: #eb6263;
  position: absolute;
  top: ${({ minute }) => `calc(${minute} * ${hourCellHeight} + 0.5em)`};
`;

const Label = styled.div`
  position: absolute;
  top: 0;
  left: -0.25em;
  transform: translate(-100%, -50%);
  color: #eb6263;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5em;
  line-height: 1em;
  font-weight: 500;
  user-select: none;
`;

const Triangle = styled.div<{ day: number }>`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;

  border-left: 10px solid red;
  position: absolute;
  top: -5px;
  left: ${({ day }) =>
    `calc((${calendarWidth} - ${TimeLabelWidth}) / 7 * ${day})`};
`;

const TimeIndicator = () => {
  const [now, setNow] = useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1e3);
    return () => clearInterval(timer);
  }, []);
  return (
    <Line minute={now.diff(now.startOf("day"), "minute", true) / 60}>
      <Label>{now.format("H:mm")}</Label>
      <Triangle day={now.day()} />
    </Line>
  );
};

export default TimeIndicator;
