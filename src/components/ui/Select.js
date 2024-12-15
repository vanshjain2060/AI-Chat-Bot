import React from "react";

const Select = ({ value, onChange, children, className, ...props }) => {
  return (
    <select value={value} onChange={onChange} className={`form-select ${className}`} {...props}>
      {children}
    </select>
  );
};

export default Select;