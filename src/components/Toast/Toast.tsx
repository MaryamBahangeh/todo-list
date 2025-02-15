import { ReactElement, useContext } from "react";

import { ToastContainer, Bounce } from "react-toastify";

import i18next from "i18next";

import { ThemeContext } from "@/providers/ThemeProvider.tsx";

export default function Toast(): ReactElement {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick={false}
      rtl={i18next.dir() === "rtl"}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkMode ? "dark" : "light"}
      transition={Bounce}
    />
  );
}
