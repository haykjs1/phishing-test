import {
  useState,
  HTMLInputTypeAttribute,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  FC,
  SVGProps,
} from "react";
import classNames from "classnames";

import "./Input.css";
import { HideIcon, ShowIcon } from "assets";

interface TInput {
  name: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  type?: HTMLInputTypeAttribute;
  register?: any;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string | number;
  containerClass?: string;
  onBlur?: (data: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (data: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (data: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (
    value: string | number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

const Input: FC<TInput> = ({
  label,
  name,
  Icon,
  containerClass = "",
  onChange,
  className = "",
  onFocus,
  register,
  onKeyDown,
  placeholder = "",
  type = "text",
  autoComplete = "off",
  value,
  onBlur,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isPassword = type === "password";

  const inputClassName = classNames(className, "input", {
    input__icon: Icon,
  });

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value, e);
  };
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  const onRegisterChangeCallback = {
    onChange: onChangeValueHandler,
    onBlur: onBlurHandler,
  };

  return (
    <div
      className={classNames("input_wrapper", {
        [containerClass]: containerClass,
      })}
    >
      {label && <span className="label">{label}</span>}

      <div className="box">
        {Icon ? <Icon className="icon" /> : null}

        <input
          onChange={onChangeValueHandler}
          onBlur={onBlurHandler}
          disabled={disabled}
          onFocus={onFocus}
          placeholder={placeholder}
          name={name}
          value={value}
          className={inputClassName}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
          type={isOpen ? "text" : type}
          {...(register ? register(name, onRegisterChangeCallback) : null)}
        />

        {isPassword && (
          <div className="container">
            {isPassword && (
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={classNames("eye", {
                  eye__open: isOpen,
                })}
              >
                {!isOpen ? <HideIcon /> : <ShowIcon />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Input;
