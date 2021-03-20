import React from "react";
import { NavBar } from "../components/NavBar";
import { EnhancedTable } from "../components/Table";

export const Table: React.FC = () => {
  return (
    <NavBar>
      <EnhancedTable />
    </NavBar>
  );
};
