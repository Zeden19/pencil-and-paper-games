import { createBrowserRouter } from "react-router-dom";
import TicTacToePage from "../games/TicTacToe/TicTacToePage.tsx";
import DotsAndBoxesPage from "../games/Dots&Boxes/DotsAndBoxesPage.tsx";
import HangmanPage from "../games/HangMan/HangmanPage.tsx";
import Connect4Page from "../games/Connect4/Connect4Page.tsx";
import HomePage from "../HomePage.tsx";
import AboutPage from "../About/AboutPage.tsx";
import ContactPage from "../Contact/ContactPage.tsx";
import Layout from "./Layout.tsx";
import ProfilePage from "../Profile/ProfilePage.tsx";
import LeaderboardPage from "../Leaderboard/LeaderboardPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/games/tictactoe",
        element: <TicTacToePage />,
      },
      {
        path: "/games/dotsandboxes",
        element: <DotsAndBoxesPage />,
      },
      {
        path: "/games/hangman",
        element: <HangmanPage />,
      },
      {
        path: "/games/connect4",
        element: <Connect4Page />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/account/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);
export default router;
