// antiban.js — Dawens Secure Layer v2 (AntiSpam + AutoBlock)

const cooldown = new Map(); // map pou cooldown
const messageHistory = new Map(); // istwa mesaj chak moun
const spamCounter = new Map(); // konbyen spam yon moun fè

const SPAM_LIMIT = 5; // limit spam anvan block
const BLOCK_DURATION_MS = 12 * 60 * 60 * 1000; // 12 èdtan blòk (pou evite bug)

module.exports = {
  pattern: ".*",
  react: "🛡️",
  desc: "Anti-Spam + AutoBlock System",
  category: "system",
  filename: __filename,

  async handler(conn, mek, m, { sender, body }) {
    const now = Date.now();

    // Antispam: pa kite moun voye menm mesaj 2–3 fwa
    if (!messageHistory.has(sender)) messageHistory.set(sender, []);
    const history = messageHistory.get(sender);

    if (history.includes(body)) {
      // Mete spam count
      const count = (spamCounter.get(sender) || 0) + 1;
      spamCounter.set(sender, count);

      if (count >= SPAM_LIMIT) {
        try {
          await conn.updateBlockStatus(sender, "block");
          console.log(`[⛔] ${sender} te auto-block pou spam (${count}x)`);

          // Auto-unblock aprè delay
          setTimeout(async () => {
            await conn.updateBlockStatus(sender, "unblock");
            spamCounter.set(sender, 0);
            console.log(`[✅] ${sender} auto-unblock.`);
          }, BLOCK_DURATION_MS);
        } catch (e) {
          console.error(`[ERÈ Block] ${e}`);
        }
        return;
      }

      return; // Pa reponn si spam
    }

    // Mete mesaj la nan istwa
    if (history.length >= 5) history.shift(); // kenbe dènye 5
    history.push(body);

    // Cooldown: evite flood
    const cd = cooldown.get(sender);
    if (cd && now - cd < 3000) return;
    cooldown.set(sender, now);
  }
};
