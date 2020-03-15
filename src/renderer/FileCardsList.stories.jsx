import * as React from "react";
import { storiesOf } from "@storybook/react";

import { FileCardsList } from "./FileCardsList";

const files = [
  {
    name: "Promo",
    path: "/user/Promo",
    status: "ready"
  },
  {
    name: "Promo",
    path: "/user/Promo",
    status: "ready"
  },
  {
    name: "Promo",
    path: "/user/Promo",
    status: "ready"
  },
  {
    name: "Promo",
    path: "/user/Promo",
    status: "ready"
  },
  {
    name: "Promo",
    path: "/user/Promo",
    status: "ready"
  }
];

storiesOf(`File Lists`, module).add(`list`, () => {
  return (
    <div style={{ padding: 20 }}>
      <FileCardsList files={files} />
    </div>
  );
});
