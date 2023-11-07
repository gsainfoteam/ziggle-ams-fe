import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import weekday from "dayjs/plugin/weekday";
import styled from "styled-components";

dayjs.extend(weekday);
dayjs.extend(duration);

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

const TimeBlock = styled.div<{ start: Dayjs; end: Dayjs }>`
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
  background-color: #fce3e3;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const TimeBlockTitle = styled.div`
  font-size: 0.8em;
  line-height: 1.3em;
  font-weight: 700;
  color: #eb6263;
`;

const TimeBlockTimeRange = styled.div`
  color: #ff797a;
  font-size: 0.5em;
  line-height: 1em;
  font-weight: 500;
`;

const today = dayjs();

const daysOfWeek = Array(7)
  .fill(today.weekday(0))
  .map((day, i) => day.add(i, "day"));

function Calendar() {
  return (
    <CalendarContainer>
      <DayLabelContainer>
        {daysOfWeek.map((day) => (
          <DayContainer key={day.date()}>
            <DayLabel>
              <Month>{day.month()}월</Month>
              <Day isToday={day.date() === 7}>{day.date()}</Day>
            </DayLabel>
          </DayContainer>
        ))}
      </DayLabelContainer>
      <WeekContainer>
        <TimeLabelsContainer>
          {Array.from(Array(24).keys()).map((hour) => (
            <TimeLabel key={hour}>
              {hour}:00{hour < 12 ? "AM" : "PM"}
            </TimeLabel>
          ))}
        </TimeLabelsContainer>
        {daysOfWeek.map((day) => (
          <DayContainer key={day.date()}>
            {Array.from(Array(24).keys()).map((hour) => (
              <HourCell key={hour} />
            ))}
            <TimeBlock
              start={dayjs("2023-11-07 9:30")}
              end={dayjs("2023-11-07 9:00").add(150, "minute")}
            >
              <TimeBlockTitle>으아악</TimeBlockTitle>
              <TimeBlockTimeRange>9:30~12:00</TimeBlockTimeRange>
            </TimeBlock>
          </DayContainer>
        ))}
      </WeekContainer>
    </CalendarContainer>
  );
}

export default Calendar;
