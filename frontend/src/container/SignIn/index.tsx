import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { Input } from "components";
import { signIn } from "store/auth/actions";

import "./SignIn.css";
import { loginScheme } from "utils/schemes";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useAppDispatch } from "libraries";
import { RoutePaths } from "libraries/router/types";

interface TLogInProps {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TLogInProps>({
    mode: "onChange",
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = useCallback(
    (data: TLogInProps) => {
      try {
        dispatch(signIn({ email: data.email, password: data.password }));

        setTimeout(() => {
          navigate(RoutePaths.Home);
        }, 300);
      } catch (error) {}
    },
    [dispatch, navigate]
  );

  return (
    <div className="login_wrapper">
      <div className="login_wrapper__container">
        <form className="wrapper__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            register={register}
            label="Email"
            placeholder="Enter email address"
            className="wrapper__input__inp"
          />

          <Input
            name="password"
            register={register}
            label="Password"
            type="password"
            className="wrapper__input__inp"
            placeholder="Enter password"
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <button
              type="submit"
              style={{ border: "none" }}
              disabled={!isValid && isDirty}
              className={classNames("wrapper__form__btn", {
                wrapper__form__btn_login_disabled: !isEmpty(errors),
              })}
            >
              Sign In
            </button>

            <button
              type="button"
              style={{
                border: "2px solid grey",
                backgroundColor: "transparent !important",
              }}
              className="wrapper__register"
              onClick={() => navigate(RoutePaths.SignUp)}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
