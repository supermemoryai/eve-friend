import { defineSchedule } from "eve/schedules";

import photon from "../channels/photon";

// Twice a day Juno looks at memory and decides whether there is a real reason to text; no thread id means no check-ins.
export default defineSchedule({
  cron: "0 10,19 * * *",
  timezone: "America/Los_Angeles",
  async run({ to, waitUntil, appAuth }) {
    const threadId = process.env.FRIEND_CHECKIN_THREAD_ID;
    if (!threadId) return;
    waitUntil(
      to(photon, { adapterName: "imessage", threadId }).send(
        "Scheduled check-in. Look at what you remember and decide whether there is a genuine reason to text Dhravya right now. If there is, send one short natural message. If there is not, call no_reply.",
        { auth: appAuth },
      ),
    );
  },
});
