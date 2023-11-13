import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import minMax from "dayjs/plugin/minMax";
import weekday from "dayjs/plugin/weekday";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "src/pages/Board/components/Modal/Modal";
import useModal from "src/pages/Board/components/Modal/useModal";
import styled from "styled-components";

dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(minMax);

const calendarWidth = "800px";
const calendarHeight = "800px";
const hourCellHeight = "50px";
const TimeLabelWidth = "4rem";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calendarWidth};
  height: ${calendarHeight};
`;

const WeekContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0.5em 0;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DayContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

const HourCell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 ${hourCellHeight};
  border: 0.5px solid lightgray;
  box-sizing: border-box;
`;

const DayLabelContainer = styled.div`
  display: flex;
  width: ${`calc(100% - ${TimeLabelWidth})`};
  height: 5em;
  margin-left: ${TimeLabelWidth};
`;

const DayLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const Month = styled.div`
  color: lightgray;
  font-size: 0.8em;
  line-height: 1.2em;
`;

const Day = styled.div<{ isToday: boolean }>`
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.2em;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;

  background-color: ${({ isToday }) => (isToday ? "#fcd2d2" : "white")};

  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

const TimeLabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TimeLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: ${TimeLabelWidth};
  flex: 0 0 ${`calc(${hourCellHeight} + 0.5em)`};
  align-items: end;
  font-size: 0.8em;
  line-height: 1em;
  margin-top: -0.5em;

  color: lightgray;
`;

const TimeBlockColors = {
  pink: {
    title: "#EB6263",
    background: "#FCE3E3",
    time: "#FF797A",
  },
  lavendar: {
    title: "#BF60BC",
    background: "#FFE4FE",
    time: "#F38BEF",
  },
  sky: {
    title: "#4F9DB7",
    background: "#D7F5FF",
    time: "#66BAD6",
  },
  lemon: {
    title: "#BAB543",
    background: "#FFFCBB",
    time: "#C6C275",
  },
  lime: {
    title: "#7AAC48",
    background: "#E8FFD1",
    time: "#87CF3E",
  },
};

interface TimeBlockColor {
  title: string;
  background: string;
  time: string;
}

interface TimeBlockProps {
  start: Dayjs;
  end: Dayjs;
  backgroundColor: string;
  outlineColor: string;
  hover?: boolean;
}

const TimeBlock = styled.div<TimeBlockProps>`
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
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 5px;
  /* &:hover { */
  cursor: ${({ hover }) => hover && "pointer"};
  outline: 0px solid ${({ outlineColor }) => outlineColor};
  outline-width: ${({ hover }) => hover && "1px"};
  /* } */
`;

const TimeBlockTitle = styled.div<{ color: string }>`
  font-size: 0.8em;
  line-height: 1.3em;
  font-weight: 700;
  color: ${({ color }) => color};
`;

const TimeBlockTimeRange = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 0.5em;
  line-height: 1em;
  font-weight: 500;
`;

const today = dayjs();

const daysOfWeek: Dayjs[] = Array(7)
  .fill(today.weekday(0))
  .map((day, i) => day.add(i, "day"));

const timeBlocksData = [
  {
    title: "으아악",
    id: "9d8ysuhfj",
    start: dayjs("2023-11-13 9:30"),
    end: dayjs("2023-11-13 11:15"),
  },
  {
    title: "이이잉",
    id: "9d8sadfdshfj",
    start: dayjs("2023-11-14 11:20"),
    end: dayjs("2023-11-14 15:40"),
  },
  {
    title: "우오어",
    id: "dfdshfj",
    start: dayjs("2023-11-15 09:10"),
    end: dayjs("2023-11-15 10:20"),
  },
  {
    title: "에잉쯧",
    id: "dfds3984hfj",
    start: dayjs("2023-11-15 14:10"),
    end: dayjs("2023-11-15 18:50"),
  },
  {
    title: "살려주",
    id: "dfds39j",
    start: dayjs("2023-11-15 11:10"),
    end: dayjs("2023-11-17 14:00"),
  },
]
  .sort(
    ({ start: start1, end: end1 }, { start: start2, end: end2 }) =>
      start1.diff(start2) || end2.diff(end1),
  )
  .map((data, index) => ({
    ...data,
    color:
      Object.values(TimeBlockColors)[
        index % Object.keys(TimeBlockColors).length
      ],
  }));

interface TimeBlockData {
  title: string;
  id: string;
  start: Dayjs;
  end: Dayjs;
  color: TimeBlockColor;
}

function Calendar() {
  const { isOpen, openModal, closeModal } = useModal();
  const [hoverId, setHoverId] = useState<string>();

  return (
    <CalendarContainer>
      <DayLabelContainer>
        {daysOfWeek.map((day) => (
          <DayContainer key={day.date()}>
            <DayLabel>
              <Month>{day.month()}월</Month>
              <Day isToday={day.date() === today.date()}>{day.date()}</Day>
            </DayLabel>
          </DayContainer>
        ))}
      </DayLabelContainer>
      <WeekContainer>
        <TimeLabelsContainer>
          {[...Array(24)].map((_, hour) => (
            <TimeLabel key={hour}>{hour}:00</TimeLabel>
          ))}
        </TimeLabelsContainer>
        {daysOfWeek.map((day) => (
          <DayContainer key={day.date()}>
            {[...Array(24)].map((_, hour) => (
              <HourCell key={hour} onClick={openModal} />
            ))}
            {timeBlocksData
              .filter(({ start, end }) =>
                day.isBetween(start, end, "day", "[]"),
              )
              .map(({ id, start, end, color, title }: TimeBlockData) => (
                <TimeBlock
                  key={id}
                  start={dayjs.max(start, day.startOf("day")) ?? day}
                  end={dayjs.min(end, day.endOf("day")) ?? day}
                  backgroundColor={color.background}
                  outlineColor={color.title}
                  hover={hoverId === id}
                  onMouseMove={() => setHoverId(id)}
                  onMouseLeave={() => setHoverId(undefined)}
                >
                  <TimeBlockTitle color={color.title}>{title}</TimeBlockTitle>
                  <TimeBlockTimeRange color={color.time}>
                    {start.format("H:mm")}~{end.format("H:mm")}
                  </TimeBlockTimeRange>
                </TimeBlock>
              ))}
          </DayContainer>
        ))}
      </WeekContainer>
      {isOpen &&
        createPortal(
          <Modal
            title="모집 프로젝트 삭제"
            closeModal={closeModal}
            action={() => {
              console.log("Action");
            }}
            actionName="삭제하기"
            description={`이것은 description`}
            textInputProps={[
              {
                name: "이것은 text input",
                showLabel: true,
                placeholder: "placeholder",
              },
            ]}
          />,
          document.body,
        )}
    </CalendarContainer>
  );
}

export default Calendar;
