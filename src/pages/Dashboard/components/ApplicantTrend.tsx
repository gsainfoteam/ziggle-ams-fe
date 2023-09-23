import "../initChartJS";

import dayjs from "dayjs";
// import { SubTitle } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import styled from "styled-components";

// import { Link } from "react-router-dom";
import chart from "../assets/chart.png";
import { Logo, Section } from "./Common";

const Trend = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  ${Section} {
    flex: 1;
  }
`;
const ChartContainer = styled.div`
  position: relative;

  canvas {
    height: 300px;
  }
`;
const ApplicantTrend = () => {
  const label = [...Array(7)].map((element, index) => {
    return dayjs()
      .subtract(index + 1, "days")
      .format("MMM DD");
  });
  const data = [9, 9, 2, 14, 7, 9, 2];

  return (
    <Trend>
      <Section>
        <Logo>
          <img src={chart} alt="chart icon" />
          <h3>지원자 추이</h3>
        </Logo>
        <ChartContainer>
          <Chart
            type="bar"
            options={{
              responsive: true,
              scales: {
                x: { grid: { display: false } },
                y: { position: "right" },
              },
              maintainAspectRatio: false,
            }}
            data={{
              labels: label,
              datasets: [
                {
                  type: "line" as const,
                  label: "dataset 1",
                  backgroundColor: "#e99d9d",
                  borderColor: "#e99d9d",
                  data: data,
                },
                {
                  type: "bar" as const,
                  label: "dataset 2",
                  backgroundColor: "#FCD2D2",
                  borderColor: "#FCD2D2",
                  hoverBackgroundColor: "#eb6263",
                  data: data,
                },
              ],
            }}
          />
        </ChartContainer>
      </Section>
    </Trend>
  );
};

export default ApplicantTrend;
