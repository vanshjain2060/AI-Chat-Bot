import React from "react";

const Avatar = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`testimonial-avatar ${className}`}
      {...props}
    />
  );
};

export default Avatar;
