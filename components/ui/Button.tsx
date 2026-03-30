import { type ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`btn-primary custom ${rest.className}`}>
      {children}
    </button>
  );
}
