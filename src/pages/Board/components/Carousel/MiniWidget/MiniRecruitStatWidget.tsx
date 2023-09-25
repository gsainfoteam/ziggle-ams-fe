import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 30px;
  align-items: center;
`;

const TopWidgetElement = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  h2,
  p {
    margin: 0;
  }
`;

interface RecruitStat {
  currentApplicantsNum: number;
  targetRecruitNum: number;
}

const RecruitRatioElement = ({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) => {
  return (
    <TopWidgetElement>
      <h2>지원 현황</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2
          style={{
            color:
              currentApplicantsNum > targetRecruitNum ? "green" : "#eb6263",
          }}
        >
          {currentApplicantsNum}
        </h2>
        <p style={{ color: "gray" }}> / {targetRecruitNum}</p>
      </div>
    </TopWidgetElement>
  );
};

const ProgressBarElement = ({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "100%",
          margin: "8px 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "25px",
            borderRadius: "12.5px",
            backgroundColor: "#E9E9E9",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: `${Math.min(
              (100 * currentApplicantsNum) / targetRecruitNum,
              100,
            )}%`,
            height: "25px",
            borderRadius: "12.5px",
            backgroundColor:
              currentApplicantsNum > targetRecruitNum ? "green" : "#eb6263",
          }}
        />
      </div>
    </div>
  );
};

function MiniRecruitStatWidget({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) {
  return (
    <Widget>
      <RecruitRatioElement
        currentApplicantsNum={currentApplicantsNum}
        targetRecruitNum={targetRecruitNum}
      />
      <ProgressBarElement
        currentApplicantsNum={currentApplicantsNum}
        targetRecruitNum={targetRecruitNum}
      />
    </Widget>
  );
}

export default MiniRecruitStatWidget;
