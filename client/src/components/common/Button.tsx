import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFullWidth?: boolean;
  text?: string;
  className?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = ({
  isFullWidth,
  text = "Button Text",
  className = "",
  ...props
}: IButtonProps) => {
  return (
    <button
      className={`${
        isFullWidth ? "w-full" : ""
      } inline-block text-white px-[22px] py-[18px] font-semibold font-arupala cursor-pointer !text-white transition-colors duration-200 ease-in-out focus:outline-none ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
