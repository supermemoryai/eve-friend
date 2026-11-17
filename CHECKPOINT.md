# Checkpoint

## 1. Scaffold (2026-11-17)

- Eve 1.0.2 + @supermemory/eve 0.2.0-rc.1 installed; `tsc --noEmit` and `eve build` pass.
- Photon transport: Eve's built-in `eve/channels/photon` channel (Spectrum underneath), with portable credentials read from `SPECTRUM_PROJECT_ID` / `SPECTRUM_PROJECT_SECRET`. Picked over hand-rolling `@photon-ai/advanced-imessage` because it already does webhook signature verification, dedupe of retried deliveries, one session per chat, tapbacks, and attachments.
- Supermemory key verified against `/v3/settings`.
- Sender allowlist, fixed memory scope, persona, tapback and no_reply tools, twice-daily check-in schedule written.

Next: get VERCEL_TOKEN, AI_GATEWAY_API_KEY, and Dhravya's handle; run the local loop; deploy; create the Spectrum webhook.

## 2. Local loop and deploy (2026-11-17)

- Local: `eve dev` + HTTP session. Turn 1 ("my sister Riya is visiting next weekend...") got a reply and was captured; a fresh session asked what Juno remembered, `supermemory__search` returned the Riya conversation, and the reply was "i remember your sister riya is visiting next weekend and you're a bit stressed about hosting." Memory across sessions works.
- Model: the AI Gateway key is on the free tier, which rejects Claude, GPT-5.x/6 and Gemini 3 with 403. Default is now `google/gemini-2.5-flash` (free tier); `openai/gpt-oss-120b` also works. Set `FRIEND_MODEL=anthropic/claude-sonnet-5.5` after topping up AI Gateway credits.
- Deployed: https://eve-friend.vercel.app (team supermemory). Env on Vercel: SUPERMEMORY_API_KEY, SPECTRUM_PROJECT_ID, SPECTRUM_PROJECT_SECRET, FRIEND_IMESSAGE_HANDLES, SPECTRUM_WEBHOOK_SECRET.
- Spectrum webhook registered for https://eve-friend.vercel.app/eve/v1/photon (one was created, then deleted and re-created to rotate its secret). Dhravya registered as a shared iMessage user; project profile named Juno.

Next: Dhravya texts the assigned number; confirm the iMessage loop and recall; set FRIEND_CHECKIN_THREAD_ID from the logs; push the repo once it exists.
