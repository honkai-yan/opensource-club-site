// 侧边栏配置-中文配置

import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "主页",
      icon: "home",
      link: "/",
    },
    {
      text: "社团活动",
      icon: "flag",
      prefix: "posts/",
      children: "structure",
      expanded: false,
    },
    {
      text: "技术分享",
      icon: "code",
      prefix: "tech-article/",
      children: "structure",
      expanded: false,
    },
    {
      text: "关于社团",
      icon: "user",
      link: "/intro.html",
    },
  ],
});
