import { Button } from "@shared/ui/button";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";

const Header: FC = () => {
  return (
    <header className="px-20 py-4 border-b-2 bg-neutral-50">
      <div className="flex items-center gap-10 w-11/12 mx-auto">
        <div className="text-2xl font-bold">Logo</div>
        <ul className="flex gap-4 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <div className="flex gap-4 ml-auto">
          <Button>Login</Button>
          <Button variant="outline">Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
