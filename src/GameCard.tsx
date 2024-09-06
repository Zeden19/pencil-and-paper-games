import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

interface Props {
  label: string;
  description: string;
  img: string;
  url: string;
}

function GameCard({ label, description, img, url }: Props) {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`card p-3 text-start h-100 ${styles.gameCard}`}>
      {loading && (
        <p className={"placeholder-glow"}>
          <span style={{height: "200px"}} className={"placeholder col-12 "}></span>
        </p>
      )}
      <img
        onLoad={() => setLoading(false)}
        src={img}
        alt={label}
        style={{ display: loading ? "none" : "block" }}
        className={"card-img-top border border-2 object-fit-scale"}
      />
      <div className={"card-body d-flex flex-column"}>
        <h5 className={"card-title text-body"}>{label}</h5>
        <p className={"card-text"}>{description}</p>
        <Link className={"btn btn-primary mt-auto stretched-link "} role={"button"} to={url}>
          Play now!
        </Link>
      </div>
    </div>
  );
}

export default GameCard;
