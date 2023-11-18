import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import minMax from "dayjs/plugin/minMax";
import weekday from "dayjs/plugin/weekday";
import { MutableRefObject, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import calendarIcon from "src/assets/calendarIcon.png";
import CircularButton from "src/pages/Board/components/CircularButton";
import {
  modalPaperPadding,
  modalPaperWidth,
} from "src/pages/Board/components/Modal/ModalPaper";
import useModal from "src/pages/Board/components/Modal/useModal";
import styled from "styled-components";

import {
  calendarHeight,
  calendarWidth,
  hourCellHeight,
  TimeLabelWidth,
} from "./cssConst";
import EditTimeBlockModal from "./EditTimeBlockModal";

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
  min-height: calc(0.8em + 0.5em + 0.1em);
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
  const { isOpen, openModal, closeModal } = useModal();
  const [activeId, setActiveId] = useState<string>();
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
  const [isEditing, setIsEditing] = useState(false);
  const timeBlockRefs = useRef<{ id: string; ref: HTMLDivElement | null }[]>(
    [],
  );
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  const editTimeBlock = (newTimeBlockData: EditTimeBlockProps) => {
    setTimeBlocksData((timeBlocksData) => {
      const index = timeBlocksData.findIndex(({ id }) => id === activeId);
      const timeBlockData = timeBlocksData[index];
      const editedTimeBlocksData = [...timeBlocksData]; // toSpliced not yet supported
      editedTimeBlocksData.splice(index, 1, {
        ...timeBlockData,
        ...newTimeBlockData,
      });
      return editedTimeBlocksData;
    });
  };

  const deleteTimeBlock = () => {
    closeModal();
    setActiveId(undefined);
    setIsEditing(false);
    setTimeBlocksData((timeBlocksData) =>
      timeBlocksData.filter(({ id }) => id !== activeId),
    );
  };

  const getActiveTimeBlockXPos = (
    timeBlockRefs: MutableRefObject<
      {
        id: string;
        ref: HTMLDivElement | null;
      }[]
    >,
    activeId: string | undefined,
  ) => {
    console.log(timeBlockRefs); // TODO: timeBlockRefs Keep Growing Bug
    const { x, width } = timeBlockRefs.current
      .reverse()
      .filter((timeBlockRef) => timeBlockRef.id === activeId)[0] // Cannot use findLast
      ?.ref?.getBoundingClientRect() ?? { x: 0, width: 0 }; // Dirty quick fix to supress type error
    return x + width + 5 + parseInt(modalPaperWidth, 10) >
      (calendarContainerRef.current?.getBoundingClientRect()?.right ?? 0)
      ? x -
          5 -
          parseInt(modalPaperWidth, 10) -
          parseInt(modalPaperPadding, 10) * 2
      : x + width + 5;
  };
  const nextWeek = () => {
    setDaysOfWeek((daysOfWeek) => daysOfWeek.map((day) => day.add(7, "day")));
  };
  const previousWeek = () => {
    setDaysOfWeek((daysOfWeek) =>
      daysOfWeek.map((day) => day.subtract(7, "day")),
    );
  };

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
                openModal();
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
              .map(({ id, start, end, color, title }: TimeBlockData) => (
                <TimeBlock
                  key={id}
                  ref={(ref) => timeBlockRefs.current.push({ id, ref })}
                  start={dayjs.max(start, day.startOf("day")) ?? day}
                  end={dayjs.min(end, day.endOf("day")) ?? day}
                  backgroundColor={color.background}
                  outlineColor={color.title}
                  hover={activeId === id}
                  onMouseMove={() => !isEditing && setActiveId(id)}
                  onMouseLeave={() => !isEditing && setActiveId(undefined)}
                  onClick={() => {
                    openModal();
                    setIsEditing(true);
                  }}
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
          <EditTimeBlockModal
            closeModal={() => {
              closeModal();
              setActiveId(undefined);
              setIsEditing(false);
            }}
            timeBlocksData={timeBlocksData}
            editTimeBlock={editTimeBlock}
            deleteTimeBlock={deleteTimeBlock}
            activeId={activeId ?? ""}
            xPosition={getActiveTimeBlockXPos(timeBlockRefs, activeId)}
          />,
          document.body,
        )}
    </CalendarContainer>
  );
}

export default Calendar;
