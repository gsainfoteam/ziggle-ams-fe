import dayjs from "dayjs";
import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex: 1;
  margin: 0 15px 0 15px;
  align-items: center;
`;

const TitleElement = () => {
  const WidgetElement = styled.div`
    display: flex;
    flex: 0.8;
    justify-content: start;
    align-items: center;
    h3 {
      margin: 0;
    }
  `;
  return (
    <WidgetElement>
      <h3>지원 마감</h3>
    </WidgetElement>
  );
};

const DdayElement = ({ end_date }: { end_date: dayjs.Dayjs }) => {
  const dateDiff = dayjs().diff(end_date, "day");
  const WidgetElement = styled.div`
    display: flex;
    flex: 1.4;
    justify-content: start;
    align-items: center;
    h3 {
      margin: 0;
    }
  `;
  return (
    <WidgetElement>
      <h3 style={{ color: dateDiff > 0 ? "green" : "#eb6263" }}>{`D${
        dateDiff > 0 ? "+" : ""
      }${dateDiff}`}</h3>
    </WidgetElement>
  );
};

const StartEndDateElement = ({
  start_date,
  end_date,
}: {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
}) => {
  const WidgetElement = styled.div`
    display: flex;
    flex: 0.9;
    justify-content: end;
    align-items: center;
    p {
      margin: 0;
      color: gray;
      font-size: 12px;
      line-height: 15px;
    }
  `;
  return (
    <WidgetElement>
      <div>
        <p>모집 시작 {start_date.format("YYYY.MM.DD")}</p>
        <p>모집 마감 {end_date.format("YYYY.MM.DD")}</p>
      </div>
    </WidgetElement>
  );
};

function MiniDueWidget({
  start_date,
  end_date,
}: {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
}) {
  return (
    <Widget>
      <TitleElement />
      <DdayElement end_date={end_date} />
      <StartEndDateElement start_date={start_date} end_date={end_date} />
    </Widget>
  );
}

export default MiniDueWidget;
