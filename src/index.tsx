import react, { useState, useEffect } from "react";
import { ToastState } from "./state";

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = () => {
  const [toasts, setToasts] = useState(false);

  useEffect(() => {}, []);

  return <ol></ol>;
};

const Toast = () => {
  return <li></li>;
};
