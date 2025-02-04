import { sidebarTabs } from "@/constants";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserSideBar = ({ userType }) => {
    const [activeTab, setActiveTab] = useState("Experts");
    const navigate = useNavigate();
    const tabs = sidebarTabs[userType];

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <>
            {/* Mobile Sidebar Toggle */}
            <div className="sm:hidden bg-gray-800 text-white flex justify-between items-center px-4 py-2 shadow-lg">
                <button onClick={() => setMobileOpen(!mobileOpen)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-menu text-white h-6 w-6"
                    >
                        <line x1="4" x2="20" y1="12" y2="12"></line>
                        <line x1="4" x2="20" y1="6" y2="6"></line>
                        <line x1="4" x2="20" y1="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden sm:flex flex-col sm:h-screen sm:w-64 bg-gray-800 text-white shadow-lg p-4 space-y-4">
                <h2 className="text-lg font-bold text-gray-200">Dashboard</h2>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>

                {tabs.map((tab) => (
                    <Link key={tab.name} to={tab.path} className="w-full">
                        <Button
                            variant={activeTab === tab.name ? "secondary" : "ghost"}
                            className="w-full text-left"
                            onClick={() => setActiveTab(tab.name)}
                        >
                            {tab.name}
                        </Button>
                    </Link>
                ))}

                <div className="shrink-0 bg-border h-[1px] w-full"></div>

                {/* Sign Out Button */}
                <Button
                    className="w-full flex items-center gap-2"
                    variant="destructive"
                    onClick={handleSignOut}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-log-out w-4 h-4"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" x2="9" y1="12" y2="12"></line>
                    </svg>
                    Sign Out
                </Button>
            </div>
        </>
    );
};

export default UserSideBar;
