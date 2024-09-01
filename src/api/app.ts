import express, {Express, Request, Response} from "express";
const app = express();
const port = 3000;

app.get("/api", (req : Request, res : Response) => {
  res.send("Hello its me!!!!!")
});

app.listen(port, () => {
  console.log(`Server running at http:localhost:${port}`);
})