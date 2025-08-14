import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
      {...props}
    />
  );
};
