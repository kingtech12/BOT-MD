const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "hwaifu",
  desc: "Send NSFW waifu",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (conn, m, msg, { reply }) => {
  try {
    const res = await axios.get("https://api.waifu.pics/nsfw/waifu");
    const imageUrl = res.data.url;
    await conn.sendMessage(m.from, {
      image: { url: imageUrl },
      caption: "Here is your random NSFW Waifu 😏\n\n> MADE BY K1NG-XMD"
    }, { quoted: m });
  } catch {
    reply("❌ Failed to fetch NSFW waifu.");
  }
});

cmd({
  pattern: "trap",
  desc: "Send NSFW trap",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (conn, m, msg, { reply }) => {
  try {
    const res = await axios.get("https://api.waifu.pics/nsfw/trap");
    const imageUrl = res.data.url;
    await conn.sendMessage(m.from, {
      image: { url: imageUrl },
      caption: "Here is your random NSFW Trap 🔥\n\n> MADE BY K1NG-XMD"
    }, { quoted: m });
  } catch {
    reply("❌ Failed to fetch NSFW trap.");
  }
});

cmd({
  pattern: "hneko",
  desc: "Send NSFW neko",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (conn, m, msg, { reply }) => {
  try {
    const res = await axios.get("https://api.waifu.pics/nsfw/neko");
    const imageUrl = res.data.url;
    await conn.sendMessage(m.from, {
      image: { url: imageUrl },
      caption: "Here is your random NSFW Neko 😽\n\n> MADE BY K1NG-XMD"
    }, { quoted: m });
  } catch {
    reply("❌ Failed to fetch NSFW neko.");
  }
});

cmd({
  pattern: "hentai",
  desc: "Send NSFW hentai",
  category: "nsfw",
  react: "🔞",
  filename: __filename
}, async (conn, m, msg, { reply }) => {
  try {
    const res = await axios.get("https://api.waifu.pics/nsfw/blowjob");
    const imageUrl = res.data.url;
    await conn.sendMessage(m.from, {
      image: { url: imageUrl },
      caption: "Here is your NSFW Hentai 🍑\n\n> MADE BY K1NG-XMD"
    }, { quoted: m });
  } catch {
    reply("❌ Failed to fetch NSFW hentai.");
  }
});
