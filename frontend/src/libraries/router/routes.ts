import { lazy } from "react";

import { RoutePaths, type TRoutePageType } from "./types";

const HomePage = lazy(() => import("container/Home"));
const ErrorPage = lazy(() => import("container/Error"));
const SignInPage = lazy(() => import("container/SignIn"));
const SignUpPage = lazy(() => import("container/SignUp"));

const routesList: TRoutePageType[] = [
  {
    element: HomePage,
    path: RoutePaths.Home,
    isPrivate: true,
    title: "Home",
  },
  {
    element: SignInPage,
    path: RoutePaths.SignIn,
    title: "Login page",
  },
  {
    element: SignUpPage,
    path: RoutePaths.SignUp,
    title: "Register pages",
  },
  {
    element: ErrorPage,
    path: RoutePaths.Error,
    title: "Error Page",
  },
];

export default routesList;
