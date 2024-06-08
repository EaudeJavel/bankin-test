import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      // #6562FD
      className="bg-[#6562FD] hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-56"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
