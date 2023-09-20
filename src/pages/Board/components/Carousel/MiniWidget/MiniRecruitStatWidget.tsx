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
      <h3>지원 인원</h3>
    </WidgetElement>
  );
};

interface RecruitStat {
  currentApplicantsNum: number;
  targetRecruitNum: number;
}

const ProgressBarElement = ({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) => {
  const WidgetElement = styled.div`
    display: flex;
    flex: 1.4;
    justify-content: start;
    align-items: center;
  `;

  return (
    <WidgetElement>
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
              (100 * currentApplicantsNum) / targetRecruitNum,
              100,
            )}%`,
            height: "10px",
            borderRadius: "5px",
            backgroundColor:
              currentApplicantsNum > targetRecruitNum ? "green" : "#eb6263",
          }}
        />
      </div>
    </WidgetElement>
  );
};

const RecruitRatioElement = ({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) => {
  const WidgetElement = styled.div`
    display: flex;
    flex: 0.9;
    justify-content: center;
    align-items: center;
    h3 {
      margin: 0;
    }
  `;
  return (
    <WidgetElement>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3
          style={{
            color:
              currentApplicantsNum > targetRecruitNum ? "green" : "#eb6263",
          }}
        >
          {currentApplicantsNum}
        </h3>
        <h3 style={{ color: "darkgray" }}>/{targetRecruitNum}</h3>
      </div>
    </WidgetElement>
  );
};

function MiniRecruitStatWidget({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) {
  return (
    <Widget>
      <TitleElement />
      <ProgressBarElement
        currentApplicantsNum={currentApplicantsNum}
        targetRecruitNum={targetRecruitNum}
      />
      <RecruitRatioElement
        currentApplicantsNum={currentApplicantsNum}
        targetRecruitNum={targetRecruitNum}
      />
    </Widget>
  );
}

export default MiniRecruitStatWidget;
