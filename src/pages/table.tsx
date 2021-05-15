import React from "react";
import { NavBar } from "../components/NavBar";
import { EnhancedTable } from "../components/Table";
import { useIsAuth } from "../utils/useIsAuth";

export const Table: React.FC = () => {
  useIsAuth();
  return (
    <NavBar>
      <EnhancedTable />
    </NavBar>
  );
};
