// 导航栏配置-中文配置

import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
    icon: "home",
    link: "/",
  },
  {
    text: "社团活动",
    icon: "flag",
    link: "/posts/",
  },
  {
    text: "技术",
    icon: "code",
    link: "/tech-article/",
  },
  {
    text: "关于社团",
    icon: "user",
    link: "/intro",
  },
]);
