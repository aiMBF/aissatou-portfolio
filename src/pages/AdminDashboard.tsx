
import { useState } from "react";
import { Book, FileText, Home, Settings, BarChart } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Link to="/">
            <Button variant="secondary" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-muted p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Content Management</h2>
            <nav className="space-y-2">
              <Link to="/admin/projects">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Projects
                </Button>
              </Link>
              <Link to="/admin/blog">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Book className="h-4 w-4" />
                  Blog Articles
                </Button>
              </Link>
              <Link to="/admin/skills">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BarChart className="h-4 w-4" />
                  Skills
                </Button>
              </Link>
            </nav>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-medium mb-4">Account</h2>
            <nav className="space-y-2">
              <Link to="/admin/settings">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Admin Settings
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-100">
                  Sign Out
                </Button>
              </Link>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
