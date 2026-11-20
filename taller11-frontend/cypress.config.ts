import { defineConfig } from "cypress";
import { build } from "vite";
import * as path from "node:path";

//Profesor. Si ve esto, tuve que modificar este archivo porque
// C:\Users\Klonmah! tenía un signo de exclamación y Vite no lo soporta. 


export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8100",
    setupNodeEvents(on) {
      on("file:preprocessor", async (file) => {
        const outDir = "C:\\cypress-bundles";
        const outName = path.basename(file.outputPath);

        await build({
          configFile: false,
          logLevel: "silent",
          build: {
            outDir,
            emptyOutDir: false,
            write: true,
            lib: {
              entry: file.filePath,
              formats: ["iife"],
              name: "CypressSpec",
              fileName: () => outName,
            },
          },
        });

        return path.join(outDir, outName);
      });
    },
  },
});