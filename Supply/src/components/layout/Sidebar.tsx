import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { CheckSquare, ChevronDown, ChevronRight, ChevronsLeft, ChevronsRight, ListPlus, Megaphone, Puzzle, HelpCircle } from 'lucide-react';


interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({ Setup: true, });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const sidebarMenu = [
        {
            title: 'Setup',
            //icon: LayoutDashboard,
            items: [
                { label: 'Helpdesk', path: '/helpdesk', icon: HelpCircle },
                { label: 'Soultion Management', path: '/soulution-management', icon: Puzzle },
                { label: 'Additional Field', path: '/additional-fields', icon: ListPlus },
                { label: 'Checklists', path: '/checklists', icon: CheckSquare },
                { label: 'Announcements', path: '/announcements', icon: Megaphone },
            ],
        },

    ];

    const toggleMenu = (title: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-black bg-opacity-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />
            <div
                className={`fixed z-40 top-0 left-0 h-full ${isCollapsed ? 'w-20' : 'w-64'
                    } bg-[#7991BB] text-white p-4 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}
            >
                <div className="flex justify-between items-center mb-6">
                    {!isCollapsed && <h2 className="text-2xl font-bold">My App</h2>}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-white"
                        title={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                        {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                    </button>
                </div>

                {sidebarMenu.map((menu) => (
                    <div key={menu.title} className="mb-2">
                        <div
                            className="flex justify-between items-center cursor-pointer text-lg"
                            onClick={() => toggleMenu(menu.title)}
                        >
                            <div className="flex items-center gap-2 font-semibold">
                                {/* <menu.icon size={18} /> */}
                                {!isCollapsed && <span>{menu.title}</span>}
                            </div>
                            {!isCollapsed && (
                                <div>
                                    {openMenus[menu.title] ? (
                                        <ChevronDown size={18} />
                                    ) : (
                                        <ChevronRight size={18} />
                                    )}
                                </div>
                            )}
                        </div>

                        {openMenus[menu.title] && (
                            <div className={`mt-2 ml-${isCollapsed ? '0' : '5'} flex flex-col gap-1`}>
                                {menu.items.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-[#19376D] ${location.pathname === item.path ? 'bg-[#19376D]' : ''
                                            }`}
                                        title={isCollapsed ? item.label : ''}
                                    >
                                        <item.icon size={16} />
                                        {!isCollapsed && item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
