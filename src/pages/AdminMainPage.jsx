import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";

const AdminMainPage = () => {
    return (
        <div className="flex sm:flex-row flex-col">
            <AdminSideBar />
            <Outlet />
        </div>
    );
};

export default AdminMainPage;
