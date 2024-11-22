import React from "react";

const Textarea = ({ className, ...props }) => {
  return <textarea className={`form-textarea ${className}`} {...props} />;
};

export default Textarea;
