import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Events from "./Pages/Events/Events";
import AddEvent from "./Pages/AddEvent/AddEvent";
import MyEvents from "./Pages/MyEvents/MyEvents";
import Login from "./Pages/Authentication/Login/Login";
import Register from "./Pages/Authentication/Register/Register";
import PrivateRoute from "./Protected/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // errorElement:<Error></Error>,
    children: [
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/events",
            element:<PrivateRoute><Events/></PrivateRoute>
        },
        {
            path:"/addEvents",
            element:<PrivateRoute><AddEvent/></PrivateRoute>
        },
        {
            path:"/myEvents",
            element:<PrivateRoute><MyEvents/></PrivateRoute>
        }
    ]
  },
  {
    path: "/signin",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Register/>
  }
]);