import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni()
  ],
  define: {
    ROUTES: (() => {
      const data = fs.readFileSync(path.resolve(__dirname, './src/pages.json'), 'utf-8');
      const pages = eval(`(${data})`).pages;
      const subPackages = (eval(`(${data})`).subPackages).map((item) => {
        return item.pages.map((subItem) => {
          return {
            ...subItem,
            path: `${item.root}/${subItem.path}`
          }
        })
      }).flat(2);
      return [...pages, ...subPackages]
    })()
  }
});
