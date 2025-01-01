import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SpeciesPage from "./pages/SpeciesPage";
import OccurrencePage from "./pages/OccurrencePage";
import ExpertLoginPage from "./pages/ExpertLoginPage";
import ExpertMainPage from "./pages/ExpertMainPage";
import SpottingListPage from "./pages/SpottingListPage";
import ExpertSignUpPage from "./pages/ExpertSignUpPage";
import SpeciesDetailsPage from "./pages/SpeciesDetailsPage";
import SpottingDetailsPage from "./pages/SpottingDetailsPage";
import OccurenceDetailsPage from "./pages/OccurenceDetailsPage";

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
                        path: "spottings/:id",
                        element: <SpottingDetailsPage />,
                    },
                ],
            },
            {
                path: "expert/login",
                element: <ExpertLoginPage />,
            },
            {
                path: "expert/signup",
                element: <ExpertSignUpPage />,
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
