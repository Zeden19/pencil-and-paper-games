import { GiTicTacToe } from "react-icons/gi";
import { MdGridOff } from "react-icons/md";
import { PiDotsNineBold, PiPersonSimpleBold } from "react-icons/pi";
import tictactoe from "../assets/tictactoe.png"
import connect4 from "../assets/connect4.png"
import hangman from "../assets/hangman.png"
import dotsandboxes from "../assets/dots&boxes.png"

const className = "me-1";

export const gameFields = [
  {
    label: "Tic Tac Toe",
    description: "The Definition of Simple.",
    img: tictactoe,
    url: "games/tictactoe",
    icon: <GiTicTacToe className={className} />,
  },
  {
    label: "Connect 4",
    description: "4 In a Row Grants a Win!",
    img: connect4,
    url: "games/connect4",
    icon: <MdGridOff className={className} />,
  },
  {
    label: "Hangman",
    description: "Guess the Word, Letter by Letter.",
    img: hangman,
    url: "games/hangman",
    icon: <PiPersonSimpleBold className={className} />,
  },
  {
    label: "Dots And Boxes",
    description: "Place the Line, Get the Box.",
    img: dotsandboxes,
    url: "games/dotsandboxes",
    icon: <PiDotsNineBold className={className} />,
  },
];