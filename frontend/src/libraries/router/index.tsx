import { FC, Suspense, useEffect, useMemo } from "react";
import { isNull } from "lodash";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { AuthSelectors } from "store/auth/selectors";
import { HelmetLayout, PrivateRoute } from "components";

import routesList from "./routes";
import { RoutePaths } from "./types";
import Cookies from "js-cookie";
import { useAppSelector } from "libraries/redux";

export const RoutesWrapper: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn } = useAppSelector(AuthSelectors.authSystem);
  const cookieToken = Cookies?.get("token");
  const isAuthenticatedCookie = cookieToken ? true : false;

  const isAuth = isAuthenticatedCookie || !isNull(signIn?.data?.access_token);

  useEffect(() => {
    if (isAuth && location.pathname.includes(RoutePaths.SignUp)) {
      navigate(RoutePaths.Home);
    }
  }, [isAuth, location.pathname, navigate]);

  const renderRoutes = useMemo(
    () =>
      routesList.map(({ element: Element, path, title, isPrivate }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute isPrivate={isPrivate} isAuthenticated={isAuth}>
              <Suspense>
                <HelmetLayout key={title} title={title}>
                  <Element />
                </HelmetLayout>
              </Suspense>
            </PrivateRoute>
          }
        />
      )),

    [isAuth]
  );

  return <Routes>{renderRoutes}</Routes>;
};
