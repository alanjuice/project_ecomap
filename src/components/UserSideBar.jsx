import { sidebarTabs } from "@/constants";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, LogOut } from "lucide-react";

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
            {/* Mobile Sidebar with Drawer */}
            <div className="sm:hidden bg-gray-800 text-white flex justify-between items-center px-4 py-2 shadow-lg">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost">
                            <Menu className="text-white h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-gray-800 text-white w-64">
                        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                        <Separator className="mb-4" />
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
                        <Separator className="my-4" />
                        <Button variant="destructive" className="w-full flex items-center gap-2" onClick={handleSignOut}>
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden sm:flex flex-col sm:h-screen sm:w-64 bg-gray-800 text-white shadow-lg p-4 space-y-4 fixed  left-0">
                <h2 className="text-lg font-bold text-gray-200">Dashboard</h2>
                <Separator />
                {tabs.map((tab) => (
                    <Link to={tab.path} key={tab.name} className="w-full">
                        <Button
                            variant={activeTab === tab.name ? "secondary" : "ghost"}
                            className="w-full text-left"
                            onClick={() => setActiveTab(tab.name)}
                        >
                            {tab.name}
                        </Button>
                    </Link>
                ))}
                <Separator />
                <Button variant="destructive" className="w-full flex items-center gap-2" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
            </div>
        </>
    );
};

export default UserSideBar;
