import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sidebarTabs } from "@/constants";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useAuth } from "../context/AuthContext";
import { useToast } from "@/context/ToastContext";

const UserSideBar = ({ userType }) => {
    const [activeTab, setActiveTab] = useState("Experts");
    const navigate = useNavigate();
    const {toast} = useToast();
    const tabs = sidebarTabs[userType];
    const {logout} = useAuth();
    const handleSignOut = () => {
        logout();
        toast.success("LogOut Successfull", { autoClose: 3000 });
        navigate("/");
    };

    return (
        <div className="sm:h-screen bg-gray-100 shadow-lg p-4 sticky top-0 sm:w-64 w-full sm:block hidden">
            {/* Mobile Sidebar */}
            <div className="flex justify-between items-center mb-4">
                <Sheet>
                    <SheetTrigger asChild className="sm:hidden block">
                        <Button variant="ghost">
                            <Menu className="text-gray-800 h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-gray-800 text-white w-64 p-4">
                        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                        <div className="border-b border-gray-700 mb-4"></div>
                        {tabs.map((tab) => (
                            <Link
                                to={tab.path}
                                key={tab.name}
                                className={`block p-3 rounded text-sm font-medium ${
                                    activeTab === tab.name ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.name}
                            </Link>
                        ))}
                        <div className="border-b border-gray-700 my-4"></div>
                        <Button
                            variant="destructive"
                            className="w-full flex items-center gap-2"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Dashboard</h2>
                <div className="border-b border-gray-300 mb-4"></div>
                {tabs.map((tab) => (
                    <Link
                        to={tab.path}
                        key={tab.name}
                        className={`block p-3 rounded text-sm font-medium text-gray-800 ${
                            activeTab === tab.name ? "bg-gray-200" : "hover:bg-gray-300"
                        }`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        {tab.name}
                    </Link>
                ))}
                <div className="border-b border-gray-300 my-4"></div>
                <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default UserSideBar;
