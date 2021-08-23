import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { name } from "./package.json";
import path from "path";
import html from "@rollup/plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    reactRefresh(),
    html({
      template: ({ attributes, files, meta, publicPath, title }) => {
        const makeHtmlAttributes = (attributes) => {
          if (!attributes) {
            return "";
          }
          const keys = Object.keys(attributes);
          return keys.reduce(
            (result, key) => (result += ` ${key}="${attributes[key]}"`),
            ""
          );
        };
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join("\n");

        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join("\n");

        const metas = meta
          .map((input) => {
            const attrs = makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join("\n");

        return `
          <!doctype html>
          <html${makeHtmlAttributes(attributes.html)}>
            <head>
              ${metas}
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>${title}</title>
              ${links}
              <link href="./style.css" rel="stylesheet"></link>
            </head>
            <body>
              <div id="root"></div>
              ${scripts}
            </body>
          </html>`;
      },
    }),
  ],
  optimizeDeps: {
    // exclude: ["lodash-es"],
  },
  build: {
    assetsInlineLimit: 0,
    lib: {
      name: `${name}-[name]`,
      entry: path.resolve(__dirname, "./src/main.tsx"),
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
      },
    },
    cssCodeSplit: false,
  },
  server: {
    port: 4003,
  },
});
