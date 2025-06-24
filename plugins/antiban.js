// antiban.js - Dawens Antiban & Spam Shield v4 (auto-block + send alert to owner)

const cooldown = new Map();
const messageHistory = new Map();
const spamCounter = new Map();

const OWNER_NUMBER = "50942241547@s.whatsapp.net"; // Nimewo ou
const SPAM_LIMIT = 5; // Konbyen fwa pou spam anvan block
const BLOCK_DURATION_MS = 6 * 60 * 60 * 1000; // 6 èdtan block

module.exports = {
  pattern: ".*",
  react: "🛡️",
  desc: "Protect main number + autoblock spam + alert owner",
  category: "security",
  filename: __filename,

  async handler(conn, mek, m, { sender, body }) {
    const now = Date.now();

    // Pa mete antiban sou oumenm
    if (sender === OWNER_NUMBER) return;

    // Antispam
    if (!messageHistory.has(sender)) messageHistory.set(sender, []);
    const history = messageHistory.get(sender);

    if (history.includes(body)) {
      const count = (spamCounter.get(sender) || 0) + 1;
      spamCounter.set(sender, count);

      if (count >= SPAM_LIMIT) {
        try {
          // Bloke spamè a
          await conn.updateBlockStatus(sender, "block");
          console.log(`🔒 ${sender} auto-blocked for spam (${count}x)`);

          // Voye alèt ba ou
          await conn.sendMessage(OWNER_NUMBER, {
            text: `🚨 *SPAM BLOCK*\n\nMoun sa a te spam:\n👤 *${sender}*\n🔁 Mesaj repete: ${count} fwa\n✅ Li blòk pou 6 èdtan.`,
          });

          // Debloke aprè delay
          setTimeout(async () => {
            await conn.updateBlockStatus(sender, "unblock");
            spamCounter.set(sender, 0);
            await conn.sendMessage(OWNER_NUMBER, {
              text: `🔓 *UNBLOCK*\n👤 ${sender} te otomatikman debloke aprè 6 èdtan.`,
            });
          }, BLOCK_DURATION_MS);
        } catch (e) {
          console.error(`⛔ Erè block:`, e);
        }
        return;
      }

      return;
    }

    // Mete nouvo mesaj nan istwa
    if (history.length >= 5) history.shift();
    history.push(body);

    // Antiflood
    const cd = cooldown.get(sender);
    if (cd && now - cd < 2500) return;
    cooldown.set(sender, now);
  }
};
