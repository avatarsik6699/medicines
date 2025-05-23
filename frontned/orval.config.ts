import { defineConfig } from "orval";

export default defineConfig({
  main: {
    input: "./src/shared/api/schema.json",
    output: {
      mode: "tags",
      namingConvention: "kebab-case",
      mock: false,
      target: "./src/shared/api/endpoints.ts",
      schemas: "./src/shared/api/models",
      prettier: true,

      override: {
        mutator: {
          path: "./src/shared/api/http-client.ts",
          name: "customInstance",
        },
      },
    },
  },
});
