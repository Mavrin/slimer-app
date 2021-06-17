import React from "react";
import { storiesOf } from "@storybook/react";

import { AppLayout } from "./AppLayout";
import { FileCardsList } from "./FileCardsList";

const files = [
  {
    name: "Promo",
    path: "/user/Promo"
  },
  {
    name: "Promo 1",
    path: "/user/Promo1"
  },
  {
    name: "Promo 2",
    path: "/user/Promo2"
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
  .add(`about`, () => {
    return <AppLayout step={1} />;
  })
  .add(`file cards`, () => {
    return <AppLayout content={<FileCardsList files={files} />} />;
  });
