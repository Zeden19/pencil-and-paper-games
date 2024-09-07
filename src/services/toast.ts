import { Bounce, toast as toastLaunch } from "react-toastify";

function toast(message: string, status: "success" | "error") {
  toastLaunch(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type: status,
  });
}

export default toast;
