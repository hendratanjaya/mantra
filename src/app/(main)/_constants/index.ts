import { FaTasks } from "react-icons/fa";
import { MdDashboard, MdOutlineDocumentScanner } from "react-icons/md";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MdDashboard,
  },
  {
    title: "Course",
    url: "/course",
    icon: FaTasks,
  },
  {
    title: "Summarize",
    url: "/summarize",
    icon: MdOutlineDocumentScanner
  }
];
