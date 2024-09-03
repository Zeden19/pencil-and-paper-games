import express, { Request, Response } from "express";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.redirect("http://localhost:5173/");
});

app.get("/auth/callback", async function (req, res) {
  const code = req.query.code;
  const next = req.query.next ?? "/";

  if (code) {
    const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
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
    });
    await supabase.auth.exchangeCodeForSession(code);
  }
  res.redirect(303, `/${next.slice(1)}`);
});

app.listen(port, () => {
  console.log(`Server running at http:localhost:${port}`);
});
