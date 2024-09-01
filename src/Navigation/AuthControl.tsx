import { MdAccountCircle } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Bounce, toast, ToastContainer } from "react-toastify";
import supabase from "../services/supabase-client.ts";

interface Props {
  iconRightSize: string;
}

function AuthControl({ iconRightSize }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    getSession();
  }, []);

  async function getSession() {
    const { data: user, error } = await supabase.auth.getSession();
    setUser(user.session?.user);
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);

    setUser(undefined);
    notify();
  }

  const notify = () =>
    toast("Successfully Logged out.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      type: "success",
    });
  return (
    <li className="d-flex">
      <div style={{ width: iconRightSize }} className={"dropdown nav-item"}>
        {user ? (
          <img
            src={user.user_metadata.avatar_url}
            alt={"User avatar"}
            className={"nav-link dropdown-toggle rounded-circle border border-black w-100"}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role={"button"}
          />
        ) : (
          <MdAccountCircle
            className={"nav-link dropdown-toggle"}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role={"button"}
            size={iconRightSize}
          />
        )}
        <ul className={"dropdown-menu dropdown-menu-start dropdown-menu-md-end"}>
          {user ? (
            <li onClick={signOut} role={"button"} className={"dropdown-item"}>
              <PiSignOutBold className={"me-1"} />
              Sign Out
            </li>
          ) : (
            <li onClick={signIn} role={"button"} className={"dropdown-item"}>
              <PiSignInBold className={"me-1"} />
              Sign In
            </li>
          )}
        </ul>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </li>
  );
}

export default AuthControl;