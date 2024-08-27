import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "社团活动",
    icon: "flag",
    link: "/posts/",
  },
  {
    text: "技术分享",
    icon: "code",
    link: "/tech-article/"
  },
  {
    text: "关于社团",
    icon: "user",
    link: "/intro"
  }
]);
