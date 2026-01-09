import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { getDb } from "./utils/database.ts";
import { Collection } from "mongodb";

interface PersonDoc {
  name: string,
  age: number,
}

const app = new Hono();

app.use("*", cors());

app.get("/", () => {
  console.log("We got a request!");
  return new Response("Menu Manager server is running.");
});

app.get("/set-person", async (c) => {
  const [db, client] = await getDb();
  const names = c.req.queries("name");
  if (names === undefined) {
    throw new Error("Name not passed in.");

  } else if (names.length > 1) {
    throw new Error("Too many names provided.");
  }
  const ages = c.req.queries("age");
  if (ages === undefined) {
    throw new Error("Age not passed in.");

  } else if (ages.length > 1) {
    throw new Error("Too many ages provided.");
  }

  const name = names[0];
  const age = Number.parseInt(ages[0]);
  const personDoc: PersonDoc = { name: name, age: age };
  const collection: Collection<PersonDoc> = db.collection("People");

  try {
    await collection.insertOne(personDoc);

  } catch (e) {
    throw new Error("Unable to insert element into database", { cause: e});
  }
  await client.close();
  
  return new Response("Successfullly set person!");
});

console.log("Server listening");
Deno.serve(app.fetch);