export function gamesPlayingMapping(game: string) {
  switch (game) {
    case "TicTacToe":
      return "tictactoegamesplayed";
    case "Hangman":
      return "hangmangamesplayed";
    case "Connect 4":
      return "connect4gamesplayed";
  }
  return "tictactoegamesplayed";
}