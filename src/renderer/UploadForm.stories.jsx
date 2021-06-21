import * as React from "react";
import { storiesOf } from "@storybook/react";

import { UploadForm } from "./UploadForm";

const files = [
  {
    name: "Promo",
    path: "/user/Promo",
  },
];

storiesOf(`UploadForm`, module)
  .add(`step 1`, () => {
    return <UploadForm step={1} />;
  })
  .add(`step 2`, () => {
    return <UploadForm step={2} selectedFiles={files} />;
  });
