import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

import { BiPhotoAlbum, BiChat } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";

const dataUrl = {
  user: {
    name: "Andrianto",
    label: "AN",
    username: "@Dricode",
    avatar: "/user/01.png",
    verified: "verified.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IoHomeOutline,
    },
    {
      title: "About",
      url: "/about",
      icon: IconListDetails,
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: IconChartBar,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: BiChat,
    },
    {
      title: "Album",
      url: "/album",
      icon: BiPhotoAlbum,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: TiContacts,
    },
  ],
};

export default dataUrl;
