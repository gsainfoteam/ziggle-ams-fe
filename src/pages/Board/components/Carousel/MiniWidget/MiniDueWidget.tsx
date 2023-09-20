import dayjs from "dayjs";
import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex: 1;
  margin: 0 15px;
  align-items: center;
`;

const LeftWidgetElement = styled.div`
  display: flex;
  flex: 8;
  justify-content: start;
  align-items: center;
  h3 {
    margin: 0;
  }
`;

const TitleElement = () => {
  return (
    <LeftWidgetElement>
      <h3>지원 마감</h3>
    </LeftWidgetElement>
  );
};

const dDayCalc = (endDate: dayjs.Dayjs) => {
  const dateDiff = dayjs().diff(endDate, "day");
  const isNotOverDue = dateDiff <= 0;
  return { dateDiff, isNotOverDue };
};

const CenterWidgetElement = styled.div`
  display: flex;
  flex: 14;
  justify-content: start;
  align-items: center;
  h3 {
    margin: 0;
  }
`;

const DdayElement = ({ endDate }: { endDate: dayjs.Dayjs }) => {
  const { dateDiff, isNotOverDue } = dDayCalc(endDate);
  return (
    <CenterWidgetElement>
      <h3 style={{ color: isNotOverDue ? "green" : "#eb6263" }}>{`D${
        isNotOverDue ? "" : "+"
      }${dateDiff}`}</h3>
    </CenterWidgetElement>
  );
};

interface DueProps {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

const RightWidgetElement = styled.div`
  display: flex;
  flex: 9;
  justify-content: end;
  align-items: center;
  p {
    margin: 0;
    color: gray;
    font-size: 12px;
    line-height: 15px;
  }
`;

const StartEndDateElement = ({ startDate, endDate }: DueProps) => {
  return (
    <RightWidgetElement>
      <div>
        <p>모집 시작 {startDate.format("YYYY.MM.DD")}</p>
        <p>모집 마감 {endDate.format("YYYY.MM.DD")}</p>
      </div>
    </RightWidgetElement>
  );
};

function MiniDueWidget({ startDate, endDate }: DueProps) {
  return (
    <Widget>
      <TitleElement />
      <DdayElement endDate={endDate} />
      <StartEndDateElement startDate={startDate} endDate={endDate} />
    </Widget>
  );
}

export default MiniDueWidget;
