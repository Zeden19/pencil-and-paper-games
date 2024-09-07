import { MdAccountCircle } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { Bounce, ToastContainer } from "react-toastify";
import supabase from "../services/supabase-client.ts";
import useUser from "../hooks/useUser.ts";
import { Link } from "react-router-dom";
import toast from "../services/toast.ts";

interface Props {
  iconRightSize: string;
}

function AuthControl({ iconRightSize }: Props) {
  const { user, setUser } = useUser();

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

    setUser(null);
    toast("Successfully logged out", "success");
  }

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
            <>
              <li onClick={signOut} role={"button"} className={"dropdown-item"}>
                <PiSignOutBold className={"me-1"} />
                Sign Out
              </li>
              <Link to={`/account/${user!.id}`} role={"button"} className={"dropdown-item"}>
                <li>
                  <MdAccountCircle className={"me-1"} />
                  Profile
                </li>
              </Link>
            </>
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
