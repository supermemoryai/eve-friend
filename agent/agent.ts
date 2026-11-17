import { defineAgent } from "eve";

export default defineAgent({
  defaultTools: false,
  model: process.env.FRIEND_MODEL ?? "anthropic/claude-sonnet-4.5",
});
