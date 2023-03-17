import React from "react";
import classNames from "classnames";

interface Props {
    className?: string;
}

export default function Spinner({className}: Props) {
  return (
    <div className={classNames("flex justify-center items-center", className)}>
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <circle
          className="opacity-25"
          cx="10"
          cy="10"
          r="8"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path d="M10 2.5a7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5 7.5 7.5 0 0 1-7.5-7.5 7.5 7.5 0 0 1 7.5-7.5zM10 6.5v3.5l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}