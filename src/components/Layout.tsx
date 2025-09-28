import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, Upload, BarChart3, Users, Settings, Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [activeSection, setActiveSection] = useState('chat');

  const navigationItems = [
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'workspace', label: 'AI Workspace', icon: Search },
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-metro-primary/20 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-metro-primary rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-metro-dark">Metro Document System</h1>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-metro-primary text-metro-primary hover:bg-metro-secondary">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 bg-metro-light border-r border-metro-primary/20 min-h-[calc(100vh-73px)]">
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
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
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;