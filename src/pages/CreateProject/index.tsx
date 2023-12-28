import styled from "styled-components";

import FormConstructor from "./FormConstructor";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 100px;
`;

const CreateProjectPage = () => {
  return (
    <Layout>
      <FormConstructor />
    </Layout>
  );
};

export default CreateProjectPage;
