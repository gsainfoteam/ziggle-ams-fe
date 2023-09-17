import MiniWidget from "./MiniWidget";

const DdayElement = ({ today, end_date }: { today: Date; end_date: Date }) => {
  const dateDiff = Math.ceil(
    (end_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  return (
    <h3 style={{ color: dateDiff > 0 ? "green" : "#eb6263" }}>{`D${
      dateDiff > 0 ? "+" : ""
    }${dateDiff}`}</h3>
  );
};
const StartEndDateElement = ({
  start_date,
  end_date,
}: {
  start_date: Date;
  end_date: Date;
}) => {
  return (
    <div>
      <p>모집 시작 {start_date.toLocaleDateString()}</p>
      <p>모집 마감 {end_date.toLocaleDateString()}</p>
    </div>
  );
};

function MiniDueWidget({
  today,
  start_date,
  end_date,
}: {
  today: Date;
  start_date: Date;
  end_date: Date;
}) {
  return (
    <MiniWidget
      widgetElements={{
        leftElement: <h3>지원 마감</h3>,
        centerElement: <DdayElement today={today} end_date={end_date} />,
        rightElement: (
          <StartEndDateElement start_date={start_date} end_date={end_date} />
        ),
        leftElementOption: {
          flex: 0.8,
          align: "start",
        },
        centerElementOption: {
          flex: 1.3,
          align: "start",
        },
        rightElementOption: {
          flex: 1.5,
          align: "end",
        },
      }}
    />
  );
}

export default MiniDueWidget;
