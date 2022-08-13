import React from "react";

const Input = ({ name, placeholder, onChange, value, type, children }) => {
  return (
    <div className="my-4">
      <label className="block mb-1 text-lg" htmlFor={name}>
        {children}
      </label>
      <input
        className="px-6 py-2 rounded-md bg-zinc-800 border-zinc-400 focus:border-zinc-100 border-solid border-2 focus:outline-none w-96"
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

export default Input;
