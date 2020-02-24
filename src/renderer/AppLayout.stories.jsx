import React from "react";
import { storiesOf } from "@storybook/react";

import { AppLayout } from "./AppLayout";

const files = [
  {
    name: "Promo",
    path: "/user/Promo"
  }
];

storiesOf(`App layout`, module)
  .addDecorator(storyFn => {
    const style = "#root{height: 100%}";
    return (
      <>
        <style>{style}</style>
        {storyFn()}
      </>
    );
  })
  .add(`step 1`, () => {
    return <AppLayout step={1} />;
  })
  .add(`step 2`, () => {
    return <AppLayout step={2} selectedFiles={files} />;
  });
