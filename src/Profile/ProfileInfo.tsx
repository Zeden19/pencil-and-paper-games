import { Tables } from "../../database.types.ts";
import useUser from "../hooks/useUser.ts";

interface Props {
  profile: Tables<"profiles">;
  handleEditClick: () => void;
}

function ProfileInfo({ profile, handleEditClick }: Props) {
  const { user } = useUser();
  return (
    <>
      <h2 style={{ overflowWrap: "break-word" }}>{profile?.full_name}</h2>
      <p className={"text-secondary fw-normal p-1"}>{profile.description}</p>

      {user?.id === profile.id && (
        <button onClick={handleEditClick} className={"btn btn-secondary w-100 mb-5"}>
          Edit
        </button>
      )}
    </>
  );
}

export default ProfileInfo;
