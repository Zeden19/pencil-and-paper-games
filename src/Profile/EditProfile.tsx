import { Tables } from "../../database.types.ts";
import React from "react";
import supabase from "../services/supabase-client.ts";
import toast from "../services/toast.ts";

interface Props {
  profile: Tables<"profiles">;
  handleSaveClick: () => void;
  setNewProfile: (profile: Tables<"profiles">) => void;
}

function EditProfile({ profile, handleSaveClick, setNewProfile }: Props) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();

    const fullName = form.fullName.value;
    const description = form.description.value;
    
    if (fullName.length > 50 || description.length > 500) {
      toast(
        "Name must be smaller than 50 characters and description must be smaller than 500 characters",
        "error",
      );
      return;
    }
    
    if (fullName.length === 0) {
      toast("You must enter a name", "error");
      return;
    }
    
    // optimistic changes
    setNewProfile({
      ...profile,
      full_name: fullName,
      description: description,
    });
    const oldProfile = profile;
    handleSaveClick();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, description: description })
      .eq("id", profile.id);

    if (error) {
      setNewProfile(oldProfile);
      toast("Could Not Save Changes", "error");
      return;
    }

    const { data } = await supabase.from("profiles").select().eq("id", profile.id);
    if (data) {
      setNewProfile(data[0]);
      toast("Successfully Saved Changes", "success");
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className={"mb-3"}>
        <label htmlFor={"fullName"} className={"form-label fw-bold"}>
          Name
        </label>
        <input
          type={"text"}
          className={"form-control"}
          id={"fullName"}
          defaultValue={profile.full_name!}
          aria-describedby="fullName"
        />
      </div>
      <div className={"mb-3"}>
        <label htmlFor={"description"} className={"form-label fw-bold"}>
          Description
        </label>
        <textarea
          className={"form-control"}
          id={"description"}
          defaultValue={profile.description ?? ""}
          aria-describedby="description"
        />
      </div>

      <button type={"submit"} className={"btn btn-success me-4"}>
        Save
      </button>
      <button onClick={handleSaveClick} className={"btn btn-secondary"}>Cancel</button>
    </form>
  );
}

export default EditProfile;
