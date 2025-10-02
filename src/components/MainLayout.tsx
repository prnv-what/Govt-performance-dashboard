import { useState } from "react";
import { Building2, LayoutDashboard, Target, FileText, Settings, LogOut, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

type Screen = "login" | "admin" | "employee" | "kpi" | "reports" | "mobile";
type UserRole = "admin" | "employee" | "field";

interface MainLayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  userRole: UserRole;
}

export default function MainLayout({
  children,
  currentScreen,
  onNavigate,
  onLogout,
  userRole,
}: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (screen: Screen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    ...(userRole === "admin"
      ? [
          {
            screen: "admin" as Screen,
            icon: LayoutDashboard,
            label: "Dashboard",
          },
          {
            screen: "kpi" as Screen,
            icon: Target,
            label: "KPIs",
          },
        ]
      : []),
    ...(userRole === "employee"
      ? [
          {
            screen: "employee" as Screen,
            icon: User,
            label: "My Performance",
          },
        ]
      : []),
    {
      screen: "reports" as Screen,
      icon: FileText,
      label: "Reports",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-blue-900">GPMS</h1>
                <p className="text-xs text-gray-600">Performance Monitoring</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-blue-900">GPMS</h1>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {userRole === "admin" && (
                <>
                  <Button
                    variant={currentScreen === "admin" ? "secondary" : "ghost"}
                    onClick={() => onNavigate("admin")}
                    className="gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={currentScreen === "kpi" ? "secondary" : "ghost"}
                    onClick={() => onNavigate("kpi")}
                    className="gap-2"
                  >
                    <Target className="w-4 h-4" />
                    KPIs
                  </Button>
                </>
              )}
              {userRole === "employee" && (
                <Button
                  variant={currentScreen === "employee" ? "secondary" : "ghost"}
                  onClick={() => onNavigate("employee")}
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  My Performance
                </Button>
              )}
              <Button
                variant={currentScreen === "reports" ? "secondary" : "ghost"}
                onClick={() => onNavigate("reports")}
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                Reports
              </Button>
              <Button variant="ghost" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>

            {/* User Info and Mobile Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:block text-right">
                <p className="text-sm text-gray-900">
                  {userRole === "admin" ? "Admin User" : "Employee Name"}
                </p>
                <p className="text-xs text-gray-500">
                  {userRole === "admin" ? "Administrator" : "Officer"}
                </p>
              </div>
              
              {/* Desktop Logout */}
              <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2 hidden md:flex">
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Logout</span>
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      GPMS Menu
                    </SheetTitle>
                    <SheetDescription>
                      Navigate through different sections of the application
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-1">
                    {/* User Info in Mobile */}
                    <div className="p-4 bg-blue-50 rounded-lg mb-4">
                      <p className="text-sm text-gray-900">
                        {userRole === "admin" ? "Admin User" : "Employee Name"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {userRole === "admin" ? "Administrator" : "Officer"}
                      </p>
                    </div>

                    {/* Navigation Items */}
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.screen}
                          variant={currentScreen === item.screen ? "secondary" : "ghost"}
                          onClick={() => handleNavigation(item.screen)}
                          className="w-full justify-start gap-3"
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Button>
                      );
                    })}

                    {/* Settings */}
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>

                    {/* Logout */}
                    <div className="pt-4 mt-4 border-t">
                      <Button
                        variant="ghost"
                        onClick={onLogout}
                        className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}