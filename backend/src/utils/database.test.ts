import { testDb } from "./database.ts";
import { assertEquals } from "@std/assert";
import { Collection } from "mongodb";

interface PersonDoc {
  name: string,
  age: number,
}

Deno.test("Simple database connection test", async (t) => {
  const [db, client] = await testDb();
  const personDoc: PersonDoc = { name: "John Smith", age: 30 };
  const collection: Collection<PersonDoc> = db.collection("dogs");

  await t.step("Add element", async () => {
    await collection.insertOne(personDoc);
  });

  const resultDoc = await collection.findOne(personDoc);

  await t.step("Validate document", () => {
    if (!resultDoc) {
      throw new Error("Document wasn't found");

    } else {
      assertEquals("John Smith", resultDoc.name, "Incorrect name.");
      assertEquals(30, resultDoc.age, "Incorrect age.");
    }
  });

  await client.close();
});
