import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import Board from "src/pages/Board";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
