import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SpeciesPage from "./pages/SpeciesPage";
import OccurrencePage from "./pages/OccurrencePage";
import ExpertLoginPage from "./pages/ExpertLoginPage";
import ExpertMainPage from "./pages/ExpertMainPage";
import SpottingListPage from "./pages/SpottingListPage";

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
        path: "occurrence",
        element: <OccurrencePage />,
      },
      {
        path: "expert/",
        element: <ExpertMainPage />,
        children: [
          {
          path:"spottings",
          element:<SpottingListPage/>
            }
        ]}
      ,
      {
        path: "expert/login",
        element: <ExpertLoginPage />,
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
