import express, { Request, Response } from "express";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import supabase from "../services/supabase-client.ts";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.redirect("http://localhost:5173/");
});

app.get("/auth/callback", async function (req, res) {
  const code = req.query.code;
  const next = req.query.next ?? "/";

  if (code) {
    const supabase = createServerClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(context.req.headers.cookie ?? "");
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              context.res.appendHeader("Set-Cookie", serializeCookieHeader(name, value, options)),
            );
          },
        },
      },
    );
    await supabase.auth.exchangeCodeForSession(code);
  }
  res.redirect(303, `/${next.slice(1)}`);
});
//
// app.patch("/ticTactToePlayed", async (req: Request, res: Response) => {
//   const body = await req.body;
//   console.log(body);
//
//   const { error } = await supabase
//     .from("profiles")
//     .update({ tictactoegamesplayed: body.gamesPlayed })
//     .eq("id", body.id);
//
//   if (error) res.send({ error: error });
//
//   res.send({ success: true });
// });

app.listen(port, () => {
  console.log(`Server running at http:localhost:${port}`);
});
