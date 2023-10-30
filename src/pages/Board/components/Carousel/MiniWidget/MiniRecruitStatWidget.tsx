import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 30px;
  align-items: center;
`;

interface RecruitStat {
  currentApplicantsNum: number;
  targetRecruitNum: number;
}

const RecruitRatioElement = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  h2,
  p {
    margin: 0;
  }
`;

const RatioContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CurrentApplicantsNum = styled.div<RecruitStat>`
  font-size: 1.5em;
  font-weight: 700;
  color: ${({ currentApplicantsNum, targetRecruitNum }) =>
    currentApplicantsNum > targetRecruitNum ? "green" : "#eb6263"};
`;

const PerTargetRecruitNum = styled.div`
  color: gray;
`;

const ProgressBarElement = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 8px 0;
`;

const BackgroundBar = styled.div`
  position: absolute;
  width: 100%;
  height: 25px;
  border-radius: 12.5px;
  background-color: #e9e9e9;
`;

const DataBar = styled.div<RecruitStat>`
  position: absolute;
  height: 25px;
  border-radius: 12.5px;
  width: ${({ currentApplicantsNum, targetRecruitNum }) =>
    Math.min((100 * currentApplicantsNum) / targetRecruitNum, 100)}%;
  background-color: ${({ currentApplicantsNum, targetRecruitNum }) =>
    currentApplicantsNum > targetRecruitNum ? "green" : "#eb6263"};
`;

function MiniRecruitStatWidget({
  currentApplicantsNum,
  targetRecruitNum,
}: RecruitStat) {
  return (
    <Widget>
      <RecruitRatioElement>
        <h2>지원 현황</h2>
        <RatioContainer>
          <CurrentApplicantsNum
            currentApplicantsNum={currentApplicantsNum}
            targetRecruitNum={targetRecruitNum}
          >
            {currentApplicantsNum}
          </CurrentApplicantsNum>
          <PerTargetRecruitNum>/ {targetRecruitNum}</PerTargetRecruitNum>
        </RatioContainer>
      </RecruitRatioElement>
      <ProgressBarElement>
        <ProgressBarContainer>
          <BackgroundBar />
          <DataBar
            currentApplicantsNum={currentApplicantsNum}
            targetRecruitNum={targetRecruitNum}
          />
        </ProgressBarContainer>
      </ProgressBarElement>
    </Widget>
  );
}

export default MiniRecruitStatWidget;
