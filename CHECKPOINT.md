# Checkpoint

## 1. Scaffold (2026-11-17)

- Eve 1.0.2 + @supermemory/eve 0.2.0-rc.1 installed; `tsc --noEmit` and `eve build` pass.
- Photon transport: Eve's built-in `eve/channels/photon` channel (Spectrum underneath), with portable credentials read from `SPECTRUM_PROJECT_ID` / `SPECTRUM_PROJECT_SECRET`. Picked over hand-rolling `@photon-ai/advanced-imessage` because it already does webhook signature verification, dedupe of retried deliveries, one session per chat, tapbacks, and attachments.
- Supermemory key verified against `/v3/settings`.
- Sender allowlist, fixed memory scope, persona, tapback and no_reply tools, twice-daily check-in schedule written.

Next: get VERCEL_TOKEN, AI_GATEWAY_API_KEY, and Dhravya's handle; run the local loop; deploy; create the Spectrum webhook.
