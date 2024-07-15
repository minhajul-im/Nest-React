"use client";

import { ChangeEvent } from "react";

type SingleInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
};

const SingleInputComponent = ({
  value,
  onChange,
  placeholder,
  width = "w-full",
}: SingleInputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      className={`${width} bg-white border text-gray-500 border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline`}
    />
  );
};

export default SingleInputComponent;
