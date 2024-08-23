import { Link } from "react-router-dom";

interface Props {
  label: string;
  description: string;
  img: string;
  url: string;
}

function GameCard({ label, description, img, url }: Props) {
  return (
    <div className={"card p-3 text-start h-100"}>
      {/*todo: fix image sizes*/}
      <img
        src={img}
        alt={label}
        className={"card-img-top border border-2 object-fit-scale"}
      />
      <div className={"card-body d-flex flex-column"}>
        <h5 className={"card-title text-body"}>{label}</h5>
        <p className={"card-text"}>{description}</p>
        <Link className={"btn btn-primary mt-auto"} role={"button"} to={url}>
          Play now!
        </Link>
      </div>
    </div>
  );
}

export default GameCard;
