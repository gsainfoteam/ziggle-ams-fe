import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import minMax from "dayjs/plugin/minMax";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import calendarIcon from "src/assets/calendarIcon.png";
import CircularButton from "src/pages/Board/components/CircularButton";
import {
  modalPaperPadding,
  modalPaperWidth,
} from "src/pages/Board/components/Modal/ModalPaper";
import styled from "styled-components";

import {
  calendarHeight,
  calendarWidth,
  hourCellHeight,
  TimeLabelWidth,
} from "./cssConst";
import EditTimeBlockModal from "./EditTimeBlockModal";
import TimeBlock from "./TimeBlock";

dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(minMax);

const CalendarContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: ${calendarWidth};
  height: ${calendarHeight};
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 20px 40px 20px 20px;
  justify-content: center;
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
    background: "#fce3e3",
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

interface WeekShiftButtonProps {
  direction: "right" | "left";
}
const WeekShiftButton = styled(CircularButton)<WeekShiftButtonProps>`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  ${({ direction }) => (direction === "right" ? `right: 0px` : `left: 0px`)}
`;

const CalendarTitleSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const CalendarIcon = styled.img`
  width: 1.5em;
`;

const CalendarTitle = styled.div`
  font-weight: 700;
  font-size: 1.5em;
  margin-left: 0.5em;
`;

export interface TimeBlockData {
  title: string;
  id: string;
  start: Dayjs;
  end: Dayjs;
  color: TimeBlockColor;
}

export interface EditTimeBlockProps {
  id: string;
  title?: string;
  start?: Dayjs;
  end?: Dayjs;
}

