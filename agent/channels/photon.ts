import { defaultPhotonAuth, photonIMessageChannel } from "eve/channels/photon";

function normalizeHandle(handle: string): string {
  const trimmed = handle.trim().toLowerCase();
  return trimmed.includes("@") ? trimmed : trimmed.replace(/[^\d+]/g, "");
}

function allowedHandles(): Set<string> {
  return new Set(
    (process.env.FRIEND_IMESSAGE_HANDLES ?? "")
      .split(",")
      .map(normalizeHandle)
      .filter(Boolean),
  );
}

// Only the allowlisted handles get a turn; everyone else is dropped silently.
function isFriend(author: { userId: string; isBot?: boolean }): boolean {
  if (author.isBot) return false;
  return allowedHandles().has(normalizeHandle(author.userId));
}

export default photonIMessageChannel({
  userName: "Juno",
  turnPolicy: "steer",
  async credentials() {
    const projectId = process.env.SPECTRUM_PROJECT_ID;
    const projectSecret = process.env.SPECTRUM_PROJECT_SECRET;
    if (!projectId || !projectSecret) throw new Error("SPECTRUM_PROJECT_ID and SPECTRUM_PROJECT_SECRET are required.");
    return { projectId, projectSecret };
  },
  webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET,
  onMessage(ctx, message) {
    if (!isFriend(message.author)) return null;
    console.info("eve-friend: accepted message", { threadId: ctx.thread.id });
    return { auth: defaultPhotonAuth(message) };
  },
  onTapback(_ctx, tapback) {
    if (!tapback.added || !isFriend(tapback.author)) return null;
    return { auth: defaultPhotonAuth(tapback) };
  },
});
