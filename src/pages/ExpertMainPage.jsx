import { Outlet, useNavigate } from "react-router-dom";
import ExpertSideBar from "../components/ExpertSideBar";
import { useEffect, useState } from "react";

const ExpertMainPage = () => {
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
                <ExpertSideBar />
                <Outlet />
            </div>
        );
};

export default ExpertMainPage;