function Calendar() {
  const [daysOfWeek, setDaysOfWeek] = useState(
    Array(7)
      .fill(dayjs().weekday(0))
      .map((day, i) => day.add(i, "day")),
  );
  const [activeId, setActiveId] = useState<string>();
  const [editingId, setEditingId] = useState<string>();
  const boundaryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [timeBlocksData, setTimeBlocksData] = useState(
    [
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
      {
        title: "으아아아아악",
        id: "9d8ysuhf",
        start: dayjs("2023-11-19 9:30"),
        end: dayjs("2023-11-19 11:15"),
      },
      {
        title: "이이이잉",
        id: "9d8sadfdshf",
        start: dayjs("2023-11-20 11:20"),
        end: dayjs("2023-11-20 15:40"),
      },
      {
        title: "우오어우오",
        id: "dfdshf",
        start: dayjs("2023-11-21 09:10"),
        end: dayjs("2023-11-21 10:20"),
      },
      {
        title: "에잉쯧쯧",
        id: "dfds3984hf",
        start: dayjs("2023-11-21 14:10"),
        end: dayjs("2023-11-21 18:50"),
      },
      {
        title: "살려",
        id: "dfds39",
        start: dayjs("2023-11-21 11:10"),
        end: dayjs("2023-11-23 14:00"),
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
      })),
  );
  const [, setIsEditing] = useState(false);
  const timeBlockRefs = useRef<Record<string, Record<number, HTMLDivElement>>>(
    {},
  );
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  const editTimeBlock = (newTimeBlockData: EditTimeBlockProps) => {
    setTimeBlocksData((timeBlocksData) => {
      const index = timeBlocksData.findIndex(({ id }) => id === editingId);
      console.log(timeBlocksData[index]);
      return [
        ...timeBlocksData.slice(0, index),
        { ...timeBlocksData[index], ...newTimeBlockData },
        ...timeBlocksData.slice(index + 1),
      ];
    });
  };

  const deleteTimeBlock = () => {
    setTimeBlocksData((timeBlocksData) =>
      timeBlocksData.filter(({ id }) => id !== editingId),
    );
    setEditingId(undefined);
    setActiveId(undefined);
    setIsEditing(false);
  };

  const getActiveTimeBlockXPos = () => {
    if (!editingId) return 0;
    const current = timeBlockRefs.current[editingId];
    if (Object.keys(current).length === 0) return 0;
    const { x, width } = Object.values(current)
      .map((v) => v.getBoundingClientRect())
      .sort(({ x: x1 }, { x: x2 }) => x2 - x1)[0];
    const paperWidth = Number.parseInt(modalPaperWidth, 10);
    const paperPadding = Number.parseInt(modalPaperPadding, 10);
    const calendarRight =
      calendarContainerRef.current?.getBoundingClientRect().right ?? 0;

    const left = x + width + 5;
    if (left + paperWidth < calendarRight) return left;
    return x - paperWidth - paperPadding * 2 - 5;
  };
  const nextWeek = () => {
    setDaysOfWeek((daysOfWeek) => daysOfWeek.map((day) => day.add(7, "day")));
  };
  const previousWeek = () => {
    setDaysOfWeek((daysOfWeek) =>
      daysOfWeek.map((day) => day.subtract(7, "day")),
    );
  };

  useEffect(() => {
    setEditingId(undefined);
  }, [daysOfWeek]);

  return (
    <CalendarContainer ref={calendarContainerRef}>
      <CalendarTitleSection>
        <CalendarIcon src={calendarIcon} alt={"calendarIcon"} />
        <CalendarTitle>일정 관리</CalendarTitle>
      </CalendarTitleSection>
      <WeekShiftButton direction={"left"} onClick={previousWeek}>
        <MdChevronLeft size={50} />
      </WeekShiftButton>
      <WeekShiftButton direction={"right"} onClick={nextWeek}>
        <MdChevronRight size={50} />
      </WeekShiftButton>
      <DayLabelContainer>
        {daysOfWeek.map((day) => (
          <DayContainer key={day.date()}>
            <DayLabel>
              <Month>{day.month()}월</Month>
              <Day isToday={day.date() === dayjs().date()}>{day.date()}</Day>
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
        {daysOfWeek.map((day, i) => (
          <DayContainer
            key={day.date()}
            ref={(element) => (boundaryRefs.current[i] = element)}
            onMouseDown={(
              clickEvent: React.MouseEvent<Element, MouseEvent>,
            ) => {
              if (activeId !== undefined) return;
              const id = Math.random().toString(36).substring(2, 11);
              setIsEditing(true);
              setActiveId(id);
              const start = day
                .startOf("day")
                .add(
                  (Math.floor(
                    (clickEvent.clientY -
                      (boundaryRefs.current[i]?.getBoundingClientRect().y ??
                        0)) /
                      (parseInt(hourCellHeight, 10) / 2),
                  ) *
                    60) /
                    2,
                  "minute",
                );
              setTimeBlocksData((timeBlocksData) =>
                timeBlocksData.concat({
                  id: id,
                  title: "일정",
                  start: start,
                  end: start.add(1, "hour"),
                  color:
                    Object.values(TimeBlockColors)[
                      timeBlocksData.length %
                        Object.keys(TimeBlockColors).length
                    ],
                }),
              );

              const mouseMoveHandler = (moveEvent: MouseEvent) => {
                setTimeBlocksData((timeBlocksData) => {
                  const end = day
                    .add(
                      Math.floor(
                        (moveEvent.clientX -
                          (boundaryRefs.current[i]?.getBoundingClientRect().x ??
                            0)) /
                          (boundaryRefs.current[i]?.getBoundingClientRect()
                            .width ?? 1),
                      ),
                      "day",
                    )
                    .startOf("day")
                    .add(
                      (Math.floor(
                        (moveEvent.clientY -
                          (boundaryRefs.current[i]?.getBoundingClientRect().y ??
                            0)) /
                          (parseInt(hourCellHeight, 10) / 6),
                      ) *
                        60) /
                        6,
                      "minute",
                    );
                  const start = timeBlocksData[timeBlocksData.length - 1].start;
                  return timeBlocksData.slice(0, -1).concat({
                    ...timeBlocksData[timeBlocksData.length - 1],
                    end: end.isBefore(start) ? start : end,
                  });
                });
              };

              const mouseUpHandler = () => {
                setTimeBlocksData((timeBlocksData) =>
                  timeBlocksData.sort(
                    (
                      { start: start1, end: end1 },
                      { start: start2, end: end2 },
                    ) => start1.diff(start2) || end2.diff(end1),
                  ),
                );
                setEditingId(id);
                document.removeEventListener("mousemove", mouseMoveHandler);
              };

              document.addEventListener("mousemove", mouseMoveHandler);
              document.addEventListener("mouseup", mouseUpHandler, {
                once: true,
              });
            }}
          >
            {[...Array(24)].map((_, hour) => (
              <HourCell key={hour} />
            ))}
            {timeBlocksData
              .filter(({ start, end }) =>
                day.isBetween(start, end, "day", "[]"),
              )
              .map(({ id, color, ...rest }: TimeBlockData) => (
                <TimeBlock
                  key={id}
                  {...rest}
                  day={day}
                  blockColor={color}
                  ref={(ref) => {
                    if (!ref) return;
                    timeBlockRefs.current[id] ??= {};
                    timeBlockRefs.current[id][day.date()] = ref;
                  }}
                  hover={activeId === id}
                  onMouseMove={() => setActiveId(id)}
                  onMouseLeave={() => setActiveId(undefined)}
                  onClick={() => {
                    setEditingId(id);
                    setIsEditing(true);
                  }}
                />
              ))}
          </DayContainer>
        ))}
      </WeekContainer>
      {editingId &&
        createPortal(
          <EditTimeBlockModal
            key={editingId}
            closeModal={() => {
              setEditingId(undefined);
              setActiveId(undefined);
              setIsEditing(false);
            }}
            timeBlocksData={timeBlocksData}
            editTimeBlock={editTimeBlock}
            deleteTimeBlock={deleteTimeBlock}
            activeId={editingId}
            xPosition={getActiveTimeBlockXPos()}
          />,
          document.body,
        )}
    </CalendarContainer>
  );
}

export default Calendar;
