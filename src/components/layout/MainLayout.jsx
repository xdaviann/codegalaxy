// src/components/layout/MainLayout.jsx
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh bg-bg-primary">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
