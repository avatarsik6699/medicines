import type { FC } from "react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Badge: FC<Props> = ({ children }) => {
  return (
    <div className="h-5 bg-gray-200 inline-flex items-center px-2 text-xs text-gray-600 rounded-md my-1 ml-1 select-none capitalize font-medium">
      {children}
    </div>
  );
};

export default Badge;
