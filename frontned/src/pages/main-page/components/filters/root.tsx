import type { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Root: FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <aside className="w-4/12 min-w-2xs space-y-4">{children}</aside>
    </div>
  );
};

export default Root;
