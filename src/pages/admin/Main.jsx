import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AdminSideBar from "../../components/UserSideBar";
import UserSideBar from "../../components/UserSideBar";

const AdminMain = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (
            !localStorage.getItem("token") &
            (!localStorage.getItem("role") == "admin")
        ) {
            navigate("/admin/login");
            return;
        }
        setIsAuthenticated(true);
    }, []);

    if (isAuthenticated)
        return (
            <div className="flex sm:flex-row flex-col">
                <UserSideBar userType={"admin"} />
                <Outlet />
            </div>
        );
};

export default AdminMain;
