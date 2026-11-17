import supermemory from "@supermemory/eve";
import { defineMemory } from "eve/memory";

// One person talks to Juno, so one stable scope: memories survive redeploys, handle changes, and check-in runs.
export default defineMemory({
  namespace: "eve-friend-juno-v1",
  description: "Everything Juno knows about Dhravya: people, plans, moods, preferences, running jokes, and what was said before.",
  provider: supermemory({
    apiKey: () => process.env.SUPERMEMORY_API_KEY!,
    profileContext: { timeZone: "America/Los_Angeles" },
  }),
  scope: () => "dhravya",
});
