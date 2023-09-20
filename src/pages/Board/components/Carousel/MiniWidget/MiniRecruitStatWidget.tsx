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

interface recruitStat {
  current_applicants_num: number;
  target_recruit_num: number;
}

const ProgressBarElement = ({
  current_applicants_num,
  target_recruit_num,
}: recruitStat) => {
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
    </WidgetElement>
  );
};

const RecruitRatioElement = ({
  current_applicants_num,
  target_recruit_num,
}: recruitStat) => {
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
              current_applicants_num > target_recruit_num ? "green" : "#eb6263",
          }}
        >
          {current_applicants_num}
        </h3>
        <h3 style={{ color: "darkgray" }}>/{target_recruit_num}</h3>
      </div>
    </WidgetElement>
  );
};

function MiniRecruitStatWidget({
  current_applicants_num,
  target_recruit_num,
}: recruitStat) {
  return (
    <Widget>
      <TitleElement />
      <ProgressBarElement
        current_applicants_num={current_applicants_num}
        target_recruit_num={target_recruit_num}
      />
      <RecruitRatioElement
        current_applicants_num={current_applicants_num}
        target_recruit_num={target_recruit_num}
      />
    </Widget>
  );
}

export default MiniRecruitStatWidget;
