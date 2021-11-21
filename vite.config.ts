import path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import WindiCSS from "vite-plugin-windicss"
import AutoImport from "unplugin-auto-import/vite"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue(),
    WindiCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ["vue"],
      dts: "src/auto-imports.d.ts",
    }),
  ],
})
