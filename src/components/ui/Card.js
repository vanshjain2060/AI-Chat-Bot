import React from 'react';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`feature-card ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;

