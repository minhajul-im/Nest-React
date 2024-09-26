import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-3xl font-extrabold text-center text-foreground py-6">
      {children}
    </h1>
  );
};

export default Title;
