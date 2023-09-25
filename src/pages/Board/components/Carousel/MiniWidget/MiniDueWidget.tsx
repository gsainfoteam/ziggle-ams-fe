import dayjs from "dayjs";
import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex: 1;
  margin: 0 30px;
  align-items: center;
  justify-content: space-between;
`;

interface DueProps {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

const LeftWidgetElement = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  p {
    margin: 0;
    color: gray;
    font-size: 16px;
  }
`;

const StartEndDateElement = ({ startDate, endDate }: DueProps) => {
  return (
    <LeftWidgetElement>
      <div>
        <p>모집 시작 {startDate.format("YYYY.MM.DD")}</p>
        <p>모집 마감 {endDate.format("YYYY.MM.DD")}</p>
      </div>
    </LeftWidgetElement>
  );
};

const dDayCalc = (endDate: dayjs.Dayjs) => {
  const dateDiff = dayjs().diff(endDate, "day");
  const isNotOverDue = dateDiff <= 0;
  return { dateDiff, isNotOverDue };
};

const RightWidgetElement = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  h1,
  h4 {
    margin: 0;
    color: #656565;
  }
`;

const DdayElement = ({ endDate }: { endDate: dayjs.Dayjs }) => {
  const { dateDiff, isNotOverDue } = dDayCalc(endDate);
  return (
    <RightWidgetElement>
      <h4>모집 마감까지</h4>
      <h1>{`D ${isNotOverDue ? "-" : "+"}`}</h1>
      <h1 style={{ color: "#eb6263" }}>{`${Math.abs(dateDiff)}`}</h1>
    </RightWidgetElement>
  );
};

function MiniDueWidget({ startDate, endDate }: DueProps) {
  return (
    <Widget>
      <StartEndDateElement startDate={startDate} endDate={endDate} />
      <DdayElement endDate={endDate} />
    </Widget>
  );
}

export default MiniDueWidget;
