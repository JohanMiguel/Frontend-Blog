import React, { useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "./routes.jsx";
import { Toaster } from "react-hot-toast";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App = () => {
  let element = useRoutes(routes);
  return (
    <>
      <ScrollToTop />
      {element}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};