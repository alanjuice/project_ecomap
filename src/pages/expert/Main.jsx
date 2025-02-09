import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import UserSideBar from "../../components/UserSidebar";

const ExpertMain = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (
            !localStorage.getItem("token") &&
            !localStorage.getItem("role") == "expert"
        ) {
            navigate("/expert/login");
            return;
        }
        setIsAuthenticated(true);
    }, []);

    if (isAuthenticated)
        return (
            <div className="flex sm:flex-row flex-col">
                <UserSideBar userType={"expert"} />
                <Outlet />
            </div>
        );
};

export default ExpertMain;
