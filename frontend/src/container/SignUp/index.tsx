import { useCallback, FC } from "react";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import "./SignUp.css";
import { TSignUpProps } from "./types";

import { Input } from "components";
import { signUp } from "store/auth/actions";
import { registerScheme } from "utils/schemes";
import { useAppDispatch } from "libraries";
import { RoutePaths } from "libraries/router/types";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TSignUpProps>({
    mode: "onChange",
    resolver: yupResolver(registerScheme),
  });

  const submitFormHandler = useCallback(
    (data: TSignUpProps) => {
      try {
        dispatch(
          signUp({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
          })
        );
        reset();
        navigate(RoutePaths.Home);
      } catch (error) {}
    },
    [dispatch, navigate, reset]
  );

  return (
    <div className="wrapper">
      <div className="register_wrapper__container">
        <form
          className="wrapper__form"
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <Input
            name="fullName"
            label="Name"
            register={register}
            placeholder="Full Name"
            className="wrapper__input__inp"
          />

          <Input
            name="email"
            label="Email"
            register={register}
            placeholder="Email"
            className="wrapper__input__inp"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            register={register}
            className="wrapper__input__inp"
            placeholder="Enter password"
          />

          <div className="wrapper__controler">
            <button
              type="submit"
              disabled={!isValid && isDirty}
              className={classNames("wrapper__form__btn", {
                wrapper__form__btn_reg_disabled: !isEmpty(errors),
              })}
            >
              Sign Up
            </button>
            <button
              style={{
                border: "2px solid grey",
                backgroundColor: "transparent !important",
              }}
              className="wrapper__register"
              onClick={() => navigate(RoutePaths.SignIn)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
