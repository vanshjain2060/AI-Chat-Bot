import React from "react";

const Button = ({
  children,
  onClick,
  className,
  variant = "primary",
  type = "button",
  ...props
}) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;

  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
