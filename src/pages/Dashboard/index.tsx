import styled from "styled-components";

import Calendar from "./components/Calendar";

const TemporaryContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border: 1px solid gray;
`;

const DashboardPage = () => {
  return (
    <>
      <TemporaryContainer>
        <Calendar />
      </TemporaryContainer>
    </>
  );
};

export default DashboardPage;
