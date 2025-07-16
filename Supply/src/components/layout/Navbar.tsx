import {
    Menu,
    Bell,
    Settings,
    Search,
    FileText,
    User,
} from 'lucide-react';

interface NavbarProps {
    toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
    return (
        <header className="bg-[#19376D] shadow p-4 flex justify-between items-center">
            <div className="lg:hidden">
                {toggleSidebar && (
                  <button onClick={toggleSidebar} className="text-white">
                      <Menu size={24} />
                  </button>
                )}
            </div>
            <h1 className="text-lg font-semibold text-white">Vibe Connect</h1>
            <div className="flex items-center space-x-4 text-white">
                <Search size={20} className="cursor-pointer" />
                <Bell size={20} className="cursor-pointer" />
                <FileText size={20} className="cursor-pointer" />
                <Settings size={20} className="cursor-pointer" />
                <User size={20} className="cursor-pointer" />
                {/* Removed Logout button */}
            </div>
        </header>
    );
};

export default Navbar;