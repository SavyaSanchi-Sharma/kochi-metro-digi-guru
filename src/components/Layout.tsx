import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, Upload, BarChart3, Users, Settings, Menu, Search, Moon, Sun } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Layout = ({ children, activeSection, setActiveSection }: LayoutProps) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navigationItems = [
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'workspace', label: 'Document Search', icon: Search },
  ];

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full bg-metro-light">
          <div className="p-6 border-b border-metro-primary/20">
            <h2 className="text-xl font-bold text-metro-dark">Metro Docs</h2>
          </div>
          <nav className="flex-1 p-4">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start mb-2 ${
                  activeSection === item.id 
                    ? "bg-metro-primary text-white hover:bg-metro-primary/90" 
                    : "text-metro-dark hover:bg-metro-secondary"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex items-center space-x-2">
            <h2 className="text-xl font-bold">Metro Docs</h2>
          </div>
          
          <nav className="hidden md:flex flex-1 items-center space-x-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`${
                  activeSection === item.id 
                    ? "bg-metro-primary text-white hover:bg-metro-primary/90" 
                    : "hover:bg-accent"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="container py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;