import AddLog from "pages/AddLog";
import EditLog from "pages/EditLog";
import { LogPage } from "pages/LogPage";
import Login from "pages/Login";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/log/:id",
        element:<LogPage/>
      },
      {
        path:"/add-log",
        element:<AddLog/>
      },
      {
        path:"/edit-log",
        element:<EditLog/>
      }
    ]
  }
])