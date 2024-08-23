import { createBrowserRouter } from "react-router-dom";
import TicTacToePage from "./TicTacToePage.tsx";
import DotsAndBoxesPage from "./DotsAndBoxesPage.tsx";
import HangmanPage from "./HangmanPage.tsx";
import Connect4Page from "./Connect4Page.tsx";
import HomePage from "./HomePage.tsx";
import AboutPage from "./AboutPage.tsx";
import ContactPage from "./ContactPage.tsx";
import Layout from "./Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "tictactoe",
        element: <TicTacToePage />,
      },
      {
        path: "dotsandboxes",
        element: <DotsAndBoxesPage />,
      },
      {
        path: "hangman",
        element: <HangmanPage />,
      },
      {
        path: "connect4",
        element: <Connect4Page />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);
export default router;
