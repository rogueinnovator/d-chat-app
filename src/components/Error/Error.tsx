"use client";
import React from "react";
import Style from "./Error.module.css";
interface ErrorProps {
  error: string;
}
const Error: React.FC<ErrorProps> = ({ error }) => {
  console.log("These are the Errors");

  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Fix the following Error</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;
