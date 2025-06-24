const { cmd } = require('../command');
const axios = require('axios');

// 1. Flip a coin
cmd({
  pattern: "flip",
  desc: "Flip a coin (Heads or Tails)",
  category: "toolbox",
  filename: __filename
}, async (conn, m) => {
  const res = Math.random() > 0.5 ? "🪙 Heads!" : "🪙 Tails!";
  await conn.sendMessage(m.chat, { text: res }, { quoted: m });
});

// 2. Roll a dice
cmd({
  pattern: "roll",
  desc: "Roll a 6-sided dice",
  category: "toolbox",
  filename: __filename
}, async (conn, m) => {
  const roll = Math.floor(Math.random() * 6) + 1;
  await conn.sendMessage(m.chat, { text: `🎲 You rolled: ${roll}` }, { quoted: m });
});

// 3. Shorten URL
cmd({
  pattern: "short",
  desc: "Shorten a URL: .short https://...",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  if (!q) return reply("❗ Please provide a URL.");
  try {
    const { data } = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(q)}`);
    reply(`🔗 Shortened URL:\n${data}`);
  } catch {
    reply("❌ Failed to shorten the link.");
  }
});

// 4. Calculator
cmd({
  pattern: "calc",
  desc: "Quick math calculator: .calc 5+6*3",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  try {
    const result = eval(q);
    reply(`🧮 Result: ${result}`);
  } catch {
    reply("❌ Invalid expression.");
  }
});

// 5. Reverse text
cmd({
  pattern: "reverse",
  desc: "Reverse any text",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  if (!q) return reply("❗ Please enter text to reverse.");
  reply(`🔁 ${q.split("").reverse().join("")}`);
});

// 6. Current time/date
cmd({
  pattern: "date",
  desc: "Show current time and date",
  category: "toolbox",
  filename: __filename
}, async (conn, m) => {
  const now = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  await conn.sendMessage(m.chat, { text: `📅 Current time: ${now}` }, { quoted: m });
});

// 7. Generate QR code
cmd({
  pattern: "qr",
  desc: "Generate QR code from text/link",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q }) => {
  if (!q) return conn.sendMessage(m.chat, { text: "❗ Provide text to generate QR." }, { quoted: m });
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(q)}`;
  await conn.sendMessage(m.chat, { image: { url: qr }, caption: `🔳 QR Code for:\n${q}` }, { quoted: m });
});

// 8. Text-to-speech (TTS)
cmd({
  pattern: "say",
  desc: "Make the bot speak: .say Hello",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q }) => {
  if (!q) return conn.sendMessage(m.chat, { text: "❗ Enter text to speak." }, { quoted: m });
  const audio = `https://api.ttsmp3.com/v1/?lang=en&msg=${encodeURIComponent(q)}`;
  await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mp4' }, { quoted: m });
});

// 9. Wikipedia search
cmd({
  pattern: "wiki",
  desc: "Search from Wikipedia",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  if (!q) return reply("❗ Please enter a search term.");
  try {
    const { data } = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
    if (data.extract) {
      reply(`📚 *${data.title}*\n\n${data.extract}`);
    } else {
      reply("❌ No result found.");
    }
  } catch {
    reply("❌ Error fetching Wikipedia data.");
  }
});

// 10. Define a word
cmd({
  pattern: "define",
  desc: "Get word definition",
  category: "toolbox",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  if (!q) return reply("❗ Please enter a word.");
  try {
    const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${q}`);
    const def = data[0]?.meanings[0]?.definitions[0]?.definition;
    if (def) {
      reply(`📘 *${q}:*\n${def}`);
    } else {
      reply("❌ No definition found.");
    }
  } catch {
    reply("❌ Unable to find the word.");
  }
});
