import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  waitForAnimations: true,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  viewportWidth: 1200
});
