import dayjs from "dayjs";
import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex: 1;
  margin: 0 30px;
  align-items: center;
  justify-content: space-between;
`;

const StartEndDateElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const LabeledDate = styled.div`
  margin: 0;
  color: gray;
  font-size: 16px;
`;

const dDayCalc = (endDate: dayjs.Dayjs) => {
  const dateDiff = dayjs().diff(endDate, "day");
  const isNotOverDue = dateDiff <= 0;
  return { dateDiff, isNotOverDue };
};

const DdayElement = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  h1 {
    margin: 0;
    color: #656565;
  }
`;

const UntilDueDate = styled.div`
  font-size: 1em;
  font-weight: 700;
  color: #656565;
`;

const DPlusMinus = styled.div`
  font-size: 2em;
  font-weight: 700;
  color: #656565;
`;

const DeltaDays = styled.div`
  font-size: 2em;
  font-weight: 700;
  color: #eb6263;
`;
interface DueProps {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

function MiniDueWidget({ startDate, endDate }: DueProps) {
  const { dateDiff, isNotOverDue } = dDayCalc(endDate);
  return (
    <Widget>
      <StartEndDateElement>
        <LabeledDate>모집 시작 {startDate.format("YYYY.MM.DD")}</LabeledDate>
        <LabeledDate>모집 마감 {endDate.format("YYYY.MM.DD")}</LabeledDate>
      </StartEndDateElement>
      <DdayElement>
        <UntilDueDate>모집 마감까지</UntilDueDate>
        <DPlusMinus>{`D ${isNotOverDue ? "-" : "+"}`}</DPlusMinus>
        <DeltaDays>{`${Math.abs(dateDiff)}`}</DeltaDays>
      </DdayElement>
    </Widget>
  );
}

export default MiniDueWidget;
