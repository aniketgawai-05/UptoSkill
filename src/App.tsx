import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { CourseProvider } from "./store/CourseContext";
import { AppRoutes } from "./routes/AppRoutes";
import "./styles/globals.css";

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CourseProvider>
          <AppRoutes />
        </CourseProvider>
      </AuthProvider>
    </HashRouter>
  );
}
