import { Tables } from "../../database.types.ts";

interface Props {
  profile: Tables<"profiles">;
  handleEditClick: () => void;
}

function ProfileInfo({ profile, handleEditClick }: Props) {
  return (
    <>
      <h2>{profile?.full_name}</h2>
      <p className={"text-secondary fw-normal p-1"}>{profile.description}</p>
      <button onClick={handleEditClick} className={"btn btn-secondary w-100"}>
        Edit
      </button>
    </>
  );
}

export default ProfileInfo;
