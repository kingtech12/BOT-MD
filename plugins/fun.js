const { cmd } = require('../command');
const axios = require("axios");

// 1. Would you rather
cmd({
  pattern: "wyr",
  desc: "Would you rather game",
  category: "fun",
  filename: __filename
}, async (conn, m) => {
  const res = await axios.get("https://would-you-rather-api.abaanshanid.repl.co/");
  await conn.sendMessage(m.chat, { text: `🤔 Would you rather:\n\n🔹 ${res.data.data.option1}\n🔸 ${res.data.data.option2}` }, { quoted: m });
});

// 2. Ship (compatibility)
cmd({
  pattern: "ship",
  desc: "Love compatibility between two names",
  category: "fun",
  filename: __filename
}, async (conn, m, { args, reply }) => {
  if (args.length < 2) return reply("💖 Use: .ship Alice Bob");
  const percent = Math.floor(Math.random() * 100);
  reply(`💘 Love between *${args[0]}* & *${args[1]}*: *${percent}%* 💞`);
});

// 3. How gay
cmd({
  pattern: "howgay",
  desc: "Check how gay someone is (for fun)",
  category: "fun",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  const percent = Math.floor(Math.random() * 101);
  reply(`${q || "You"} are 🌈 *${percent}% gay* (just for fun)`);
});

// 4. Fact
cmd({
  pattern: "fact",
  desc: "Send a random fact",
  category: "fun",
  filename: __filename
}, async (conn, m) => {
  const res = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
  conn.sendMessage(m.chat, { text: `📘 *Fact:* ${res.data.text}` }, { quoted: m });
});

// 5. Joke
cmd({
  pattern: "joke",
  desc: "Tell a joke",
  category: "fun",
  filename: __filename
}, async (conn, m) => {
  const res = await axios.get("https://official-joke-api.appspot.com/random_joke");
  conn.sendMessage(m.chat, { text: `🤣 ${res.data.setup}\n\n😂 ${res.data.punchline}` }, { quoted: m });
});

// 6. Roast me
cmd({
  pattern: "roast",
  desc: "Roast the user (fun)",
  category: "fun",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  const roasts = [
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "You're not stupid; you just have bad luck thinking.",
    "You have something on your chin... no, the third one down.",
    "You're like a software update. Whenever I see you, I think: Not now."
  ];
  const roast = roasts[Math.floor(Math.random() * roasts.length)];
  reply(`🔥 ${q || "You"}: ${roast}`);
});

// 7. IQ test
cmd({
  pattern: "iq",
  desc: "Random IQ score",
  category: "fun",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  const iq = Math.floor(Math.random() * 151);
  reply(`🧠 IQ of ${q || "you"} is: *${iq}*`);
});

// 8. Simp rate
cmd({
  pattern: "simp",
  desc: "Check simp level",
  category: "fun",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  const simp = Math.floor(Math.random() * 101);
  reply(`😳 ${q || "You"} are *${simp}%* Simp`);
});

// 9. Truth or Dare
cmd({
  pattern: "tod",
  desc: "Truth or Dare game",
  category: "fun",
  filename: __filename
}, async (conn, m) => {
  const options = ["Truth", "Dare"];
  const pick = options[Math.floor(Math.random() * options.length)];
  conn.sendMessage(m.chat, { text: `🎯 You got: *${pick}*` }, { quoted: m });
});

// 10. 8ball
cmd({
  pattern: "8ball",
  desc: "Magic 8ball answers",
  category: "fun",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  if (!q) return reply("🎱 Ask a question.");
  const responses = ["Yes", "No", "Maybe", "Definitely", "Absolutely not", "Ask again later"];
  reply(`🎱 *${q}*\n\nAnswer: *${responses[Math.floor(Math.random() * responses.length)]}*`);
});

// 11. Rate
cmd({
  pattern: "rate",
  desc: "Rate a person or thing (0-10)",
  category: "fun",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  const rate = Math.floor(Math.random() * 11);
  reply(`⭐ I rate "${q || 'you'}": *${rate}/10*`);
});

// 12. Riddle
cmd({
  pattern: "riddle",
  desc: "Get a random riddle",
  category: "fun",
  filename: __filename
}, async (conn, m) => {
  const res = await axios.get("https://riddles-api.vercel.app/random");
  conn.sendMessage(m.chat, { text: `🧩 *Riddle:*\n${res.data.riddle}\n\n💡 Answer: ${res.data.answer}` }, { quoted: m });
});
