import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import BoardPage from "src/pages/Board";
import CreateProjectPage from "src/pages/CreateProject";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BoardPage />} />
          <Route path="create" element={<CreateProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
