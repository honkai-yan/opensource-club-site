import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "",
      description: "电子科技大学成都学院开放原子开源社团",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
