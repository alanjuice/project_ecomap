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
import AdminUsersList from "./pages/AdminListPage";
import ExpertAccountPage from "./pages/ExpertAccountPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NotFoundPage from "./pages/NotFoundPage";
import AdminListPage from "./pages/AdminListPage";

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
                        path: "",
                        element: <></>,
                    },
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
                element: <AdminLoginPage />,
            },
            {
                path: "admin/",
                element: <AdminMainPage />,
                children: [
                    {
                        path: "",
                        element: <></>,
                    },
                    {
                        path: "experts",
                        element: <AdminListPage resource={"Expert"} />,
                    },
                    {
                        path: "users",
                        element: <AdminListPage resource={"User"} />,
                    },
                    {
                        path: "species",
                        element: <AdminListPage resource={"Species"} />,
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
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

function App() {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
