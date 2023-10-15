import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "vrx6wy",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
