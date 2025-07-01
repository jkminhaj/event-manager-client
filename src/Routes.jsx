import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Events from "./Pages/Events/Events";
import AddEvent from "./Pages/AddEvent/AddEvent";
import MyEvents from "./Pages/MyEvents/MyEvents";

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
            element:<Events/>
        },
        {
            path:"/addEvents",
            element:<AddEvent/>
        },
        {
            path:"/myEvents",
            element:<MyEvents/>
        }
    ]
  },
]);