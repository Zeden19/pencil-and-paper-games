import { Tables } from "../../database.types.ts";
import React from "react";
import supabase from "../services/supabase-client.ts";

interface Props {
  profile: Tables<"profiles">;
  handleSaveClick: () => void;
  setNewProfile: (profile : Tables<"profiles">) => void
}

function EditProfile({ profile, handleSaveClick, setNewProfile }: Props) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    handleSaveClick();
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: form.fullName.value, description: form.description.value })
      .eq("id", profile.id);

    const { data } = await supabase.from("profiles").select().eq("id", profile.id);
    if (data) setNewProfile(data[0])
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
      <button className={"btn btn-secondary"}>Cancel</button>
    </form>
  );
}

export default EditProfile;
