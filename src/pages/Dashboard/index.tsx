import styled from "styled-components";

import Calendar from "./components/Calendar";

const DashBoardTemporaryLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;

const DashboardPage = () => {
  return (
    <>
      <DashBoardTemporaryLayout>
        <Calendar />
      </DashBoardTemporaryLayout>
    </>
  );
};

export default DashboardPage;
