import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import BoardPage from "src/pages/Board";
import CreateProjectPage from "src/pages/CreateProject";
import DashboardPage from "src/pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BoardPage />} />
          <Route path="create" element={<CreateProjectPage />} />
          <Route path=":id">
            <Route index element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
