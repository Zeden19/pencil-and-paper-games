import genericAvatar from "./assets/genericAvatar.jpg";

interface Props {
  className: string;
  src: string;
  dataBsToggle?: string
}

function Avatar({ src, className, dataBsToggle }: Props) {
  return (
    <img
      src={src}
      alt={"Avatar"}
      data-bs-toggle={dataBsToggle}
      className={"rounded rounded-circle border border-black border-2 " + className}
      onError={(event) => {
        const img = event.target as HTMLImageElement;
        img.src = genericAvatar;
      }}></img>
  );
}

export default Avatar;
