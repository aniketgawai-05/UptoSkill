import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { ForgotPassword } from "../pages/Auth/ForgotPassword";
import { CourseList } from "../pages/Courses/CourseList";
import { CourseDetails } from "../pages/Courses/CourseDetails";
import { StudentDashboard } from "../pages/Dashboard/StudentDashboard";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { NotFound } from "../pages/NotFound";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const AppRoutes = () => (
  <Routes>
    {/* Auth Layout */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>

    {/* Main Layout */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
