import { Outlet } from "react-router-dom";
import ExpertSideBar from "../components/ExpertSideBar";

const ExpertMainPage = () => {
    return (
        <div className="flex sm:flex-row flex-col">
            <ExpertSideBar />
            <Outlet />
        </div>
    );
};

export default ExpertMainPage;
