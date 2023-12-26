import styled from "styled-components";

import Paper from "./Paper";
import UnderlinedInput from "./UnderlinedInput";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CreateForm = () => {
  return (
    <Wrapper>
      <Paper>
        <UnderlinedInput></UnderlinedInput>
      </Paper>
    </Wrapper>
  );
};

export default CreateForm;
