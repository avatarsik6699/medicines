import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing.tree";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
