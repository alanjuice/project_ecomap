import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ExpertSideBar = () => {
    const [activeTab, setActiveTab] = useState("Spottings");

    const tabs = [
        { name: "Spottings", path: "/expert/spottings" },
        { name: "Account", path: "/expert/account" },
    ];

    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <>
            {/* Horizontal Tabs for Small Screens */}
            <div className="sm:hidden bg-gray-800 text-white flex justify-around items-center py-2 shadow-lg w-100 h-12 ">
                {tabs.map((tab) => (
                    <Link
                        to={tab.path}
                        key={tab.name}
                        className={`text-sm px-4 py-2 rounded ${
                            activeTab === tab.name
                                ? "bg-gray-700"
                                : "hover:bg-gray-700"
                        }`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden sm:block sm:h-screen bg-gray-800 text-white shadow-lg p-4 space-y-6 sticky top-0">
                <div className="text-xl font-bold text-gray-200">Dashboard</div>
                <div className="space-y-4">
                    {tabs.map((tab) => (
                        <Link to={tab.path} key={tab.name}>
                            <button
                                className={`w-full text-left p-2 rounded ${
                                    activeTab === tab.name
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                }`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.name}
                            </button>
                        </Link>
                    ))}
                </div>
                <button
                    className="w-full mt-auto bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
        </>
    );
};

export default ExpertSideBar;
