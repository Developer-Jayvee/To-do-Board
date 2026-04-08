import {
  Slide,
  toast,
  type ToastOptions,
  type ToastPosition,
} from "react-toastify";
export const defaultConfig: ToastOptions = {
  autoClose: 5000,
  transition: Slide,
  theme: "light",
};

export const notif = {
  success: (text: string, position: ToastPosition = "top-right") => {
    return toast.success(text, {
      ...defaultConfig,
      position: position,
    });
  },
  error: (text: string, position: ToastPosition = "top-right") => {
    return toast.error(text, {
      ...defaultConfig,
      position: position,
    });
  },
  info: (text: string, position: ToastPosition = "top-right") => {
    return toast.info(text, {
      ...defaultConfig,
      position: position,
    });
  },
  warning : (text: string, position: ToastPosition = "top-right") => {
    return toast.warning(text, {
      ...defaultConfig,
      position: position,
    });
  },
};
