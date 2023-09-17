import styled from "styled-components";

const Widget = styled.div`
  display: flex;
  flex: 1;
  margin: 0 15px 0 15px;
`;
interface WidgetElementProps {
  flex?: number;
  align?: "center" | "start" | "end";
}
const WidgetElement = styled.div<WidgetElementProps>`
  display: flex;
  flex: ${({ flex }) => flex || 1};
  justify-content: ${({ align }) => align || "center"};
  align-items: center;
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
    color: gray;
    font-size: 12px;
    line-height: 15px;
  }
`;

interface MiniWidgetProps {
  leftElement: React.ReactNode;
  centerElement: React.ReactNode;
  rightElement: React.ReactNode;
  leftElementOption?: WidgetElementProps;
  centerElementOption?: WidgetElementProps;
  rightElementOption?: WidgetElementProps;
}

function MiniWidget({ widgetElements }: { widgetElements: MiniWidgetProps }) {
  return (
    <Widget>
      <WidgetElement
        flex={widgetElements.leftElementOption?.flex}
        align={widgetElements.leftElementOption?.align}
      >
        {widgetElements.leftElement}
      </WidgetElement>
      <WidgetElement
        flex={widgetElements.centerElementOption?.flex}
        align={widgetElements.centerElementOption?.align}
      >
        {widgetElements.centerElement}
      </WidgetElement>
      <WidgetElement
        flex={widgetElements.rightElementOption?.flex}
        align={widgetElements.rightElementOption?.align}
      >
        {widgetElements.rightElement}
      </WidgetElement>
    </Widget>
  );
}

export default MiniWidget;
