import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface TPrivateRoute {
  isPrivate?: boolean;
  isAuthenticated: boolean;
  children: ReactElement;
}
const PrivateRoute: FC<TPrivateRoute> = ({
  isPrivate = false,
  children,
  isAuthenticated,
}) => {
  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/signIn" />;
  }

  return children;
};

export default PrivateRoute;
