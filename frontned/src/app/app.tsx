import { type FC } from "react";
import "./app.css";
import { Outlet } from "@tanstack/react-router";
import QueryClientProvider from "./providers/query-client";
import { Toaster } from "sonner";
import Header from "@widgets/header";

const App: FC = () => {
  return (
    <QueryClientProvider>
      <Header />

      <main className="px-20 py-4">
        <div className="w-11/12 mx-auto">
          <Outlet />
        </div>
      </main>

      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
