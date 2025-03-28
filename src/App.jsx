import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

// User Routes
import Home from "./pages/user/Home";

import Species from "./pages/user/Species";
import SpeciesDetails from "./pages/user/SpeciesDetails";

import Occurrence from "./pages/user/Occurence";
import OccurenceDetails from "./pages/user/OccurenceDetails";

// Expert Routes
import ExpertLogin from "./pages/expert/Login";
import ExpertMain from "./pages/expert/Main";
import ExpertAccount from "./pages/expert/Account";
import ExpertHistory from "./pages/expert/History";
import SpottingList from "./pages/expert/SpottingList";
import SpottingDetails from "./pages/expert/SpottingDetails";

// Admin Routes
import AdminLogin from "./pages/admin/Login";
import AdminMain from "./pages/admin/Main";
import AdminList from "./pages/admin/AdminList";

// Fallback Route
import NotFound from "./pages/common/NotFound";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import PendingUsers from "./pages/admin/PendingUsers";

// Create a router
let router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "species",
                element: <Species />,
            },
            {
                path: "species/:id",
                element: <SpeciesDetails />,
            },
            {
                path: "occurrence",
                element: <Occurrence />,
            },
            {
                path: "occurence/:id",
                element: <OccurenceDetails />,
            },
            {
                path: "expert/",
                element: <ExpertMain />,
                children: [
                    {
                        path: "",
                        element: <></>,
                    },
                    {
                        path: "spottings",
                        element: <SpottingList />,
                    },
                    {
                        path: "account/",
                        element: <ExpertAccount />,
                    },
                    {
                        path: "history/",
                        element: <ExpertHistory />,
                    },
                    {
                        path: "spottings/:id",
                        element: <SpottingDetails />,
                    },
                ],
            },
            {
                path: "admin/",
                element: <AdminLogin />,
            },
            {
                path: "admin/",
                element: <AdminMain />,
                children: [
                    {
                        path: "",
                        element: <></>,
                    },
                    {
                        path: "experts",
                        element: <AdminList resource={"Expert"} />,
                    },
                    {
                        path: "users",
                        element: <AdminList resource={"User"} />,
                    },
                    {
                        path: "users/pending",
                        element: <PendingUsers />,
                    },
                    {
                        path: "species",
                        element: <AdminList resource={"Species"} />,
                    },
                ],
            },
            {
                path: "expert/login",
                element: <ExpertLogin />,
            },
            {
                path: "admin/login",
                element: <AdminLogin />,
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider>
                        <RouterProvider router={router}></RouterProvider>
                    </ToastProvider>
                </QueryClientProvider>
            </AuthProvider>
        </>
    );
}

export default App;
