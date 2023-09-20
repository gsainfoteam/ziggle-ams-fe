import "./initChartJS";

// import { SubTitle } from "chart.js";
import { Line } from "react-chartjs-2";
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
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "dataset 1",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

// const config = {
//   type: "line",
//   data: data,
//   options: {},
// };

const ApplicantTrend = () => {
  return (
    <Trend>
      <Section>
        <Logo>
          <img src={chart} alt="chart icon" />
          <h3>지원자 추이</h3>
        </Logo>
        <div style={{ alignSelf: "center" }}>
          <Line options={options} data={data} />
        </div>
      </Section>
    </Trend>
  );
};

export default ApplicantTrend;
