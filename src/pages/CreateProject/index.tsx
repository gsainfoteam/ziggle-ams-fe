import styled from "styled-components";

import CreateForm from "./CreateForm";

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
      <CreateForm></CreateForm>
    </Layout>
  );
};

export default CreateProjectPage;
