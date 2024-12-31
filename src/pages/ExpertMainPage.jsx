import {Outlet} from "react-router-dom"
import ExpertSideBar from "../components/ExpertSideBar";

const ExpertMainPage = () => {
    return ( <div className="flex">
    <ExpertSideBar/>
    <Outlet/>
    </div> );
}
 
export default ExpertMainPage;