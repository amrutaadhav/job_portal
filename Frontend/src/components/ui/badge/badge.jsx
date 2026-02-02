import * as React from "react";
import "./badge.css";

function Badge({
  className = "",
  variant = "default",
  ...props
}) {
  return (
    <div
      className={`badge badge-${variant} ${className}`}
      {...props}
    />
  );
}

export { Badge };
