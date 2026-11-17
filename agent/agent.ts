import { defineAgent } from "eve";

export default defineAgent({
  defaultTools: false,
  model: process.env.FRIEND_MODEL ?? "google/gemini-2.5-flash",
});
