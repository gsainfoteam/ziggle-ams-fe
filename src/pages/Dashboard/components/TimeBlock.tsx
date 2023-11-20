import dayjs from "dayjs";
import { forwardRef } from "react";
import styled from "styled-components";

import { hourCellHeight } from "./cssConst";

interface TimeBlockProps {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  day: dayjs.Dayjs;
  title: string;
  blockColor: {
    title: string;
    background: string;
    time: string;
  };
  hover?: boolean;
}

const Container = styled.div<Omit<TimeBlockProps, "day">>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${({ start }) =>
    `calc(${
      start.diff(start.startOf("day"), "minute") / 60
    } * ${hourCellHeight})`};
  left: 3px;
  width: calc(100% - 6px - 10px);
  height: ${({ start, end }) =>
    `calc(${
      dayjs.duration(end.diff(start)).asMinutes() / 60
    } * ${hourCellHeight} - 2px - 10px)`};
  min-height: calc(0.8em + 0.5em + 0.1em);
  border-radius: 5px;
  background-color: ${({ blockColor }) => blockColor.background};
  padding: 5px;
  cursor: ${({ hover }) => hover && "pointer"};
  outline: 0px solid ${({ blockColor }) => blockColor.title};
  outline-width: ${({ hover }) => hover && "1px"};
`;

const TimeBlockTitle = styled.div<{ color: string }>`
  font-size: 0.8em;
  line-height: 1.3em;
  font-weight: 700;
  color: ${({ color }) => color};
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TimeBlockTimeRange = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 0.5em;
  line-height: 1em;
  font-weight: 500;
  user-select: none;
`;

const TimeBlock = forwardRef<
  HTMLDivElement,
  TimeBlockProps & React.HTMLAttributes<HTMLDivElement>
>(function TimeBlock({ start, end, day, ...props }, ref) {
  return (
    <Container
      ref={ref}
      start={dayjs.max(start, day.startOf("day")) ?? day}
      end={dayjs.min(end, day.endOf("day")) ?? day}
      {...props}
    >
      <TimeBlockTitle color={props.blockColor.title}>
        {props.title}
      </TimeBlockTitle>
      <TimeBlockTimeRange color={props.blockColor.time}>
        {start.format("H:mm")}~{end.format("H:mm")}
      </TimeBlockTimeRange>
    </Container>
  );
});

export default TimeBlock;
