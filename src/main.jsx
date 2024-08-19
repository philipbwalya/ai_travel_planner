import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./pages/index.jsx";
import Header from "./components/customs/Header.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import Gen from "./pages/Gen.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/gen",
    element: <Gen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
