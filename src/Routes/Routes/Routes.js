import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home/Home";
import Main from "./../../Layout/Main";
import SignUp from "./../../Pages/SignUp/SignUp";
import SignIn from "./../../Pages/SignIn/SignIn";
import About from "./../../Pages/About/About/About";
import PostDetails from "../../Pages/Home/PostDetails/PostDetails";
import PrivateRouter from "../../PrivateRouter/PrivateRouter";
import Messenger from "../../Pages/Messenger/Messenger";
import NotFound from "../../Pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/single-post/:id",
        element: (
          <PrivateRouter>
            <PostDetails />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/post/${params.id}`),
      },
      {
        path: "/messenger",
        element: (
          <PrivateRouter>
            <Messenger />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
