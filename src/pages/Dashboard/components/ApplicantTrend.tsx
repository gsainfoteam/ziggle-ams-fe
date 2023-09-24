import "../initChartJS";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
// import { SubTitle } from "chart.js";
import { Chart } from "react-chartjs-2";
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
  height: 200px;

  canvas {
    position: absolute;
  }
`;
const ApplicantTrend = () => {
  const label = [...Array(7)]
    .map((element, index) => {
      return dayjs()
        .subtract(index + 1, "days")
        .format("MMM DD");
    })
    .reverse();
  const [data, setData] = useState([9, 9, 2, 14, 7, 9, 2]);

  useEffect(() => {
    const timer = setInterval(() => {
      setData([...Array(7)].map(() => Math.floor(Math.random() * 15)));
    }, 1e3 * 60);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  position: "right",
                  ticks: { stepSize: 5 },
                  grid: {
                    lineWidth: (context) => (context.index === 0 ? 2 : 1),
                    color: (context) =>
                      context.index === 0 ? "Gray" : "LightGray",
                  },
                  border: { display: false },
                },
              },

              plugins: {
                tooltip: {
                  yAlign: "bottom",
                  callbacks: {
                    title: () => [],
                    label: (context) => `${context.parsed.y}명`,
                  },
                  displayColors: false,
                },
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
                  borderRadius: { topLeft: 8, topRight: 8 },
                  barThickness: 30,
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
