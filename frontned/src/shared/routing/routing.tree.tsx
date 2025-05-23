import App from "@app/app";
import MainPage from "@pages/main-page/main-page";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { z } from "zod";

const mainPageSearchParamsSchema = z.object({
  district: z.string().optional(),
  region: z.string().optional(),
  metro: z.string().optional(),
  pharmacyChain: z.string().optional(),
  dosage: z.string().optional(),
});

const app = createRootRoute({
  component: App,
});

const aboutPage = createRoute({
  getParentRoute: () => app,
  path: "/about",
  component: () => {
    return <div>about</div>;
  },
});

const mainPage = createRoute({
  getParentRoute: () => app,
  path: "/",
  component: MainPage,
  validateSearch: mainPageSearchParamsSchema,
  notFoundComponent: () => <div>404 Not Found</div>,
});

export const routeTree = app.addChildren([mainPage, aboutPage]);
