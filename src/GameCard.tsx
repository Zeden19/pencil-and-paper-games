interface Props {
  label: string;
  description: string;
  img: string;
}

function GameCard({label, description, img}: Props) {
  return (
    <div className={"card p-3 text-start h-100"}>
      {/*todo: fix image sizes*/}
      <img width={"250px"} height={"250px"} src={img} alt={label} className={"card-img-top border border-2"}/>
      <div className={"card-body d-flex flex-column"}>
        <h5 className={"card-title text-body"}>{label}</h5>
        <p className={"card-text"}>{description}</p>
        <a className={"btn btn-primary mt-auto"} role={"button"}>Play now!</a>
      </div>
    </div>
  )
}

export default GameCard;