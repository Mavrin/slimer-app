import React from "react";
import "./app.css";
import src from "./icon.svg";
export function AppLayout({ header, content }) {
  return (
    <div className="app">
      <header>
        <img src={src} alt="" />
        {header}
      </header>
      <main>{content}</main>
      <footer />
    </div>
  );
}
