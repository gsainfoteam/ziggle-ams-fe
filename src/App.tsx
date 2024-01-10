import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import GlobalStyle from "./components/GlobalStyle";
import Router from "./router";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <GlobalStyle />
        <Router />
      </div>
    </DndProvider>
  );
}

export default App;
