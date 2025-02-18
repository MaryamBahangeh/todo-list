import { Bounce, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider.tsx";
import i18next from "i18next";

function Toast() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <ToastContainer
      position={i18next.dir() === "rtl" ? "bottom-left" : "bottom-right"}
      autoClose={5000}
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

export default Toast;
