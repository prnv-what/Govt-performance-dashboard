import { useState } from "react";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import KPIManagement from "./components/KPIManagement";
import ReportsPage from "./components/ReportsPage";
import MobileFieldApp from "./components/MobileFieldApp";
import MainLayout from "./components/MainLayout";

type Screen = "login" | "admin" | "employee" | "kpi" | "reports" | "mobile";
type UserRole = "admin" | "employee" | "field";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole>("admin");

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === "field") {
      setCurrentScreen("mobile");
    } else if (role === "admin") {
      setCurrentScreen("admin");
    } else {
      setCurrentScreen("employee");
    }
  };

  const handleLogout = () => {
    setCurrentScreen("login");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentScreen === "mobile") {
    return <MobileFieldApp onLogout={handleLogout} />;
  }

  return (
    <MainLayout
      currentScreen={currentScreen}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      userRole={userRole}
    >
      {currentScreen === "admin" && <AdminDashboard />}
      {currentScreen === "employee" && <EmployeeDashboard />}
      {currentScreen === "kpi" && <KPIManagement />}
      {currentScreen === "reports" && <ReportsPage />}
    </MainLayout>
  );
}