import MiniWidget from "./MiniWidget";

const ProgressBarElement = ({
  current_applicants_num,
  target_recruit_num,
}: {
  current_applicants_num: number;
  target_recruit_num: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "10px",
          borderRadius: "5px",
          backgroundColor: "darkgray",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: `${Math.min(
            (100 * current_applicants_num) / target_recruit_num,
            100,
          )}%`,
          height: "10px",
          borderRadius: "5px",
          backgroundColor:
            current_applicants_num > target_recruit_num ? "green" : "#eb6263",
        }}
      />
    </div>
  );
};

const RecruitRatioElement = ({
  current_applicants_num,
  target_recruit_num,
}: {
  current_applicants_num: number;
  target_recruit_num: number;
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3
        style={{
          color:
            current_applicants_num > target_recruit_num ? "green" : "#eb6263",
        }}
      >
        {current_applicants_num}
      </h3>
      <h3 style={{ color: "darkgray" }}>/{target_recruit_num}</h3>
    </div>
  );
};

function MiniRecruitStatWidget() {
  return (
    <MiniWidget
      widgetElements={{
        leftElement: <h3>지원 인원</h3>,
        centerElement: (
          <ProgressBarElement
            current_applicants_num={20}
            target_recruit_num={6}
          />
        ),
        rightElement: (
          <RecruitRatioElement
            current_applicants_num={20}
            target_recruit_num={6}
          />
        ),
        leftElementOption: {
          flex: 0.8,
          align: "start",
        },
        centerElementOption: {
          flex: 1.7,
          align: "start",
        },
        rightElementOption: {
          flex: 1.1,
        },
      }}
    />
  );
}

export default MiniRecruitStatWidget;
