import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

const app = new Hono();

app.use("*", cors());

app.get("/", () => {
  console.log("We got a request!");
  return new Response("Menu Manager server is running.");
});

console.log("Server listening");

Deno.serve(app.fetch);