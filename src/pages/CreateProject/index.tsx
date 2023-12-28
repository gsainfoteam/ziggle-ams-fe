import styled from "styled-components";

import FormConstructor from "./FormConstructor";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 100px 0;
`;

const CreateProjectPage = () => {
  return (
    <Layout>
      <FormConstructor />
    </Layout>
  );
};

export default CreateProjectPage;
