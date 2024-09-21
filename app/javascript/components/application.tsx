import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import {mount} from '../mount'

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

mount({
  App,
});