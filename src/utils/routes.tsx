import {
  Notifications,
  QuestionAnswer,
  Timeline,
  Toc,
  AccountCircle,
} from "@material-ui/icons";
import React from "react";

export const routes = [
  {
    name: "Dashboard",
    icon: <Timeline />,
    href: "/dashboard",
  },
  {
    name: "Table",
    icon: <Toc />,
    href: "/table",
  },
  {
    name: "Questionnaire",
    icon: <QuestionAnswer />,
    href: "/questionnaire",
  },
  {
    name: "Notifications",
    icon: <Notifications />,
    href: "/notifications",
  },
  {
    name: "Profile",
    icon: <AccountCircle />,
    href: "/profile",
  },
];
