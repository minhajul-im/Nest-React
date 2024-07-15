"use client";

type ButtonProps = {
  children: string | React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="outline-none border border-gray-300 rounded-md px-2 py-1.5 text-gray-500 cursor-pointer hover:bg-gray-400 hover:text-white transition-all">
      {children}
    </button>
  );
};

export default Button;
