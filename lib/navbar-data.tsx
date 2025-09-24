import { BiPhotoAlbum, BiChat } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";
import {
  MdDashboard,
  MdFolder,
  MdBarChart,
  MdListAlt,
  MdGroup,
} from "react-icons/md"; // React Icons Material

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
      icon: MdListAlt, // menggantikan IconListDetails
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: MdBarChart, // menggantikan IconChartBar
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: MdDashboard, // menggantikan IconDashboard
    },
    {
      title: "Projects",
      url: "/projects",
      icon: MdFolder, // menggantikan IconFolder
    },
    {
      title: "Team",
      url: "/team",
      icon: MdGroup, // menggantikan IconUsers
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
