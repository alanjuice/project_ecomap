import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SpeciesPage from "./pages/SpeciesPage";
import OccurrencePage from "./pages/OccurrencePage";
import ExpertLoginPage from "./pages/ExpertLoginPage";
import ExpertMainPage from "./pages/ExpertMainPage";
import SpottingListPage from "./pages/SpottingListPage";
import SpeciesDetailsPage from "./pages/SpeciesDetailsPage";
import SpottingDetailsPage from "./pages/SpottingDetailsPage";
import OccurenceDetailsPage from "./pages/OccurenceDetailsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminExpertsList from "./pages/AdminExpertsList";
import AdminUsersList from "./pages/AdminUsersList";
import ExpertAccountPage from "./pages/ExpertAccountPage";

let router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "species",
                element: <SpeciesPage />,
            },
            {
                path: "species/:id",
                element: <SpeciesDetailsPage />,
            },
            {
                path: "occurrence",
                element: <OccurrencePage />,
            },
            {
                path: "occurence/:id",
                element: <OccurenceDetailsPage />,
            },
            {
                path: "expert/",
                element: <ExpertMainPage />,
                children: [
                    {
                        path: "spottings",
                        element: <SpottingListPage />,
                    },
                    {
                        path: "account/",
                        element: <ExpertAccountPage />,
                    },
                    {
                        path: "spottings/:id",
                        element: <SpottingDetailsPage />,
                    },
                ],
            },
            {
                path: "admin/",
                element: <AdminMainPage />,
                children: [
                    {
                        path: "experts",
                        element: <AdminExpertsList />,
                    },
                    {
                        path: "users",
                        element: <AdminUsersList />,
                    },
                ],
            },
            {
                path: "expert/login",
                element: <ExpertLoginPage />,
            },
            {
                path: "admin/login",
                element: <AdminLoginPage />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
