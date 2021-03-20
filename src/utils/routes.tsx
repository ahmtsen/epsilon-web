import React from "react";
import {
  Timeline,
  QuestionAnswer,
  Toc,
  AccountCircle,
  Notifications,
} from "@material-ui/icons";

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
