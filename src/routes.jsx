import React from "react";
import { HomePage } from "./pages/homgePage";
import { DetailsPostPage } from "./components/DetailsPostPage";

export const routes = [
  { path: "/*", element: <HomePage /> },
  { path: "buscar/:postId", element: <DetailsPostPage /> },
  
];