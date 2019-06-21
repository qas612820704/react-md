import React from "react";
import * as MaterialIcons from "@react-md/material-icons";

import Code from "components/Code/Code";

import "./all-icons.scss";

const allIcons = Object.entries(MaterialIcons).filter(([name]) =>
  name.endsWith("SVGIcon")
);

const AllIcons = () => (
  <div className="all-icons-container">
    {allIcons.map(([name, Icon]) => (
      <div key={name} className="all-icons__info">
        <Icon />
        <Code className="all-icons__name">{name.replace(/SVGIcon/, "")}</Code>
      </div>
    ))}
  </div>
);

export default AllIcons;