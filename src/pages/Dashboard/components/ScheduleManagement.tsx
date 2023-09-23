import styled from "styled-components";

import calander from "../assets/calander.png";
import { Logo, Section } from "./Common";

const ScheduleManagement = () => {
  return (
    <Section>
      <Logo>
        <img src={calander} alt="calander icon" />
        <h3>일정 관리</h3>
      </Logo>
    </Section>
  );
};

export default ScheduleManagement;
