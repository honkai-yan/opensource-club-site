// 侧边栏配置-中文配置

import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "社团活动",
      icon: "flag",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "技术分享",
      icon: "code",
      prefix: "tech-article/",
      children: "structure"
    },
    "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
