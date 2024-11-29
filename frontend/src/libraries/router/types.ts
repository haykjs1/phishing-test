import type { FC } from "react";

export type TRoutePageType = {
  path: string;
  title: string;
  element: FC;
  isPrivate?: boolean;
};

export enum RoutePaths {
  Home = "/",
  SignIn = "/signIn",
  SignUp = "/signUp",
  Error = "*",
}
