import { useCallback, useEffect, type FC } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { Input } from "components";
import { AuthSelectors } from "store/auth/selectors";
import { PhishingSelectors } from "store/phishing/selectors";
import { clearSignIn, userProfile } from "store/auth/actions";
import { PhishingEmailCard, TPhishingEmailCardProps } from "components";
import { phishingAttempts, phishingPost } from "store/phishing/actions";

import "./Home.css";
import { useAppDispatch, useAppSelector } from "libraries";
import { LogOutIcon } from "assets";
import classNames from "classnames";

export interface TPhishingProps {
  email: string;
}

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(AuthSelectors.userProfile);
  const phishing = useAppSelector(PhishingSelectors.phishing);

  const logOutHandler = () => {
    Cookies.remove("token");
    dispatch(clearSignIn());

    window.location.reload();
  };

  const renderPhishingList = phishing?.phishingAttempts?.phishingList?.map(
    ({ id, email, status, content }: TPhishingEmailCardProps) => (
      <PhishingEmailCard
        key={id}
        id={id}
        email={email}
        status={status}
        content={content}
      />
    )
  );

  const { register, reset, handleSubmit } = useForm<TPhishingProps>({
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (data: TPhishingProps) => {
      dispatch(phishingPost({ email: data.email }));
      reset();
    },
    [dispatch, reset]
  );

  useEffect(() => {
    dispatch(userProfile());
    dispatch(phishingAttempts());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home_wrapper">
      <div className="wrapper__container">
        <form onSubmit={handleSubmit(onSubmit)} className="wrapper__phishing">
          <Input
            name="email"
            register={register}
            placeholder="example@gmail.com"
            className={classNames("wrapper__phishing__inp", {})}
          />

          <button className="wrapper__phishing_btn">Submit</button>
        </form>
        <header className="header">
          <div className="header_title">
            <p>name: {user?.data?.fullName}</p>
            <p>email: {user?.data?.email}</p>
          </div>
          <div className="header__right">
            <div className="lineee" />
            <button className="wrapper__head_btn" onClick={logOutHandler}>
              <LogOutIcon />
            </button>
          </div>
        </header>
      </div>

      <div className="wrapper__list">{renderPhishingList}</div>
    </div>
  );
};

export default Home;
