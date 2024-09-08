import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";

function ProfileNotFound() {
  return (
    <div className={"container-fluid text-center"}>
      <MdError size={"10em"}/>
      <h1 className={"mb-4"}>Profile Not Found...</h1>
      <Link to={"/"} className={"btn btn-success"}>Back to Safety!</Link>
    </div>
  );
}

export default ProfileNotFound;
